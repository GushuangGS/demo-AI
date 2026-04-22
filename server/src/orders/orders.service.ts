import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'node:path';
import { ensureJsonFile, writeJsonFile } from '../shared/file-store';
import { CreateOrderDto, OrderRecord, OrderServiceType, OrderStatus, UpdateOrderStatusDto } from './orders.types';

const DEFAULT_USER_ID = 'user_demo_001';

@Injectable()
export class OrdersService {
  private readonly ordersFile = join(process.cwd(), 'data', 'orders.json');

  async getDashboard(userId = DEFAULT_USER_ID) {
    const orders = await this.getOrders();
    const userOrders = orders.filter((item) => item.userId === userId);

    return {
      pendingOrder: this.formatPendingOrder(userOrders.find((item) => item.status === 'pending')),
      activeOrder: this.formatActiveOrder(userOrders.find((item) => item.status === 'in_progress')),
      orderList: userOrders.map((item) => this.formatListItem(item)),
      stats: {
        total: userOrders.length,
        pending: userOrders.filter((item) => item.status === 'pending').length,
        inProgress: userOrders.filter((item) => item.status === 'in_progress').length,
        review: userOrders.filter((item) => item.status === 'review').length,
        completed: userOrders.filter((item) => item.status === 'completed').length,
      },
    };
  }

  async list(status?: OrderStatus, userId?: string) {
    const orders = await this.getOrders();
    return orders.filter((item) => {
      if (status && item.status !== status) {
        return false;
      }
      if (userId && item.userId !== userId) {
        return false;
      }
      return true;
    });
  }

  async detail(id: string) {
    const orders = await this.getOrders();
    const order = orders.find((item) => item.id === id || item.orderNo === id);

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

    const order: OrderRecord = {
      id: `order_${Date.now()}`,
      userId: payload.userId || DEFAULT_USER_ID,
      orderNo,
      serviceType: payload.serviceType,
      serviceLabel,
      status: 'pending',
      statusLabel: '待接单',
      filter: 'inProgress',
      category: serviceLabel,
      projectName: payload.projectName,
      projectDesc: payload.projectDesc,
      goods: payload.goods,
      price: Number(payload.price || 0),
      paymentMethod: '微信支付',
      image: this.getServiceImage(payload.serviceType),
      pickupTitle: payload.pickupTitle,
      pickupDetail: payload.pickupDetail,
      receiverTitle: payload.receiverTitle,
      receiverDetail: payload.receiverDetail,
      etaTitle: '预计 5 分钟内接单',
      etaDesc: '系统已为您推送给附近 3 位骑手',
      note: payload.note?.trim() || '',
      actionText: '联系客服',
      actionType: 'service',
      secondary: false,
      rider: undefined,
      steps: [
        {
          title: '待骑手接单',
          desc: '订单创建成功，正在为您匹配骑手',
          time: this.formatTime(now),
          active: true,
        },
      ],
      address: {
        title: payload.receiverTitle,
        detail: payload.receiverDetail,
      },
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
      throw new NotFoundException('订单不存在');
    }

    target.status = payload.status;
    target.statusLabel = this.getStatusLabel(payload.status);
    target.filter = this.getFilter(payload.status);
    target.actionType = payload.status === 'review' ? 'review' : 'service';
    target.actionText = payload.status === 'review' ? '立即评价' : payload.status === 'completed' ? '评价订单' : '联系客服';
    target.secondary = payload.status === 'completed';
    target.updatedAt = new Date().toISOString();

    if (payload.status === 'in_progress') {
      target.eta = '预计 18:30 送达';
      target.rider = {
        name: '陈师傅',
        rating: '4.9',
        completed: '2,340+ 订单',
        avatar: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
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
    }

    await writeJsonFile(this.ordersFile, orders);
    return target;
  }

  private async getOrders() {
    return ensureJsonFile<OrderRecord[]>(this.ordersFile, this.buildSeedOrders());
  }

  private buildSeedOrders(): OrderRecord[] {
    const now = new Date();
    const iso = (minuteOffset: number) => new Date(now.getTime() - minuteOffset * 60_000).toISOString();

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
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=320&q=80',
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
        image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=320&q=80',
        pickupTitle: '国贸写字楼 A 座',
        pickupDetail: '前台领取密封文件袋',
        receiverTitle: '中关村软件园 8 号楼',
        receiverDetail: '前台签收 139****2233',
        eta: '预计 18:10 送达',
        note: '需签收拍照回传',
        actionText: '联系客服',
        actionType: 'service',
        secondary: false,
        rider: {
          name: '张师傅',
          rating: '4.9',
          completed: '1,920+ 订单',
          avatar: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
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
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=320&q=80',
        pickupTitle: '协和医院东院',
        pickupDetail: '门诊大厅自助机旁',
        receiverTitle: '东城区广渠门内大街',
        receiverDetail: '7 号楼 2 单元',
        note: '报告密封保存',
        actionText: '立即评价',
        actionType: 'review',
        secondary: false,
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
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=320&q=80',
        pickupTitle: '798 艺术区东门',
        pickupDetail: '联系活动执行老师',
        receiverTitle: '朝阳公园南门活动区',
        receiverDetail: '展位 A12',
        note: '已完成设备回收确认',
        actionText: '评价订单',
        actionType: 'review',
        secondary: true,
        address: {
          title: '朝阳公园南门活动区',
          detail: '展位 A12',
        },
        createdAt: iso(48 * 60),
        updatedAt: iso(47 * 60),
      },
    ];
  }

  private formatPendingOrder(order?: OrderRecord) {
    if (!order) {
      return null;
    }

    return {
      etaTitle: order.etaTitle || '预计稍后接单',
      etaDesc: order.etaDesc || '系统正在为您匹配骑手',
      orderNo: order.orderNo,
      price: this.formatPrice(order.price),
      pickupTitle: order.pickupTitle,
      pickupDetail: order.pickupDetail,
      receiverTitle: order.receiverTitle,
      receiverDetail: order.receiverDetail,
    };
  }

  private formatActiveOrder(order?: OrderRecord) {
    if (!order) {
      return null;
    }

    return {
      eta: order.eta || '配送中',
      orderNo: order.orderNo,
      payMethod: order.paymentMethod,
      goods: order.goods,
      addressLabel: '送达地址',
      detailLabel: `${order.serviceLabel}详情`,
      rider: order.rider,
      steps: order.steps || [],
      address: order.address || {
        title: order.receiverTitle,
        detail: order.receiverDetail,
      },
    };
  }

  private formatListItem(order: OrderRecord) {
    return {
      id: order.id,
      orderNo: order.orderNo,
      filter: order.filter,
      category: order.category,
      projectName: order.projectName,
      projectDesc: order.projectDesc,
      price: this.formatPrice(order.price),
      actionText: order.actionText,
      actionType: order.actionType,
      statusLabel: order.statusLabel,
      statusClass: this.getStatusClass(order.status),
      icon: this.getServiceIcon(order.serviceType),
      iconClass: this.getIconClass(order.serviceType),
      secondary: order.secondary,
      image: order.image,
    };
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
      universal: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=320&q=80',
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

  private getFilter(status: OrderStatus): 'inProgress' | 'review' | 'completed' {
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
