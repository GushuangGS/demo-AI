export type OrderServiceType = 'buy' | 'send' | 'task' | 'universal';
export type OrderStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';

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
  address?: {
    title: string;
    detail: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  userId: string;
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
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}
