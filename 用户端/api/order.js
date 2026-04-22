import { request } from './request';

export const fetchOrderDashboard = (userId) =>
  request({
    url: '/orders/dashboard',
    data: { userId },
  });

export const updateOrderStatus = (id, status) =>
  request({
    url: `/orders/${id}/status`,
    method: 'PATCH',
    data: { status },
  });
