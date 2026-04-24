import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'node:path';
import { ensureJsonFile, writeJsonFile } from '../shared/file-store';
import {
  CreateOrderDto,
  OrderFilterType,
  OrderRecord,
  OrderServiceType,
  OrderStep,
  OrderStatus,
  UpdateOrderStatusDto,
} from './orders.types';

const DEFAULT_USER_ID = 'user_demo_001';

@Injectable()
export class OrdersService {
  private readonly ordersFile = join(process.cwd(), 'data', 'orders.json');

  /**
   * 获取用户工作台看板数据
   * 1. 过滤获取当前用户的所有订单
   * 2. 分别提取最新的“待接单”与“进行中”状态订单，用于首页重点展示
   * 3. 统计各状态的订单数量，返回统计报表
   * @param userId 当前用户ID，默认为测试用户
   */
  async getDashboard(userId = DEFAULT_USER_ID) {
    // 步骤1：获取当前用户的订单列表
    const userOrders = await this.getUserOrders(userId);

    // 步骤2 & 3：组装看板数据，包括核心订单项及各状态的数量统计
    return {
      pendingOrder: userOrders.find((item) => item.status === 'pending'),
      activeOrder:
        userOrders.find((item) => item.status === 'in_progress') || null,
      orderList: userOrders,
      stats: {
        total: userOrders.length,
        pending: userOrders.filter((item) => item.status === 'pending').length,
        inProgress: userOrders.filter((item) => item.status === 'in_progress')
          .length,
        review: userOrders.filter((item) => item.status === 'review').length,
        completed: userOrders.filter((item) => item.status === 'completed')
          .length,
      },
    };
  }

  /**
   * 查询订单列表
   * 1. 加载所有订单数据
   * 2. 根据用户ID和订单状态进行过滤
   * 3. 按更新时间倒序排列（最新的订单排在最前）
   * @param status 可选的过滤状态
   * @param userId 当前用户ID
   */
  async list(status?: OrderStatus, userId?: string) {
    const orders = await this.getOrders();
    const targetUserId = userId || DEFAULT_USER_ID;

    // 步骤1：过滤属于该用户且匹配特定状态的订单
    const filtered = orders.filter(
      (item: OrderRecord) =>
        item.userId === targetUserId && (!status || item.status === status),
    );

    // 步骤2：按照 updatedAt 字段倒序排列
    filtered.sort(
      (a: OrderRecord, b: OrderRecord) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    return filtered;
  }

  /**
   * 获取订单详情
   * 1. 通过内部 findOrder 方法查找指定订单
   * 2. 如果不存在则抛出 404 异常
   * @param id 订单唯一ID或订单编号
   */
  async detail(id: string) {
    const order = await this.findOrder(id);

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    return order;
  }

  /**
   * 创建订单
   * 1. 加载现有所有订单数据
   * 2. 生成新订单的基本字段：如ID、时间戳、单号
   * 3. 补齐各服务类型（帮我买、帮我送等）特定的兜底字段：如状态文案、状态分类、操作按钮文案、订单详情结构等
   * 4. 保存新订单至JSON存储文件并返回给客户端
   * @param payload 客户端传入的创建订单DTO
   */
  async create(payload: CreateOrderDto) {
    // 步骤1：获取所有订单记录以进行存储操作
    const orders = await this.getOrders();
    const now = new Date().toISOString();

    // 步骤2：构建订单的核心基础数据（如流水号、业务类型中文名）
    const orderNo = this.buildOrderNo(payload.serviceType);
    const serviceLabel = this.getServiceLabel(payload.serviceType);

    // 初始化默认状态，未传时默认为 'in_progress'
    const status = payload.status || 'in_progress';

    // 如果状态为进行中，默认模拟指派一名骑手
    const defaultRider =
      status === 'in_progress'
        ? {
            name: '陈师傅',
            rating: '4.9',
            completed: '2,340+ 订单',
            avatar:
              'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
          }
        : undefined;

    // 步骤3：组装最终写入存储的订单记录
    const order: OrderRecord = {
      id: `order_${Date.now()}`,
      userId: payload.userId || DEFAULT_USER_ID,
      orderNo,
      serviceType: payload.serviceType,
      serviceLabel,

      // 状态相关字段映射
      status,
      statusLabel: this.getStatusLabel(status),
      filter: this.getFilter(status),
      category: serviceLabel,

      // 业务信息
      projectName: payload.projectName,
      projectDesc: payload.projectDesc,
      goods: payload.goods,
      price: Number(payload.price || 0),
      paymentMethod: payload.paymentMethod || '微信支付',
      image: payload.image || this.getServiceImage(payload.serviceType),

      // 地点及时间信息
      pickupTitle: payload.pickupTitle,
      pickupDetail: payload.pickupDetail,
      receiverTitle: payload.receiverTitle,
      receiverDetail: payload.receiverDetail,
      etaTitle: payload.etaTitle || '预计 5 分钟内接单',
      etaDesc: payload.etaDesc || '系统已为您推送给附近 3 位服务人员',
      eta:
        payload.eta || (status === 'in_progress' ? '预计稍后完成' : undefined),
      note: payload.note?.trim() || '',

      // 动作及展示状态映射
      actionText: this.getActionText(status),
      actionType: this.getActionType(status),
      secondary: status === 'completed',

      // 履约及步骤信息：如果客户端未传则由服务端自动生成兜底的流转步骤
      rider: payload.rider || defaultRider,
      steps: payload.steps?.length
        ? payload.steps
        : this.buildDefaultSteps(status, payload.serviceType, now),

      // 视图展示需要的复合字段映射
      address: {
        title: payload.receiverTitle,
        detail: payload.receiverDetail,
      },
      addressLabel:
        payload.addressLabel ||
        this.getDefaultAddressLabel(payload.serviceType),
      detailLabel:
        payload.detailLabel || this.getDefaultDetailLabel(serviceLabel),
      assignee:
        payload.assignee ||
        payload.rider?.name ||
        defaultRider?.name ||
        this.getDefaultAssignee(payload.serviceType),
      detailSummary: payload.detailSummary || payload.projectDesc,

      // 兜底补齐业务定制的详细分发段内容
      detailSections:
        payload.detailSections ||
        this.buildFallbackDetailSections(payload.serviceType, payload),

      createdAt: now,
      updatedAt: now,
    };

    // 步骤4：将新订单放入首位，并持久化到本地文件
    orders.unshift(order);
    await writeJsonFile(this.ordersFile, orders);

    return order;
  }

  /**
   * 更新订单状态
   * 1. 查找指定订单，若不存在则抛错
   * 2. 更新订单状态及相关的衍生展示字段（状态标签、过滤类别、操作文案等）
   * 3. 如果状态流转为进行中（in_progress），模拟生成接单的骑手数据及最新的订单流转步骤
   * 4. 保存最新状态至本地JSON文件
   * @param id 订单的ID或单号
   * @param payload 更新的数据载体（包含新状态等）
   */
  async updateStatus(id: string, payload: UpdateOrderStatusDto) {
    // 步骤1：获取订单列表并找到目标订单
    const orders = await this.getOrders();
    const target = orders.find((item) => item.id === id || item.orderNo === id);

    if (!target) {
      throw new Error('订单不存在');
    }

    // 步骤2：更新基础状态及衍生UI显示字段
    target.status = payload.status;
    target.statusLabel = this.getStatusLabel(payload.status);
    target.filter = this.getFilter(payload.status);
    target.actionType = this.getActionType(payload.status);
    target.actionText = this.getActionText(payload.status);
    target.secondary = payload.status === 'completed';
    target.updatedAt = new Date().toISOString();

    // 步骤3：如果是变为进行中（例如接单场景），模拟增加接单人员和时间线
    if (payload.status === 'in_progress') {
      target.eta = target.eta || '预计 18:30 送达';
      target.rider = {
        name: '陈师傅',
        rating: '4.9',
        completed: '2,340+ 订单',
        avatar:
          'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
      };
      // 更新订单进度步骤
      target.steps = [
        {
          title: '骑手已接单',
          desc: '已从站点出发，准备前往取件地址',
          time: this.formatTime(target.updatedAt),
          active: true,
        },
        {
          title: '配送完成',
          desc: '完成后将自动进入待评价',
          time: '待完成',
          active: false,
        },
      ];
      target.assignee = target.rider.name;
    }

    // 步骤4：持久化到文件并返回结果
    await writeJsonFile(this.ordersFile, orders);
    return target;
  }

  /**
   * 确保并获取全局订单JSON文件内容
   * 如果文件不存在或为空，使用 buildSeedOrders 作为默认种子数据写入文件
   */
  private async getOrders() {
    return ensureJsonFile<OrderRecord[]>(
      this.ordersFile,
      this.buildSeedOrders(),
    );
  }

  /**
   * 过滤并按更新时间倒序返回特定用户的所有订单记录
   */
  private async getUserOrders(userId = DEFAULT_USER_ID) {
    const orders = await this.getOrders();
    return orders
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }

  /**
   * 根据ID或订单编号精确查找单条记录
   */
  private async findOrder(id: string) {
    const orders = await this.getOrders();
    return orders.find((item) => item.id === id || item.orderNo === id);
  }

  /**
   * 构造系统的初始化种子订单数据
   * 预制四种业务类型的历史记录，便于新用户测试预览
   */
  private buildSeedOrders(): OrderRecord[] {
    const now = new Date();
    const iso = (minuteOffset: number) =>
      new Date(now.getTime() - minuteOffset * 60_000).toISOString();

    return [
      {
        id: 'order_seed_001',
        userId: DEFAULT_USER_ID,
        orderNo: 'ERR-20260422-001',
        serviceType: 'buy',
        serviceLabel: '帮我买',
        status: 'pending',
        statusLabel: '待接单',
        filter: 'inProgress',
        category: '帮我买',
        projectName: '深夜药店代买',
        projectDesc: '代买退烧药、体温计并送至小区门口',
        goods: '常备药品 2 件',
        price: 36.5,
        paymentMethod: '微信支付',
        image:
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=320&q=80',
        pickupTitle: '朝阳区建国路 88 号',
        pickupDetail: '24 小时药房',
        receiverTitle: '望京西园四区',
        receiverDetail: '3 号楼楼下自提点',
        etaTitle: '预计 3 分钟内接单',
        etaDesc: '您的订单已进入优先派单通道',
        note: '到店后请电话确认品牌',
        actionText: '联系客服',
        actionType: 'service',
        secondary: false,
        addressLabel: '收货地址',
        detailLabel: '代购商品',
        assignee: '同城代购专员',
        detailSummary:
          '代购任务已创建，正在从朝阳区建国路 88 号为您采购并配送。',
        detailSections: {
          buy: {
            goodsName: '深夜药店代买',
            goodsPrice: '¥36.50',
            pickupAddress: '朝阳区建国路 88 号',
            receiverAddress: '望京西园四区',
            receiverContact: '3 号楼楼下自提点',
            deliverTime: '立即送达',
            remark: '到店后请电话确认品牌',
            imageUrl: '',
            feeText: '配送费与服务费已含在订单报价内',
          },
        },
        address: {
          title: '望京西园四区',
          detail: '3 号楼楼下自提点',
        },
        createdAt: iso(15),
        updatedAt: iso(15),
      },
      {
        id: 'order_seed_002',
        userId: DEFAULT_USER_ID,
        orderNo: 'ERR-20260422-002',
        serviceType: 'send',
        serviceLabel: '帮我送',
        status: 'in_progress',
        statusLabel: '进行中',
        filter: 'inProgress',
        category: '帮我送',
        projectName: '同城文件急送',
        projectDesc: '合同文件专人直送，要求 1 小时内送达',
        goods: '合同文件袋 x1',
        price: 28,
        paymentMethod: '微信支付',
        image:
          'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=320&q=80',
        pickupTitle: '国贸写字楼 A 座',
        pickupDetail: '前台领取密封文件袋',
        receiverTitle: '中关村软件园 8 号楼',
        receiverDetail: '前台签收 139****2233',
        eta: '预计 18:10 送达',
        note: '需签收拍照回传',
        actionText: '联系客服',
        actionType: 'service',
        secondary: false,
        addressLabel: '收件地址',
        detailLabel: '寄送物品',
        assignee: '同城配送专员',
        detailSummary:
          '配送专员正在从国贸写字楼 A 座取件并送往中关村软件园 8 号楼。',
        detailSections: {
          send: {
            itemName: '同城文件急送',
            itemRemark: '合同文件专人直送，要求 1 小时内送达',
            pickupAddress: '国贸写字楼 A 座',
            pickupContact: '前台领取密封文件袋',
            receiverAddress: '中关村软件园 8 号楼',
            receiverContact: '前台签收 139****2233',
            deliverySpeed: '1 小时达',
            insurance: '基础保价',
          },
        },
        rider: {
          name: '张师傅',
          rating: '4.9',
          completed: '1,920+ 订单',
          avatar:
            'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
        },
        steps: [
          {
            title: '骑手已取件',
            desc: '文件已密封装袋，正在配送途中',
            time: '17:36',
            active: true,
          },
          {
            title: '预计送达',
            desc: '请保持电话畅通',
            time: '18:10',
            active: false,
          },
        ],
        address: {
          title: '中关村软件园 8 号楼',
          detail: '前台签收 139****2233',
        },
        createdAt: iso(48),
        updatedAt: iso(12),
      },
      {
        id: 'order_seed_003',
        userId: DEFAULT_USER_ID,
        orderNo: 'ERR-20260421-003',
        serviceType: 'task',
        serviceLabel: '帮我办',
        status: 'review',
        statusLabel: '待评价',
        filter: 'review',
        category: '帮我办',
        projectName: '医院报告代取',
        projectDesc: '已代取检查报告并送达，等待您的评价',
        goods: '纸质报告 1 份',
        price: 52,
        paymentMethod: '微信支付',
        image:
          'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=320&q=80',
        pickupTitle: '协和医院东院',
        pickupDetail: '门诊大厅自助机旁',
        receiverTitle: '东城区广渠门内大街',
        receiverDetail: '7 号楼 2 单元',
        note: '报告密封保存',
        actionText: '立即评价',
        actionType: 'review',
        secondary: false,
        addressLabel: '办理结果',
        detailLabel: '任务详情',
        assignee: '专属代办顾问',
        detailSummary: '医院报告已代取并送达，当前等待您的评价反馈。',
        detailSections: {
          errand: {
            taskType: '医院报告代取',
            taskDesc: '已代取检查报告并送达，等待您的评价',
            taskTime: '昨日完成',
            priority: '标准处理',
            budget: '¥52.00',
          },
        },
        address: {
          title: '东城区广渠门内大街',
          detail: '7 号楼 2 单元',
        },
        createdAt: iso(24 * 60),
        updatedAt: iso(22 * 60),
      },
      {
        id: 'order_seed_004',
        userId: DEFAULT_USER_ID,
        orderNo: 'ERR-20260420-004',
        serviceType: 'universal',
        serviceLabel: '万能帮',
        status: 'completed',
        statusLabel: '已完成',
        filter: 'completed',
        category: '万能帮',
        projectName: '演出设备现场协助',
        projectDesc: '完成展架搬运、设备布置与现场协调',
        goods: '展架与配件若干',
        price: 188,
        paymentMethod: '微信支付',
        image:
          'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=320&q=80',
        pickupTitle: '798 艺术区东门',
        pickupDetail: '联系活动执行老师',
        receiverTitle: '朝阳公园南门活动区',
        receiverDetail: '展位 A12',
        note: '已完成设备回收确认',
        actionText: '评价订单',
        actionType: 'review',
        secondary: true,
        addressLabel: '服务地点',
        detailLabel: '服务说明',
        assignee: '智能分派顾问',
        detailSummary:
          '现场协助任务已完成，展架搬运、设备布置和协调工作均已结束。',
        detailSections: {
          all: {
            sceneText: '上门协助 / 创意需求',
            requirement: '完成展架搬运、设备布置与现场协调',
            deadline: '本周内完成',
            budget: '¥188.00',
            suggestion: '如需复购类似活动支持，可再次发起需求并备注活动时间。',
          },
        },
        address: {
          title: '朝阳公园南门活动区',
          detail: '展位 A12',
        },
        createdAt: iso(48 * 60),
        updatedAt: iso(47 * 60),
      },
    ];
  }

  private getServiceLabel(type: OrderServiceType) {
    const mapping: Record<OrderServiceType, string> = {
      buy: '帮我买',
      send: '帮我送',
      task: '帮我办',
      universal: '万能帮',
    };
    return mapping[type];
  }

  private getServiceImage(type: OrderServiceType) {
    const mapping: Record<OrderServiceType, string> = {
      buy: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=320&q=80',
      send: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=320&q=80',
      task: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=320&q=80',
      universal:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=320&q=80',
    };
    return mapping[type];
  }

  private getServiceIcon(type: OrderServiceType) {
    const mapping: Record<OrderServiceType, string> = {
      buy: 'shopping_bag',
      send: 'local_shipping',
      task: 'assignment',
      universal: 'auto_awesome',
    };
    return mapping[type];
  }

  private getIconClass(type: OrderServiceType) {
    const mapping: Record<OrderServiceType, string> = {
      buy: 'icon-blue',
      send: 'icon-blue',
      task: 'icon-warm',
      universal: 'icon-gray',
    };
    return mapping[type];
  }

  private getStatusLabel(status: OrderStatus) {
    const mapping: Record<OrderStatus, string> = {
      pending: '待接单',
      in_progress: '进行中',
      review: '待评价',
      completed: '已完成',
      cancelled: '已取消',
    };
    return mapping[status];
  }

  private getFilter(status: OrderStatus): OrderFilterType {
    if (status === 'review') {
      return 'review';
    }
    if (status === 'completed' || status === 'cancelled') {
      return 'completed';
    }
    return 'inProgress';
  }

  private getStatusClass(status: OrderStatus) {
    if (status === 'review') {
      return 'status-warm';
    }
    if (status === 'completed' || status === 'cancelled') {
      return 'status-gray';
    }
    return 'status-blue';
  }

  private getActionType(status: OrderStatus): 'service' | 'review' | 'detail' {
    if (status === 'review' || status === 'completed') {
      return 'review';
    }
    return 'service';
  }

  private getActionText(
    status: OrderStatus,
  ): '联系客服' | '立即评价' | '评价订单' {
    if (status === 'review') {
      return '立即评价';
    }
    if (status === 'completed') {
      return '评价订单';
    }
    return '联系客服';
  }

  private getDefaultAddressLabel(type: OrderServiceType) {
    const mapping: Record<OrderServiceType, string> = {
      buy: '收货地址',
      send: '收件地址',
      task: '办理说明',
      universal: '需求概览',
    };
    return mapping[type];
  }

  private getDefaultDetailLabel(serviceLabel: string) {
    return `${serviceLabel}详情`;
  }

  private getDefaultAssignee(type: OrderServiceType) {
    const mapping: Record<OrderServiceType, string> = {
      buy: '同城代购专员',
      send: '同城配送专员',
      task: '专属代办顾问',
      universal: '智能分派顾问',
    };
    return mapping[type];
  }

  /**
   * 自动生成默认订单流转进度（时间线状态）
   * @param status 订单状态
   * @param serviceType 服务类型
   * @param time 当前时间字符串
   */
  private buildDefaultSteps(
    status: OrderStatus,
    serviceType: OrderServiceType,
    time: string,
  ): OrderStep[] {
    if (status !== 'in_progress') {
      return [
        {
          title: '待服务人员接单',
          desc: '订单创建成功，正在为您匹配服务人员',
          time: this.formatTime(time),
          active: true,
        },
      ];
    }

    const descMap: Record<OrderServiceType, string> = {
      buy: '代购专员已接单，正在为您采购并配送',
      send: '配送专员已接单，正在前往取件地址',
      task: '代办顾问已接单，正在按要求推进任务',
      universal: '平台已受理需求，正在进行智能分派',
    };

    return [
      {
        title: '任务处理中',
        desc: descMap[serviceType],
        time: this.formatTime(time),
        active: true,
      },
      {
        title: '等待完成',
        desc: '服务完成后将同步最新进展',
        time: '待完成',
        active: false,
      },
    ];
  }

  /**
   * 后端兜底策略：当客户端为简化请求Payload未传特定业务线的专属详情模块时，
   * 服务端基于核心字段推导并组装默认的服务详情（DetailSections）以确保多态UI正常渲染
   */
  private buildFallbackDetailSections(
    type: OrderServiceType,
    payload: Pick<
      CreateOrderDto | OrderRecord,
      | 'projectName'
      | 'projectDesc'
      | 'pickupTitle'
      | 'pickupDetail'
      | 'receiverTitle'
      | 'receiverDetail'
      | 'note'
      | 'price'
    >,
  ) {
    if (type === 'buy') {
      return {
        buy: {
          goodsName: payload.projectName,
          goodsPrice: this.formatPrice(Number(payload.price || 0)),
          pickupAddress: payload.pickupTitle,
          receiverAddress: payload.receiverTitle,
          receiverContact: payload.receiverDetail,
          deliverTime: '尽快送达',
          remark: payload.note || '无特殊要求',
          imageUrl: '',
          feeText: '以订单实际结算为准',
        },
      };
    }

    if (type === 'send') {
      return {
        send: {
          itemName: payload.projectName,
          itemRemark: payload.projectDesc,
          pickupAddress: payload.pickupTitle,
          pickupContact: payload.pickupDetail,
          receiverAddress: payload.receiverTitle,
          receiverContact: payload.receiverDetail,
          deliverySpeed: '尽快送达',
          insurance: '基础保价',
        },
      };
    }

    if (type === 'task') {
      return {
        errand: {
          taskType: payload.projectName,
          taskDesc: payload.projectDesc,
          taskTime: '尽快处理',
          priority: '标准处理',
          budget: this.formatPrice(Number(payload.price || 0)),
        },
      };
    }

    return {
      all: {
        sceneText: payload.projectName,
        requirement: payload.projectDesc,
        deadline: '尽快安排',
        budget: this.formatPrice(Number(payload.price || 0)),
        suggestion: payload.note || '客服将尽快与您确认服务边界和执行方式。',
      },
    };
  }

  /**
   * 格式化数字价格为人民币显示格式
   */
  private formatPrice(price: number) {
    return `¥${Number(price || 0).toFixed(2)}`;
  }

  /**
   * 依据业务类型与时间戳构造前缀订单号
   */
  private buildOrderNo(type: OrderServiceType) {
    const prefixMap: Record<OrderServiceType, string> = {
      buy: 'BUY',
      send: 'SND',
      task: 'TSK',
      universal: 'ALL',
    };
    return `${prefixMap[type]}-${Date.now()}`;
  }

  /**
   * 格式化 ISO 时间字符串为 "HH:mm"
   */
  private formatTime(value: string) {
    return new Date(value).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
}
