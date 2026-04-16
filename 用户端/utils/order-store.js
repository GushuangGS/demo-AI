export const ORDER_REDIRECT_KEY = 'urban_architect_order_redirect';
export const ACTIVE_ORDER_STORAGE_KEY = 'urban_architect_active_order';
export const ORDER_LIST_STORAGE_KEY = 'urban_architect_order_list';
export const ORDER_REPOSITORY_KEY = 'urban_architect_order_repository';

const sortByCreatedAt = (list) =>
  [...list].sort((a, b) => {
    const timeA = Number(b?.createdAt || 0);
    const timeB = Number(a?.createdAt || 0);
    return timeA - timeB;
  });

export const getOrderRepository = () => {
  const cached = uni.getStorageSync(ORDER_REPOSITORY_KEY);
  return Array.isArray(cached) ? cached : [];
};

export const saveOrderRepository = (records) => {
  const safeRecords = Array.isArray(records) ? sortByCreatedAt(records) : [];
  uni.setStorageSync(ORDER_REPOSITORY_KEY, safeRecords);
  uni.setStorageSync(
    ORDER_LIST_STORAGE_KEY,
    safeRecords.map((item) => item.listItem)
  );
};

export const upsertOrderRecord = (record) => {
  const current = getOrderRepository();
  const next = current.filter((item) => item.orderNo !== record.orderNo);
  next.unshift(record);
  saveOrderRepository(next);
};

export const getOrderRecordByNo = (orderNo) =>
  getOrderRepository().find((item) => item.orderNo === orderNo);

export const buildCommonOrderRecord = ({
  orderNo,
  type,
  createdAt = Date.now(),
  listItem,
  activeOrder,
  detailPayload,
}) => ({
  orderNo,
  type,
  createdAt,
  listItem,
  activeOrder,
  detailPayload,
});

export const submitOrderRecord = (record) => {
  upsertOrderRecord(record);
  uni.setStorageSync(ACTIVE_ORDER_STORAGE_KEY, record.activeOrder);
  uni.setStorageSync(ORDER_REDIRECT_KEY, 'delivery');
};
