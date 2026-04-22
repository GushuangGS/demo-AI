import { ensureDemoLogin } from './auth';
import { request } from './request';

const withUserId = async (payload = {}) => {
  const { user } = await ensureDemoLogin();
  return {
    userId: user.id,
    ...payload,
  };
};

export const fetchOrderDashboard = async () => {
  const { userId } = await withUserId();
  return request({
    url: '/orders/dashboard',
    data: { userId },
  });
};

export const fetchOrderList = async (status) => {
  const { userId } = await withUserId();
  return request({
    url: '/orders',
    data: {
      userId,
      ...(status ? { status } : {}),
    },
  });
};

export const fetchOrderDetail = async (id) => request({ url: `/orders/${id}` });

export const createOrder = async (payload) => {
  const data = await withUserId(payload);
  return request({
    url: '/orders',
    method: 'POST',
    data,
  });
};

export const updateOrderStatus = (id, status) =>
  request({
    url: `/orders/${id}/status`,
    method: 'PATCH',
    data: { status },
  });
