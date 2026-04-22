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

  async getDashboard(userId = DEFAULT_USER_ID) {
    const userOrders = await this.getUserOrders(userId);

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

  async list(status?: OrderStatus, userId?: string) {
    const orders = await this.getOrders();
    const targetUserId = userId || DEFAULT_USER_ID;

    const filtered = orders.filter(
      (item: OrderRecord) =>
        item.userId === targetUserId && (!status || item.status === status),
    );

    filtered.sort(
      (a: OrderRecord, b: OrderRecord) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    return filtered;
  }

  async detail(id: string) {
    const order = await this.findOrder(id);

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    return order;
  }

  async create(payload: CreateOrderDto) {
    const orders = await this.getOrders();
    const now = new Date().toISOString();
    const orderNo = this.buildOrderNo(payload.serviceType);
    const serviceLabel = this.getServiceLabel(payload.serviceType);
    const status = payload.status || 'in_progress';
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

    const order: OrderRecord = {
      id: `order_${Date.now()}`,
      userId: payload.userId || DEFAULT_USER_ID,
      orderNo,
      serviceType: payload.serviceType,
      serviceLabel,
      status,
      statusLabel: this.getStatusLabel(status),
      filter: this.getFilter(status),
      category: serviceLabel,
      projectName: payload.projectName,
      projectDesc: payload.projectDesc,
      goods: payload.goods,
      price: Number(payload.price || 0),
      paymentMethod: payload.paymentMethod || '微信支付',
      image: payload.image || this.getServiceImage(payload.serviceType),
      pickupTitle: payload.pickupTitle,
      pickupDetail: payload.pickupDetail,
      receiverTitle: payload.receiverTitle,
      receiverDetail: payload.receiverDetail,
      etaTitle: payload.etaTitle || '预计 5 分钟内接单',
      etaDesc: payload.etaDesc || '系统已为您推送给附近 3 位服务人员',
      eta:
        payload.eta || (status === 'in_progress' ? '预计稍后完成' : undefined),
      note: payload.note?.trim() || '',
      actionText: this.getActionText(status),
      actionType: this.getActionType(status),
      secondary: status === 'completed',
      rider: payload.rider || defaultRider,
      steps: payload.steps?.length
        ? payload.steps
        : this.buildDefaultSteps(status, payload.serviceType, now),
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
      detailSections:
        payload.detailSections ||
        this.buildFallbackDetailSections(payload.serviceType, payload),
      createdAt: now,
      updatedAt: now,
    };

    orders.unshift(order);
    await writeJsonFile(this.ordersFile, orders);

    return order;
  }

  async updateStatus(id: string, payload: UpdateOrderStatusDto) {
    const orders = await this.getOrders();
    const target = orders.find((item) => item.id === id || item.orderNo === id);

    if (!target) {
      throw new Error('订单不存在');
    }

    target.status = payload.status;
    target.statusLabel = this.getStatusLabel(payload.status);
    target.filter = this.getFilter(payload.status);
    target.actionType = this.getActionType(payload.status);
    target.actionText = this.getActionText(payload.status);
    target.secondary = payload.status === 'completed';
    target.updatedAt = new Date().toISOString();

    if (payload.status === 'in_progress') {
      target.eta = target.eta || '预计 18:30 送达';
      target.rider = {
        name: '陈师傅',
        rating: '4.9',
        completed: '2,340+ 订单',
        avatar:
          'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
      };
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

    await writeJsonFile(this.ordersFile, orders);
    return target;
  }

  private async getOrders() {
    return ensureJsonFile<OrderRecord[]>(
      this.ordersFile,
      this.buildSeedOrders(),
    );
  }

  private async getUserOrders(userId = DEFAULT_USER_ID) {
    const orders = await this.getOrders();
    return orders
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }

  private async findOrder(id: string) {
    const orders = await this.getOrders();
    return orders.find((item) => item.id === id || item.orderNo === id);
  }

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

  private formatPrice(price: number) {
    return `¥${Number(price || 0).toFixed(2)}`;
  }

  private buildOrderNo(type: OrderServiceType) {
    const prefixMap: Record<OrderServiceType, string> = {
      buy: 'BUY',
      send: 'SND',
      task: 'TSK',
      universal: 'ALL',
    };
    return `${prefixMap[type]}-${Date.now()}`;
  }

  private formatTime(value: string) {
    return new Date(value).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
}
