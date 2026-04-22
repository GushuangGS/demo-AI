export type OrderServiceType = 'buy' | 'send' | 'task' | 'universal';
export type OrderStatus =
  | 'pending'
  | 'in_progress'
  | 'review'
  | 'completed'
  | 'cancelled';
export type ClientOrderType = 'buy' | 'send' | 'errand' | 'all';
export type OrderFilterType = 'inProgress' | 'review' | 'completed';

export interface RiderInfo {
  name: string;
  rating: string;
  completed: string;
  avatar: string;
}

export interface OrderStep {
  title: string;
  desc: string;
  time: string;
  active: boolean;
}

export interface OrderAddress {
  title: string;
  detail: string;
}

export interface OrderListItem {
  id: string;
  orderNo: string;
  filter: OrderFilterType;
  category: string;
  projectName: string;
  projectDesc: string;
  price: string;
  actionText: '联系客服' | '立即评价' | '评价订单';
  actionType: 'service' | 'review' | 'detail';
  statusLabel: string;
  statusClass: string;
  icon: string;
  iconClass: string;
  secondary: boolean;
  image: string;
}

export interface ActiveOrderPayload {
  orderId: string;
  orderNo: string;
  eta: string;
  payMethod: string;
  goods: string;
  addressLabel: string;
  detailLabel: string;
  listIcon: string;
  rider?: RiderInfo;
  steps: OrderStep[];
  address: OrderAddress;
}

export interface DetailPayload {
  title: string;
  summary: string;
  price: string;
  status: string;
  payMethod: string;
  assignee: string;
  timeline: OrderStep[];
  sections: Record<string, unknown>;
}

export interface ClientOrderRecord {
  id: string;
  orderNo: string;
  type: ClientOrderType;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  listItem: OrderListItem;
  activeOrder: ActiveOrderPayload;
  detailPayload: DetailPayload;
}

export interface OrderRecord {
  id: string;
  userId: string;
  orderNo: string;
  serviceType: OrderServiceType;
  serviceLabel: string;
  status: OrderStatus;
  statusLabel: string;
  filter: 'inProgress' | 'review' | 'completed';
  category: string;
  projectName: string;
  projectDesc: string;
  goods: string;
  price: number;
  paymentMethod: string;
  image: string;
  pickupTitle: string;
  pickupDetail: string;
  receiverTitle: string;
  receiverDetail: string;
  etaTitle?: string;
  etaDesc?: string;
  eta?: string;
  note?: string;
  actionText: '联系客服' | '立即评价' | '评价订单';
  actionType: 'service' | 'review' | 'detail';
  secondary: boolean;
  rider?: RiderInfo;
  steps?: OrderStep[];
  address?: OrderAddress;
  addressLabel?: string;
  detailLabel?: string;
  assignee?: string;
  detailSummary?: string;
  detailSections?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  userId?: string;
  serviceType: OrderServiceType;
  projectName: string;
  projectDesc: string;
  goods: string;
  price: number;
  pickupTitle: string;
  pickupDetail: string;
  receiverTitle: string;
  receiverDetail: string;
  note?: string;
  status?: OrderStatus;
  paymentMethod?: string;
  image?: string;
  etaTitle?: string;
  etaDesc?: string;
  eta?: string;
  addressLabel?: string;
  detailLabel?: string;
  assignee?: string;
  rider?: RiderInfo;
  steps?: OrderStep[];
  detailSummary?: string;
  detailSections?: Record<string, unknown>;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}
