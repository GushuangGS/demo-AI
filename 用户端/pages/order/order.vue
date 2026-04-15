<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="top-brand">
          <text class="material-symbols-outlined top-icon">menu</text>
          <text class="brand-name">UrbanArchitect</text>
        </view>
        <image class="top-avatar" :src="userAvatar" mode="aspectFill" />
      </view>

      <view class="content">
        <view class="page-head">
          <view>
            <text class="page-title">订单中心</text>
            <text class="page-subtitle">覆盖待接单、配送中和历史订单的统一操作入口</text>
          </view>
          <view class="summary-pill">
            <text class="summary-dot"></text>
            <text class="summary-text">{{ currentPrimaryLabel }}</text>
          </view>
        </view>

        <view class="primary-tabs">
          <view
            v-for="tab in primaryTabs"
            :key="tab.key"
            class="primary-tab"
            :class="{ 'primary-tab-active': activePrimaryTab === tab.key }"
            @click="activePrimaryTab = tab.key"
          >
            <text
              class="material-symbols-outlined primary-tab-icon"
              :class="{ 'primary-tab-icon-active': activePrimaryTab === tab.key }"
            >
              {{ tab.icon }}
            </text>
            <text class="primary-tab-text" :class="{ 'primary-tab-text-active': activePrimaryTab === tab.key }">
              {{ tab.label }}
            </text>
          </view>
        </view>

        <view v-if="activePrimaryTab === 'pending'" class="scene scene-pending">
          <view class="pending-hero">
            <view class="pending-map-pattern pattern-one"></view>
            <view class="pending-map-pattern pattern-two"></view>
            <view class="pending-pill">
              <text class="pending-pill-dot"></text>
              <text class="pending-pill-text">正在寻找附近骑手</text>
            </view>
            <text class="pending-title">{{ pendingOrder.etaTitle }}</text>
            <text class="pending-desc">{{ pendingOrder.etaDesc }}</text>
          </view>

          <view class="info-card pending-card">
            <view class="order-meta-grid">
              <view>
                <text class="meta-label">订单编号</text>
                <text class="meta-value meta-value-main">{{ pendingOrder.orderNo }}</text>
              </view>
              <view class="meta-side">
                <text class="meta-label">预估价格</text>
                <text class="meta-price">{{ pendingOrder.price }}</text>
              </view>
            </view>

            <view class="address-list">
              <view class="address-item">
                <view class="address-icon-wrap address-icon-wrap-blue">
                  <text class="material-symbols-outlined address-icon">location_on</text>
                </view>
                <view class="address-copy">
                  <text class="address-label">取件地址</text>
                  <text class="address-title">{{ pendingOrder.pickupTitle }}</text>
                  <text class="address-detail">{{ pendingOrder.pickupDetail }}</text>
                </view>
              </view>

              <view class="address-line"></view>

              <view class="address-item">
                <view class="address-icon-wrap address-icon-wrap-warm">
                  <text class="material-symbols-outlined address-icon">flag</text>
                </view>
                <view class="address-copy">
                  <text class="address-label">收件地址</text>
                  <text class="address-title">{{ pendingOrder.receiverTitle }}</text>
                  <text class="address-detail">{{ pendingOrder.receiverDetail }}</text>
                </view>
              </view>
            </view>

            <view class="action-row">
              <button class="ghost-button" @click="showAction('修改备注')">修改备注</button>
              <button
                class="primary-button"
                @click="
                  goService({
                    source: '待接单客服',
                    orderNo: pendingOrder.orderNo,
                    projectName: '同城派送服务',
                    status: '待接单',
                  })
                "
              >
                联系客服
              </button>
            </view>
          </view>

          <button class="text-button danger-text" @click="confirmCancelOrder">取消订单</button>
        </view>

        <view v-else-if="activePrimaryTab === 'delivery'" class="scene scene-delivery">
          <view class="delivery-hero">
            <view class="delivery-pill">
              <text class="delivery-pill-dot"></text>
              <text class="delivery-pill-text">{{ activeOrder.eta }}</text>
            </view>
            <view class="globe-wrap">
              <view class="globe globe-outer"></view>
              <view class="globe globe-middle"></view>
              <view class="globe globe-inner">
                <text class="material-symbols-outlined globe-icon">local_shipping</text>
              </view>
              <view class="globe-point globe-point-one"></view>
              <view class="globe-point globe-point-two"></view>
              <view class="globe-point globe-point-three"></view>
            </view>
          </view>

          <view class="info-card courier-card">
            <view class="courier-top">
              <view class="courier-profile">
                <image class="courier-avatar" :src="activeOrder.rider.avatar" mode="aspectFill" />
                <view class="courier-copy">
                  <text class="courier-name">{{ activeOrder.rider.name }}</text>
                  <view class="courier-meta-line">
                    <text class="material-symbols-outlined courier-star">star</text>
                    <text class="courier-meta">{{ activeOrder.rider.rating }}</text>
                    <text class="courier-meta">{{ activeOrder.rider.completed }}</text>
                  </view>
                </view>
              </view>
              <view class="courier-actions">
                <view class="round-action" @click="showAction('联系骑手')">
                  <text class="material-symbols-outlined round-action-icon">call</text>
                </view>
                <view
                  class="round-action"
                  @click="
                    goService({
                      source: '配送客服',
                      orderNo: activeOrder.orderNo,
                      projectName: activeOrder.goods,
                      status: '进行中',
                    })
                  "
                >
                  <text class="material-symbols-outlined round-action-icon">chat</text>
                </view>
              </view>
            </view>

            <view class="timeline">
              <view v-for="(step, index) in activeOrder.steps" :key="step.title" class="timeline-item">
                <view class="timeline-marker-wrap">
                  <view class="timeline-marker" :class="{ 'timeline-marker-active': step.active }"></view>
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

          <view class="detail-grid">
            <view class="detail-card detail-address-card">
              <view class="detail-icon-box">
                <text class="material-symbols-outlined detail-icon">location_on</text>
              </view>
              <view class="detail-copy">
                <text class="detail-label">送达地址</text>
                <text class="detail-title">{{ activeOrder.address.title }}</text>
                <text class="detail-desc">{{ activeOrder.address.detail }}</text>
              </view>
            </view>

            <view class="detail-card detail-mini-card">
              <text class="detail-label">订单号</text>
              <text class="detail-title">{{ activeOrder.orderNo }}</text>
            </view>

            <view class="detail-card detail-mini-card">
              <text class="detail-label">支付方式</text>
              <text class="detail-title">{{ activeOrder.payMethod }}</text>
            </view>
          </view>

          <view class="goods-card">
            <view class="goods-head">
              <view>
                <text class="goods-label">物品详情</text>
                <text class="goods-title">{{ activeOrder.goods }}</text>
              </view>
              <text class="material-symbols-outlined goods-icon">deployed_code</text>
            </view>
            <button
              class="service-button"
              @click="
                goService({
                  source: '配送客服',
                  orderNo: activeOrder.orderNo,
                  projectName: activeOrder.goods,
                  status: '进行中',
                })
              "
            >
              联系客服中心
            </button>
          </view>
        </view>

        <view v-else class="scene scene-list">
          <view class="section-head">
            <text class="section-title">我的订单</text>
            <text class="section-hint">支持按状态切换与快捷操作</text>
          </view>

          <view class="filter-tabs">
            <view
              v-for="tab in listTabs"
              :key="tab.key"
              class="filter-tab"
              :class="{ 'filter-tab-active': activeListTab === tab.key }"
              @click="activeListTab = tab.key"
            >
              <text class="filter-tab-text" :class="{ 'filter-tab-text-active': activeListTab === tab.key }">
                {{ tab.label }}
              </text>
            </view>
          </view>

          <view class="order-list">
            <view v-for="item in filteredOrders" :key="item.orderNo" class="list-card">
              <view class="list-head">
                <view class="list-head-main">
                  <view class="list-icon-box" :class="item.iconClass">
                    <text class="material-symbols-outlined list-icon">{{ item.icon }}</text>
                  </view>
                  <view class="list-head-copy">
                    <text class="list-category">{{ item.category }}</text>
                    <text class="list-order-no">订单号: {{ item.orderNo }}</text>
                  </view>
                </view>
                <text class="status-badge" :class="item.statusClass">{{ item.statusLabel }}</text>
              </view>

              <view class="list-body">
                <image class="project-image" :src="item.image" mode="aspectFill" />
                <view class="project-copy">
                  <text class="project-title">{{ item.projectName }}</text>
                  <text class="project-desc">{{ item.projectDesc }}</text>
                  <text class="project-price">{{ item.price }}</text>
                </view>
              </view>

              <view class="list-actions">
                <text class="list-link" @click="goDetail(item)">查看详情</text>
                <button
                  class="list-button"
                  :class="{ 'list-button-outline': item.secondary }"
                  @click="handleOrderAction(item)"
                >
                  {{ item.actionText }}
                </button>
              </view>
            </view>

            <view v-if="!filteredOrders.length" class="empty-card">
              <text class="material-symbols-outlined empty-icon">inventory_2</text>
              <text class="empty-title">当前筛选下暂无订单</text>
              <text class="empty-desc">可以切换状态查看其他订单记录</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="tab-bar">
      <view class="tab-item" @click="switchTab('/pages/index/index')">
        <view class="tab-icon-box">
          <text class="material-symbols-outlined tab-icon">calendar_month</text>
        </view>
        <text class="tab-text">预约</text>
      </view>

      <view class="tab-item tab-item-active" @click="switchTab('/pages/order/order')">
        <view class="tab-icon-box tab-icon-box-active">
          <text class="material-symbols-outlined tab-icon">receipt_long</text>
        </view>
        <text class="tab-text tab-text-active">订单</text>
      </view>

      <view class="tab-item" @click="switchTab('/pages/mine/mine')">
        <view class="tab-icon-box">
          <text class="material-symbols-outlined tab-icon">person</text>
        </view>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onMounted } from 'vue';

const userAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80';

const primaryTabs = [
  { key: 'pending', label: '待接单', icon: 'hourglass_top' },
  { key: 'delivery', label: '进行中', icon: 'local_shipping' },
  { key: 'list', label: '我的订单', icon: 'receipt_long' },
];

const listTabs = [
  { key: 'all', label: '全部' },
  { key: 'inProgress', label: '进行中' },
  { key: 'review', label: '待评价' },
  { key: 'completed', label: '已完成' },
];

const activePrimaryTab = ref('list');
const activeListTab = ref('all');

const pendingOrder = {
  etaTitle: '预计 3 分钟内接单',
  etaDesc: '您的订单已通过 Urban Architect 优先派送通道',
  orderNo: 'UA-88294102-CH',
  price: '¥32.50',
  pickupTitle: '静安区南京西路 1266 号',
  pickupDetail: '恒隆广场办公楼二座',
  receiverTitle: '徐汇区淮海中路 999 号',
  receiverDetail: '环贸商场',
};

const activeOrder = {
  eta: '预计 12:45 送达',
  orderNo: '#UA-8829-X1',
  payMethod: '微信支付',
  goods: '建筑模型耗材 x4',
  rider: {
    name: '张大伟',
    rating: '4.9',
    completed: '1,200+ 订单',
    avatar: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
  },
  steps: [
    {
      title: '正在配送中',
      desc: '骑手已取货，正火速赶往您的地址',
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
};

const orderList = [
  {
    orderNo: 'UA-20230914-01',
    filter: 'inProgress',
    category: '空间规划设计',
    projectName: '滨海别墅概念方案',
    projectDesc: '包含平面布局、3D 建模及初步材料建议',
    price: '¥12,800.00',
    actionText: '联系建筑师',
    actionType: 'service',
    statusLabel: '进行中',
    statusClass: 'status-blue',
    icon: 'architecture',
    iconClass: 'icon-blue',
    secondary: false,
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=320&q=80',
  },
  {
    orderNo: 'UA-20230822-04',
    filter: 'completed',
    category: '园林景观改造',
    projectName: '私人住宅庭院景观',
    projectDesc: '项目已于 2023 年 9 月 5 日交付，可回看完整方案',
    price: '¥45,000.00',
    actionText: '评价订单',
    actionType: 'review',
    statusLabel: '已完成',
    statusClass: 'status-gray',
    icon: 'home_work',
    iconClass: 'icon-gray',
    secondary: true,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=320&q=80',
  },
  {
    orderNo: 'UA-20230910-09',
    filter: 'review',
    category: '灯光氛围设计',
    projectName: '光影交互体验设计',
    projectDesc: '全屋智能灯光联动方案，待您确认最终服务评价',
    price: '¥8,500.00',
    actionText: '立即评价',
    actionType: 'review',
    statusLabel: '待评价',
    statusClass: 'status-warm',
    icon: 'construction',
    iconClass: 'icon-warm',
    secondary: false,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=320&q=80',
  },
];

const currentPrimaryLabel = computed(() => {
  const current = primaryTabs.find((tab) => tab.key === activePrimaryTab.value);
  return current ? current.label : '订单';
});

const filteredOrders = computed(() => {
  if (activeListTab.value === 'all') {
    return orderList;
  }
  return orderList.filter((item) => item.filter === activeListTab.value);
});

const showAction = (action) => {
  uni.showToast({
    title: `${action}功能待接入`,
    icon: 'none',
  });
};

const buildQuery = (params) =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

const goService = ({ source, orderNo, projectName, status }) => {
  uni.navigateTo({
    url: `/pages/order/service?${buildQuery({
      source,
      orderNo,
      projectName,
      status,
    })}`,
  });
};

const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/order/detail?${buildQuery({
      orderNo: item.orderNo,
      projectName: item.projectName,
      status: item.statusLabel,
      price: item.price,
    })}`,
  });
};

const goReview = (item) => {
  uni.navigateTo({
    url: `/pages/order/review?${buildQuery({
      orderNo: item.orderNo,
      projectName: item.projectName,
      status: item.statusLabel,
      price: item.price,
    })}`,
  });
};

const handleOrderAction = (item) => {
  if (item.actionType === 'service') {
    goService({
      source: item.actionText,
      orderNo: item.orderNo,
      projectName: item.projectName,
      status: item.statusLabel,
    });
    return;
  }

  if (item.actionType === 'review') {
    goReview(item);
    return;
  }

  showAction(item.actionText);
};

const confirmCancelOrder = () => {
  uni.showModal({
    title: '确认取消订单',
    content: '订单仍在派单中，确认现在取消吗？',
    confirmColor: '#1647d8',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '订单已取消',
          icon: 'none',
        });
      }
    },
  });
};

onMounted(() => {
  uni.hideTabBar();
});

const switchTab = (url) => {
  uni.switchTab({ url });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f3f4f6;
  color: #191c1e;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.page-shell {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  background: rgba(243, 244, 246, 0.92);
  backdrop-filter: blur(24px);
}

.top-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.top-icon {
  font-size: 22px;
  color: #1246cf;
  font-variation-settings: 'FILL' 1;
}

.brand-name {
  font-size: 15px;
  font-weight: 800;
  color: #1246cf;
  letter-spacing: -0.03em;
}

.top-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 8px 20px rgba(25, 28, 30, 0.08);
}

.content {
  padding: 6px 16px calc(130px + env(safe-area-inset-bottom));
}

.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.page-title {
  display: block;
  font-size: 28px;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #181b20;
}

.page-subtitle {
  display: block;
  margin-top: 8px;
  max-width: 240px;
  font-size: 12px;
  line-height: 1.6;
  color: #697080;
}

.summary-pill {
  flex-shrink: 0;
  margin-top: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  background: #e2e8ff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.summary-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1847d7;
}

.summary-text {
  font-size: 10px;
  font-weight: 800;
  color: #1847d7;
}

.primary-tabs {
  margin-top: 22px;
  padding: 6px;
  border-radius: 24px;
  background: #eceef2;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.primary-tab {
  min-height: 76px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.primary-tab-active {
  background: #ffffff;
  box-shadow: 0 8px 22px rgba(17, 24, 39, 0.06);
}

.primary-tab-icon {
  font-size: 22px;
  color: #99a1af;
  font-variation-settings: 'FILL' 1;
}

.primary-tab-icon-active,
.primary-tab-text-active {
  color: #1647d8;
}

.primary-tab-text {
  font-size: 12px;
  font-weight: 700;
  color: #5d6372;
}

.scene {
  margin-top: 20px;
}

.pending-hero {
  position: relative;
  overflow: hidden;
  border-radius: 32px 32px 22px 22px;
  min-height: 260px;
  padding: 22px 20px 26px;
  background: linear-gradient(180deg, #d7dae2 0%, #c6cad5 100%);
}

.pending-map-pattern {
  position: absolute;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.34);
}

.pattern-one {
  width: 420px;
  height: 420px;
  left: -120px;
  top: -36px;
}

.pattern-two {
  width: 300px;
  height: 300px;
  right: -88px;
  top: 54px;
}

.pending-pill {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 16px;
  background: rgba(235, 239, 255, 0.94);
}

.pending-pill-dot,
.delivery-pill-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #244fd7;
}

.pending-pill-text,
.delivery-pill-text {
  font-size: 12px;
  font-weight: 800;
  color: #173ebc;
}

.pending-title {
  position: relative;
  z-index: 2;
  display: block;
  margin-top: 46px;
  font-size: 30px;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #111418;
}

.pending-desc {
  position: relative;
  z-index: 2;
  display: block;
  margin-top: 14px;
  max-width: 280px;
  font-size: 14px;
  line-height: 1.6;
  color: #4d5361;
}

.info-card {
  margin-top: -28px;
  position: relative;
  z-index: 3;
  border-radius: 30px;
  background: #fbfbfc;
  box-shadow: 0 18px 40px rgba(34, 40, 52, 0.08);
}

.pending-card {
  padding: 24px;
}

.order-meta-grid {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.meta-label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: #1a48d0;
}

.meta-value,
.meta-price {
  display: block;
  margin-top: 12px;
  color: #1a1d24;
}

.meta-value-main {
  font-size: 30px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.meta-side {
  text-align: right;
}

.meta-price {
  font-size: 34px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.06em;
}

.address-list {
  margin-top: 26px;
}

.address-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.address-line {
  width: 2px;
  height: 34px;
  margin: 10px 0 10px 16px;
  background: #dbdfe8;
}

.address-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.address-icon-wrap-blue {
  background: #dfe5ff;
}

.address-icon-wrap-warm {
  background: #f7d9cc;
}

.address-icon {
  font-size: 18px;
  font-variation-settings: 'FILL' 1;
}

.address-icon-wrap-blue .address-icon {
  color: #1847d7;
}

.address-icon-wrap-warm .address-icon {
  color: #9f3006;
}

.address-copy {
  flex: 1;
  min-width: 0;
}

.address-label {
  display: block;
  font-size: 12px;
  color: #7d8392;
}

.address-title {
  display: block;
  margin-top: 6px;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 800;
  color: #1b1e25;
}

.address-detail {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.6;
  color: #525968;
}

.action-row {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.ghost-button,
.primary-button,
.list-button,
.service-button {
  height: 56px;
  border: none;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 800;
  line-height: 56px;
}

.ghost-button {
  background: #eaedf2;
  color: #444b5b;
}

.primary-button,
.service-button,
.list-button:not(.list-button-outline) {
  background: linear-gradient(180deg, #1747d7 0%, #0d3cc7 100%);
  color: #ffffff;
  box-shadow: 0 14px 24px rgba(19, 67, 201, 0.22);
}

.text-button {
  margin-top: 20px;
  width: 100%;
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 700;
}

.danger-text {
  color: #8b93a7;
}

.delivery-hero {
  overflow: hidden;
  border-radius: 28px;
  min-height: 360px;
  padding: 18px 18px 0;
  background: linear-gradient(180deg, #39a7d5 0%, #237ca6 100%);
}

.delivery-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
}

.globe-wrap {
  position: relative;
  width: 220px;
  height: 250px;
  margin: 24px auto 0;
}

.globe {
  position: absolute;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%);
}

.globe-outer {
  top: 0;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle at 40% 35%, #e5f9f7 0%, #bfe6ea 50%, #8bc8d7 100%);
}

.globe-middle {
  top: 44px;
  width: 138px;
  height: 138px;
  background: radial-gradient(circle at 45% 35%, #f7f7fb 0%, #cfd8ed 60%, #b8c7e8 100%);
}

.globe-inner {
  top: 82px;
  width: 74px;
  height: 74px;
  background: linear-gradient(180deg, #1a48d7 0%, #103dc3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 28px rgba(16, 61, 195, 0.28);
}

.globe-icon {
  font-size: 30px;
  color: #ffffff;
  font-variation-settings: 'FILL' 1;
}

.globe-point {
  position: absolute;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%);
}

.globe-point-one {
  bottom: 42px;
  width: 12px;
  height: 12px;
  background: rgba(203, 231, 255, 0.72);
}

.globe-point-two {
  bottom: 16px;
  width: 20px;
  height: 20px;
  background: #f7c53f;
}

.globe-point-three {
  bottom: -2px;
  width: 10px;
  height: 10px;
  background: rgba(203, 231, 255, 0.48);
}

.courier-card {
  margin-top: -18px;
  padding: 22px 18px;
}

.courier-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.courier-profile {
  display: flex;
  align-items: center;
  min-width: 0;
}

.courier-avatar {
  width: 54px;
  height: 54px;
  border-radius: 16px;
}

.courier-copy {
  margin-left: 12px;
  min-width: 0;
}

.courier-name {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: #171a20;
}

.courier-meta-line {
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.courier-star {
  font-size: 15px;
  color: #1948d7;
  font-variation-settings: 'FILL' 1;
}

.courier-meta {
  font-size: 12px;
  color: #6b7282;
}

.courier-actions {
  display: flex;
  gap: 10px;
}

.round-action {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #dde3fb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.round-action-icon {
  font-size: 22px;
  color: #1a48d7;
  font-variation-settings: 'FILL' 1;
}

.timeline {
  margin-top: 24px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.timeline-item + .timeline-item {
  margin-top: 14px;
}

.timeline-marker-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-marker {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #cfd5ef;
}

.timeline-marker-active {
  background: #1948d7;
  box-shadow: 0 0 0 4px rgba(25, 72, 215, 0.12);
}

.timeline-line {
  width: 2px;
  height: 44px;
  margin-top: 6px;
  background: #d8dded;
}

.timeline-copy {
  padding-top: 1px;
}

.timeline-title {
  display: block;
  font-size: 16px;
  font-weight: 800;
  color: #20242b;
}

.timeline-desc {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.5;
  color: #6c7383;
}

.timeline-time {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: #9aa1b0;
}

.detail-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-card {
  border-radius: 24px;
  background: #f0f2f6;
}

.detail-address-card {
  grid-column: span 2;
  padding: 18px;
  display: flex;
  gap: 14px;
}

.detail-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #dce4ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-icon {
  font-size: 24px;
  color: #1847d7;
  font-variation-settings: 'FILL' 1;
}

.detail-copy {
  flex: 1;
}

.detail-label,
.goods-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #667085;
}

.detail-title,
.goods-title {
  display: block;
  margin-top: 8px;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 800;
  color: #171a21;
}

.detail-desc {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.6;
  color: #555d6d;
}

.detail-mini-card {
  padding: 18px 16px;
}

.goods-card {
  margin-top: 14px;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(180deg, #2751d7 0%, #113fbf 100%);
}

.goods-head {
  padding: 18px 18px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.goods-label,
.goods-title,
.goods-icon,
.service-button {
  color: #ffffff;
}

.goods-label {
  color: rgba(235, 240, 255, 0.8);
}

.goods-icon {
  font-size: 30px;
  font-variation-settings: 'FILL' 1;
}

.service-button {
  margin: 0;
  border-radius: 0;
  background: #0f37b1;
  box-shadow: none;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 800;
  color: #191c21;
}

.section-hint {
  font-size: 12px;
  color: #7b8291;
}

.filter-tabs {
  margin-top: 18px;
  padding: 6px;
  border-radius: 20px;
  background: #eceef2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.filter-tab {
  min-height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-tab-active {
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(17, 24, 39, 0.05);
}

.filter-tab-text {
  font-size: 13px;
  font-weight: 700;
  color: #666d7d;
}

.filter-tab-text-active {
  color: #1847d7;
}

.order-list {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-card {
  border-radius: 28px;
  background: #f8f8f9;
  padding: 18px;
  box-shadow: 0 10px 28px rgba(20, 26, 38, 0.04);
}

.list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.list-head-main {
  display: flex;
  align-items: center;
  min-width: 0;
}

.list-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-blue {
  background: #dfe3ff;
}

.icon-gray {
  background: #ebeef3;
}

.icon-warm {
  background: #f7ddd2;
}

.list-icon {
  font-size: 20px;
  font-variation-settings: 'FILL' 1;
}

.icon-blue .list-icon {
  color: #1847d7;
}

.icon-gray .list-icon {
  color: #5e6472;
}

.icon-warm .list-icon {
  color: #9b320f;
}

.list-head-copy {
  margin-left: 12px;
  min-width: 0;
}

.list-category {
  display: block;
  font-size: 14px;
  font-weight: 800;
  color: #1847d7;
}

.list-order-no {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #8a91a0;
}

.status-badge {
  flex-shrink: 0;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
}

.status-blue {
  background: #dfe5ff;
  color: #1847d7;
}

.status-gray {
  background: #e7e9ef;
  color: #737b89;
}

.status-warm {
  background: #f5ddd2;
  color: #9a330f;
}

.list-body {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #e6e8ee;
  display: flex;
  gap: 14px;
}

.project-image {
  width: 78px;
  height: 78px;
  border-radius: 18px;
  flex-shrink: 0;
}

.project-copy {
  flex: 1;
  min-width: 0;
}

.project-title {
  display: block;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 800;
  color: #1a1d23;
}

.project-desc {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.55;
  color: #666e7d;
}

.project-price {
  display: block;
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.15;
  font-weight: 800;
  color: #191c22;
}

.list-actions {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.list-link {
  font-size: 14px;
  font-weight: 700;
  color: #1948d7;
}

.list-button {
  min-width: 124px;
  padding: 0 18px;
}

.list-button-outline {
  background: transparent;
  color: #1747d7;
  border: 1px solid #1747d7;
  box-shadow: none;
}

.empty-card {
  border-radius: 24px;
  background: #f8f8f9;
  padding: 30px 18px;
  text-align: center;
}

.empty-icon {
  font-size: 36px;
  color: #b0b7c6;
}

.empty-title {
  display: block;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 800;
  color: #2c3138;
}

.empty-desc {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #7d8594;
}

.tab-bar {
  position: fixed;
  left: 50%;
  bottom: calc(10px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: calc(100% - 24px);
  max-width: 406px;
  padding: 10px 10px 12px;
  border-radius: 24px;
  background: rgba(247, 247, 248, 0.96);
  box-shadow: 0 10px 32px rgba(25, 28, 30, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 60;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.tab-item-active {
  color: #1c47d6;
}

.tab-icon-box {
  width: 58px;
  height: 44px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon-box-active {
  background: #e8edf7;
}

.tab-icon {
  font-size: 22px;
  color: #9ca5b7;
  font-variation-settings: 'FILL' 1;
}

.tab-text {
  font-size: 10px;
  font-weight: 600;
  color: #9ca5b7;
}

.tab-text-active,
.tab-item-active .tab-icon {
  color: #2450db;
}

button::after {
  border: none;
}
</style>
