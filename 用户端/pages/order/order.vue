<template>
  <view class="page">
    <view class="page-shell">
      <view v-if="pageMode === 'delivery'" class="delivery-shell">
        <view class="delivery-top-bar">
          <view class="delivery-back" @tap="backToList">
            <LocalIcon class="delivery-back-icon" name="arrow_back" />
          </view>
          <text class="delivery-top-title">进行中订单</text>
          <view class="delivery-top-actions">
            <view class="delivery-action" @tap="shareOrder">
              <LocalIcon class="delivery-action-icon" name="share" />
            </view>
            <image class="delivery-action-avatar" :src="activeOrder.rider.avatar" mode="aspectFill" />
          </view>
        </view>

        <scroll-view scroll-y class="page-scroll">
          <view class="delivery-banner">
            <view class="delivery-eta-pill">
              <view class="delivery-eta-dot"></view>
              <text class="delivery-eta-text">{{ activeOrder.eta }}</text>
            </view>

            <view class="planet-wrap">
              <view class="planet planet-outer"></view>
              <view class="planet planet-mid"></view>
              <view class="planet planet-inner">
                <view class="planet-core">
                  <LocalIcon class="planet-icon" :name="activeOrder.listIcon" />
                </view>
              </view>
              <view class="planet-trace"></view>
              <view class="planet-trace planet-trace-small"></view>
              <view class="planet-signal"></view>
            </view>
          </view>

          <view class="delivery-content">
            <view class="rider-card">
              <view class="rider-head">
                <image class="rider-avatar" :src="activeOrder.rider.avatar" mode="aspectFill" />
                <view class="rider-copy">
                  <text class="rider-name">{{ activeOrder.rider.name }}</text>
                  <view class="rider-meta">
                    <LocalIcon class="rider-star" name="star" />
                    <text class="rider-score">{{ activeOrder.rider.rating }}</text>
                    <text class="rider-count">已配送 {{ activeOrder.rider.completed }}</text>
                  </view>
                </view>

                <view class="rider-actions">
                  <view class="rider-action" @tap="callRider">
                    <LocalIcon class="rider-action-icon" name="call" />
                  </view>
                  <view class="rider-action" @tap="goService">
                    <LocalIcon class="rider-action-icon" name="chat" />
                  </view>
                </view>
              </view>

              <view class="timeline-card">
                <view v-for="(step, index) in activeOrder.steps" :key="step.title" class="timeline-item">
                  <view class="timeline-side">
                    <view class="timeline-dot" :class="step.active ? 'timeline-dot-active' : ''"></view>
                    <view v-if="index !== activeOrder.steps.length - 1" class="timeline-line"></view>
                  </view>
                  <view class="timeline-copy">
                    <text class="timeline-title">{{ step.title }}</text>
                    <text class="timeline-desc">{{ step.desc }}</text>
                    <text class="timeline-time">{{ step.time }}</text>
                  </view>
                </view>
              </view>
            </view>

            <view class="info-card address-card">
              <view class="info-icon-box">
                <LocalIcon class="info-icon" name="location_on" />
              </view>
              <view class="info-copy">
                <text class="info-label">{{ activeOrder.addressLabel }}</text>
                <text class="info-title">{{ activeOrder.address.title }}</text>
                <text class="info-desc">{{ activeOrder.address.detail }}</text>
              </view>
            </view>

            <view class="detail-grid">
              <view class="meta-card">
                <text class="meta-label">订单号</text>
                <text class="meta-value">{{ activeOrder.orderNo }}</text>
              </view>
              <view class="meta-card">
                <text class="meta-label">支付方式</text>
                <view class="pay-row">
                  <LocalIcon class="pay-icon" name="verified_user" />
                  <text class="meta-value">{{ activeOrder.payMethod }}</text>
                </view>
              </view>
            </view>

            <view class="goods-card">
              <view class="goods-main">
                <text class="goods-label">{{ activeOrder.detailLabel }}</text>
                <text class="goods-title">{{ activeOrder.goods }}</text>
              </view>
              <LocalIcon class="goods-icon" :name="activeOrder.listIcon" />
            </view>

            <view class="service-button" @tap="goService">
              <LocalIcon class="service-button-icon" name="support_agent" />
              <text class="service-button-text">联系客服中心</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <view v-else class="list-shell">
        <view class="top-bar">
          <view class="brand-group">
            <LocalIcon class="brand-menu" name="menu" />
            <text class="brand-title">UrbanArchitect</text>
          </view>
          <image class="brand-avatar" :src="brandAvatar" mode="aspectFill" />
        </view>

        <scroll-view scroll-y class="page-scroll">
          <view class="content">
            <text class="page-title">我的订单</text>

            <view class="filter-bar">
              <view
                v-for="item in filters"
                :key="item.key"
                class="filter-item"
                :class="activeFilter === item.key ? 'filter-item-active' : ''"
                @tap="activeFilter = item.key"
              >
                <text class="filter-text" :class="activeFilter === item.key ? 'filter-text-active' : ''">{{
                  item.label
                }}</text>
              </view>
            </view>

            <view class="order-list">
              <view v-for="item in filteredOrders" :key="item.orderNo" class="order-card">
                <view class="order-card-head">
                  <view class="order-category">
                    <view class="order-icon-box" :class="item.iconClass">
                      <LocalIcon class="order-icon" :name="item.icon" />
                    </view>
                    <view class="order-category-copy">
                      <text class="order-category-title">{{ item.category }}</text>
                      <text class="order-category-no">订单号:{{ item.orderNo }}</text>
                    </view>
                  </view>
                  <view class="status-pill" :class="item.statusClass">{{ item.statusLabel }}</view>
                </view>

                <view class="order-divider"></view>

                <view class="order-body">
                  <image class="order-image" :src="item.image" mode="aspectFill" />
                  <view class="order-main">
                    <text class="order-name">{{ item.projectName }}</text>
                    <text class="order-desc">{{ item.projectDesc }}</text>
                    <text class="order-price">{{ item.priceText }}</text>
                  </view>
                </view>

                <view class="order-divider"></view>

                <view class="order-actions">
                  <view class="ghost-link" @tap="goDetail(item)">查看详情</view>
                  <view
                    class="primary-link"
                    :class="item.actionType === 'review' ? 'primary-link-outline' : ''"
                    @tap="handleCardAction(item)"
                  >
                    {{ item.actionText }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="tab-bar">
      <view class="tab-item" @tap="openRootPage('/pages/index/index')">
        <view class="tab-icon-box">
          <LocalIcon class="tab-icon" name="calendar_month" />
        </view>
        <text class="tab-text">预约</text>
      </view>
      <view class="tab-item tab-item-active" @tap="openRootPage('/pages/order/order')">
        <view class="tab-icon-box tab-icon-box-active">
          <LocalIcon class="tab-icon" name="receipt_long" />
        </view>
        <text class="tab-text tab-text-active">订单</text>
      </view>
      <view class="tab-item" @tap="openRootPage('/pages/mine/mine')">
        <view class="tab-icon-box">
          <LocalIcon class="tab-icon" name="person" />
        </view>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import LocalIcon from '@/components/LocalIcon.vue';

import { computed, ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { fetchOrderList } from '../../api/order';
import { ORDER_REDIRECT_KEY } from '../../utils/order-store';

const brandAvatar = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80';

const pageMode = ref('list');
const activeFilter = ref('all');

const filters = [
  { key: 'all', label: '全部' },
  { key: 'inProgress', label: '进行中' },
  { key: 'review', label: '待评价' },
  { key: 'completed', label: '已完成' },
];

const orderList = ref([]);

const activeOrder = ref({
  orderId: '',
  orderNo: '#UA-8829-X1',
  eta: '预计12:45送达',
  payMethod: '微信支付',
  goods: '建筑模型耗材 x4',
  addressLabel: '送达地址',
  detailLabel: '物品详情',
  listIcon: 'shopping_bag',
  rider: {
    name: '张大伟',
    rating: '4.9',
    completed: '1,200+ 订单',
    avatar: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
  },
  steps: [
    {
      title: '正在配送中',
      desc: '骑手已取货，正火速赶赴您的地址',
      time: '12:32 PM',
      active: true,
    },
    {
      title: '配送完成',
      desc: '预计 12:45 送达',
      time: '待完成',
      active: false,
    },
  ],
  address: {
    title: '静安区南京西路 1601 号',
    detail: '越洋广场 28 楼 138****8888',
  },
});

const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') {
    return orderList.value;
  }
  return orderList.value.filter((item) => item.filter === activeFilter.value);
});

const getAddressLabel = (serviceType) => {
  const map = { buy: '收货地址', send: '收件地址', task: '办理说明', universal: '需求概览' };
  return map[serviceType] || '送达地址';
};

const getDetailLabel = (serviceLabel) => {
  return serviceLabel ? `${serviceLabel}详情` : '物品详情';
};

const normalizeActiveOrder = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return;
  }

  activeOrder.value = {
    orderNo: payload.orderNo || activeOrder.value.orderNo,
    eta: payload.eta || payload.etaTitle || activeOrder.value.eta,
    payMethod: payload.paymentMethod || activeOrder.value.payMethod,
    goods: payload.goods || activeOrder.value.goods,
    addressLabel: payload.addressLabel || getAddressLabel(payload.serviceType),
    detailLabel: payload.detailLabel || getDetailLabel(payload.serviceLabel),
    listIcon: guessListIcon(payload.serviceType),
    rider: {
      name: payload.rider?.name || activeOrder.value.rider.name,
      rating: payload.rider?.rating || activeOrder.value.rider.rating,
      completed: payload.rider?.completed || activeOrder.value.rider.completed,
      avatar: payload.rider?.avatar || activeOrder.value.rider.avatar,
    },
    steps: Array.isArray(payload.steps) && payload.steps.length ? payload.steps : activeOrder.value.steps,
    address: {
      title: payload.address?.title || payload.receiverTitle || activeOrder.value.address.title,
      detail: payload.address?.detail || payload.receiverDetail || activeOrder.value.address.detail,
    },
  };
};

const guessListIcon = (serviceType) => {
  const map = { buy: 'shopping_bag', send: 'local_shipping', task: 'assignment', universal: 'auto_awesome' };
  return map[serviceType] || 'shopping_bag';
};

const getIconClass = (serviceType) => {
  const map = { buy: 'icon-blue', send: 'icon-blue', task: 'icon-warm', universal: 'icon-gray' };
  return map[serviceType] || 'icon-blue';
};

const getStatusClass = (status) => {
  if (status === 'review') return 'status-warm';
  if (status === 'completed' || status === 'cancelled') return 'status-gray';
  return 'status-blue';
};

const loadOrders = async () => {
  try {
    const records = await fetchOrderList();
    orderList.value = records.map((item) => ({
      ...item,
      icon: guessListIcon(item.serviceType),
      iconClass: getIconClass(item.serviceType),
      statusClass: getStatusClass(item.status),
      priceText: typeof item.price === 'number' ? `¥${item.price.toFixed(2)}` : item.price,
    }));

    const currentActiveOrder = records.find((item) => item.status === 'in_progress');
    normalizeActiveOrder(currentActiveOrder);
  } catch (error) {
    uni.showToast({
      title: error?.message || '订单加载失败',
      icon: 'none',
    });
  }
};

const syncActiveMode = () => {
  const redirect = uni.getStorageSync(ORDER_REDIRECT_KEY);

  if (redirect === 'delivery') {
    pageMode.value = 'delivery';
    uni.removeStorageSync(ORDER_REDIRECT_KEY);
    return;
  }

  pageMode.value = 'list';
};

onShow(async () => {
  await loadOrders();
  syncActiveMode();
});

const openRootPage = (url) => {
  uni.reLaunch({ url });
};

const backToList = () => {
  pageMode.value = 'list';
};

const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/order/detail?id=${encodeURIComponent(item.id)}&orderNo=${encodeURIComponent(item.orderNo)}&projectName=${encodeURIComponent(
      item.projectName,
    )}&status=${encodeURIComponent(item.statusLabel)}&price=${encodeURIComponent(item.priceText || item.price)}`,
  });
};

const handleCardAction = (item) => {
  if (item.actionType === 'review') {
    uni.navigateTo({
      url: `/pages/order/review?orderNo=${encodeURIComponent(item.orderNo)}&projectName=${encodeURIComponent(
        item.projectName,
      )}&status=${encodeURIComponent(item.statusLabel)}&price=${encodeURIComponent(item.priceText || item.price)}`,
    });
    return;
  }

  uni.navigateTo({
    url: `/pages/order/service?source=${encodeURIComponent('订单列表')}&orderNo=${encodeURIComponent(
      item.orderNo,
    )}&projectName=${encodeURIComponent(item.projectName)}&status=${encodeURIComponent(item.statusLabel)}`,
  });
};

const goService = () => {
  uni.navigateTo({
    url: `/pages/order/service?source=${encodeURIComponent('进行中订单')}&orderNo=${encodeURIComponent(
      activeOrder.value.orderNo,
    )}&projectName=${encodeURIComponent(activeOrder.value.goods)}&status=${encodeURIComponent('进行中')}`,
  });
};

const shareOrder = () => {
  uni.showToast({
    title: '分享功能待接入',
    icon: 'none',
  });
};

const callRider = () => {
  uni.showToast({
    title: '骑手通话待接入',
    icon: 'none',
  });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f3f5;
  color: #191c1e;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.page-shell {
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 112px;
  box-sizing: border-box;
}

.page-scroll {
  height: 100vh;
}

.top-bar,
.delivery-top-bar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.top-bar {
  padding-top: var(--status-bar-height, env(safe-area-inset-top));
  box-sizing: content-box;
  height: 74px;
  padding: 18px 18px 12px;
  background: rgba(242, 243, 245, 0.96);
}

.brand-group {
  display: flex;
  align-items: center;
}

.brand-menu {
  width: 22px;
  height: 22px;
}

.brand-title {
  margin-left: 14px;
  font-size: 20px;
  font-weight: 800;
  color: #1847d7;
}

.brand-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.content {
  padding: 10px 18px 24px;
}

.page-title {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: #161b22;
}

.filter-bar {
  margin-top: 22px;
  height: 48px;
  border-radius: 18px;
  background: #eceef2;
  display: flex;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
}

.filter-item {
  flex: 1;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-item-active {
  background: #ffffff;
}

.filter-text {
  font-size: 14px;
  color: #606876;
}

.filter-text-active {
  color: #1847d7;
  font-weight: 800;
}

.order-list {
  margin-top: 18px;
}

.order-card {
  margin-bottom: 18px;
  border-radius: 28px;
  background: #f8f8f9;
  padding: 18px;
  box-sizing: border-box;
  box-shadow: 0 14px 28px rgba(20, 28, 40, 0.04);
}

.order-card-head,
.order-category,
.order-body,
.order-actions,
.pay-row,
.delivery-top-actions,
.rider-head,
.rider-meta,
.rider-actions,
.info-card,
.goods-card,
.service-button,
.delivery-eta-pill {
  display: flex;
  align-items: center;
}

.order-card-head,
.order-actions {
  justify-content: space-between;
}

.order-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-blue {
  background: #dde3ff;
}

.icon-gray {
  background: #eceef2;
}

.icon-warm {
  background: #ffe4da;
}

.order-icon {
  width: 18px;
  height: 18px;
}

.order-category-copy {
  margin-left: 12px;
}

.order-category-title {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #1847d7;
}

.order-category-no {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #9097a3;
}

.status-pill {
  min-width: 66px;
  padding: 0 12px;
  height: 28px;
  border-radius: 999px;
  text-align: center;
  line-height: 28px;
  font-size: 11px;
  font-weight: 700;
  box-sizing: border-box;
}

.status-blue {
  background: #dde3ff;
  color: #1847d7;
}

.status-gray {
  background: #eceef2;
  color: #767d89;
}

.status-warm {
  background: #ffdcd3;
  color: #9f3514;
}

.order-divider {
  height: 1px;
  margin: 16px 0;
  background: rgba(196, 197, 215, 0.35);
}

.order-image {
  width: 78px;
  height: 78px;
  border-radius: 14px;
}

.order-main {
  flex: 1;
  margin-left: 14px;
}

.order-name {
  display: block;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 800;
  color: #191d24;
}

.order-desc {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.6;
  color: #666f7e;
}

.order-price {
  display: block;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 800;
  color: #1a1f27;
}

.ghost-link,
.primary-link {
  min-width: 112px;
  height: 42px;
  border-radius: 14px;
  text-align: center;
  line-height: 42px;
  font-size: 14px;
  font-weight: 800;
  box-sizing: border-box;
}

.ghost-link {
  color: #1847d7;
}

.primary-link {
  background: linear-gradient(180deg, #1e4ad8 0%, #103ed2 100%);
  color: #ffffff;
  box-shadow: 0 12px 22px rgba(24, 71, 215, 0.2);
}

.primary-link-outline {
  background: transparent;
  border: 1px solid #1847d7;
  color: #1847d7;
  box-shadow: none;
}

.delivery-top-bar {
  height: 62px;
  padding: 0 16px;
  background: #f2f3f5;
}

.delivery-back,
.delivery-action {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delivery-back-icon,
.delivery-action-icon {
  width: 20px;
  height: 20px;
}

.delivery-top-title {
  font-size: 18px;
  font-weight: 800;
  color: #1847d7;
}

.delivery-action-avatar {
  width: 28px;
  height: 28px;
  margin-left: 10px;
  border-radius: 50%;
}

.delivery-banner {
  position: relative;
  overflow: hidden;
  min-height: 350px;
  background: linear-gradient(180deg, #3aa3d0 0%, #247caa 58%, #1870a1 100%);
}

.delivery-banner::before,
.delivery-banner::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.18);
}

.delivery-banner::before {
  width: 520px;
  height: 520px;
  left: -80px;
  top: -170px;
}

.delivery-banner::after {
  width: 660px;
  height: 660px;
  left: -160px;
  top: -260px;
}

.delivery-eta-pill {
  position: absolute;
  top: 24px;
  left: 18px;
  z-index: 2;
  height: 40px;
  padding: 0 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  box-sizing: border-box;
}

.delivery-eta-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4779e7;
}

.delivery-eta-text {
  margin-left: 10px;
  font-size: 13px;
  font-weight: 800;
  color: #1e4ad8;
}

.planet-wrap {
  position: relative;
  width: 220px;
  height: 250px;
  margin: 74px auto 0;
}

.planet {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}

.planet-outer {
  top: 0;
  width: 176px;
  height: 176px;
  background: rgba(212, 250, 255, 0.8);
}

.planet-mid {
  top: 38px;
  width: 138px;
  height: 138px;
  background: rgba(255, 255, 255, 0.84);
}

.planet-inner {
  top: 78px;
  width: 92px;
  height: 92px;
  background: rgba(200, 215, 244, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.planet-core {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: #1847d7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.planet-icon {
  width: 22px;
  height: 22px;
}

.planet-trace,
.planet-signal {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}

.planet-trace {
  width: 10px;
  height: 10px;
  bottom: 26px;
  background: rgba(212, 250, 255, 0.6);
}

.planet-trace-small {
  width: 6px;
  height: 6px;
  bottom: 10px;
}

.planet-signal {
  width: 20px;
  height: 20px;
  bottom: -18px;
  background: linear-gradient(180deg, #ffd24a 0%, #f0a700 100%);
}

.delivery-content {
  margin-top: -20px;
  padding: 0 16px 24px;
}

.rider-card,
.info-card,
.meta-card {
  background: #f8f8f9;
}

.rider-card {
  border-radius: 28px;
  padding: 18px;
  box-shadow: 0 14px 28px rgba(20, 28, 40, 0.04);
}

.rider-avatar {
  width: 56px;
  height: 56px;
  border-radius: 14px;
}

.rider-copy {
  flex: 1;
  margin-left: 14px;
}

.rider-name {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: #171c23;
}

.rider-meta {
  margin-top: 8px;
}

.rider-star {
  width: 14px;
  height: 14px;
}

.rider-score {
  margin-left: 6px;
  font-size: 14px;
  font-weight: 800;
  color: #1847d7;
}

.rider-count {
  margin-left: 10px;
  font-size: 13px;
  color: #737b89;
}

.rider-actions {
  margin-left: 12px;
}

.rider-action {
  width: 42px;
  height: 42px;
  margin-left: 8px;
  border-radius: 50%;
  background: #dde3ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rider-action-icon {
  width: 20px;
  height: 20px;
}

.timeline-card {
  margin-top: 18px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
}

.timeline-item + .timeline-item {
  margin-top: 18px;
}

.timeline-side {
  width: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #cfd6ef;
}

.timeline-dot-active {
  background: #1847d7;
  box-shadow: 0 0 0 4px rgba(24, 71, 215, 0.14);
}

.timeline-line {
  width: 2px;
  height: 44px;
  margin-top: 6px;
  background: #d6dcef;
}

.timeline-copy {
  flex: 1;
  margin-left: 12px;
}

.timeline-title {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #20242c;
}

.timeline-desc {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: #707888;
}

.timeline-time {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #8b92a0;
}

.info-card {
  margin-top: 18px;
  border-radius: 22px;
  padding: 16px;
}

.info-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: #dde3ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-icon {
  width: 18px;
  height: 18px;
}

.info-copy {
  flex: 1;
  margin-left: 12px;
}

.info-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #1847d7;
}

.info-title {
  display: block;
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.45;
  font-weight: 800;
  color: #1a1f27;
}

.info-desc {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #626a79;
}

.detail-grid {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.meta-card {
  width: calc(50% - 7px);
  border-radius: 20px;
  padding: 16px;
  box-sizing: border-box;
}

.meta-label {
  display: block;
  font-size: 12px;
  color: #8e95a2;
}

.meta-value {
  display: block;
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 800;
  color: #191e26;
}

.pay-icon {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

.goods-card {
  margin-top: 18px;
  border-radius: 22px;
  background: linear-gradient(180deg, #2b58dc 0%, #1847d7 100%);
  padding: 18px;
  justify-content: space-between;
}

.goods-main {
  flex: 1;
}

.goods-label {
  display: block;
  font-size: 12px;
  color: rgba(235, 239, 255, 0.82);
}

.goods-title {
  display: block;
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.35;
  font-weight: 800;
  color: #ffffff;
}

.goods-icon {
  width: 28px;
  height: 28px;
  margin-left: 12px;
}

.service-button {
  margin-top: 0;
  height: 54px;
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  background: #113fc9;
  justify-content: center;
}

.service-button-icon {
  width: 18px;
  height: 18px;
}

.service-button-text {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
}

.tab-bar {
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 40;
  width: 100%;
  max-width: 430px;
  transform: translateX(-50%);
  padding: 10px 18px 24px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0 -8px 30px rgba(20, 28, 40, 0.06);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-item-active {
  color: #1847d7;
}

.tab-icon-box {
  width: 44px;
  height: 36px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon-box-active {
  background: #dce3ff;
}

.tab-icon {
  width: 18px;
  height: 18px;
}

.tab-text {
  margin-top: 4px;
  font-size: 10px;
  font-weight: 700;
  color: #8b92a0;
}

.tab-text-active {
  color: #1847d7;
}
</style>
