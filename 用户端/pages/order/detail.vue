<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="back-action" @click="goBack">
          <text class="material-symbols-outlined back-icon">arrow_back</text>
        </view>
        <text class="top-title">订单详情</text>
        <view class="share-action" @click="shareOrder">
          <text class="material-symbols-outlined share-icon">share</text>
        </view>
      </view>

      <view class="content">
        <view class="hero-card">
          <text class="hero-status">{{ status }}</text>
          <text class="hero-title">{{ projectName }}</text>
          <text class="hero-desc">{{ summary }}</text>
          <view class="hero-price-row">
            <text class="hero-price">{{ price }}</text>
            <text class="hero-order-no">{{ orderNo }}</text>
          </view>
        </view>

        <view class="panel">
          <text class="section-title">服务进度</text>
          <view v-for="(step, index) in timeline" :key="step.title" class="timeline-item">
            <view class="timeline-side">
              <view class="timeline-dot" :class="{ 'timeline-dot-active': index === 0 }"></view>
              <view v-if="index !== timeline.length - 1" class="timeline-line"></view>
            </view>
            <view class="timeline-copy">
              <text class="timeline-title">{{ step.title }}</text>
              <text class="timeline-desc">{{ step.desc }}</text>
              <text class="timeline-time">{{ step.time }}</text>
            </view>
          </view>
        </view>

        <view class="info-grid">
          <view class="info-card info-card-wide">
            <text class="info-label">服务地址</text>
            <text class="info-title">{{ address }}</text>
            <text class="info-desc">{{ contact }}</text>
          </view>

          <view class="info-card">
            <text class="info-label">支付方式</text>
            <text class="info-title">微信支付</text>
          </view>

          <view class="info-card">
            <text class="info-label">服务人员</text>
            <text class="info-title">{{ assignee }}</text>
          </view>
        </view>

        <view class="panel">
          <text class="section-title">服务内容</text>
          <view class="summary-list">
            <view v-for="item in detailList" :key="item.label" class="summary-item">
              <text class="summary-label">{{ item.label }}</text>
              <text class="summary-value">{{ item.value }}</text>
            </view>
          </view>
        </view>

        <view class="action-row">
          <button class="ghost-button" @click="goService">联系客服</button>
          <button class="primary-button" @click="goReview">去评价</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const orderNo = ref('UA-20230914-01');
const status = ref('进行中');
const projectName = ref('滨海别墅概念方案');
const price = ref('¥12,800.00');
const summary = ref('包含平面布局、3D 建模及初步材料建议');
const address = ref('静安区南京西路 1601 号，越洋广场 28 楼');
const contact = ref('联系人：张女士 138****8888');
const assignee = ref('主案建筑师 刘工');

const timeline = ref([
  {
    title: '需求已确认',
    desc: '服务内容和交付时间已锁定',
    time: '04-14 10:20',
  },
  {
    title: '方案设计中',
    desc: '设计师正在整理概念稿与空间建议',
    time: '04-15 14:10',
  },
  {
    title: '待您确认',
    desc: '初稿完成后会通过站内消息同步',
    time: '预计 04-18',
  },
]);

const detailList = ref([
  { label: '订单类型', value: '空间规划设计' },
  { label: '交付形式', value: '线上方案 + PDF 文件' },
  { label: '预计交付', value: '2026-04-18 18:00' },
  { label: '备注信息', value: '偏好现代极简风格，关注采光与动线' },
]);

onLoad((options) => {
  orderNo.value = options?.orderNo || orderNo.value;
  status.value = options?.status || status.value;
  projectName.value = options?.projectName || projectName.value;
  price.value = options?.price || price.value;
});

const goBack = () => {
  uni.navigateBack();
};

const shareOrder = () => {
  uni.showToast({
    title: '分享功能待接入',
    icon: 'none',
  });
};

const goService = () => {
  uni.navigateTo({
    url: `/pages/order/service?source=${encodeURIComponent('订单详情')}&orderNo=${encodeURIComponent(
      orderNo.value
    )}&projectName=${encodeURIComponent(projectName.value)}&status=${encodeURIComponent(status.value)}`,
  });
};

const goReview = () => {
  uni.navigateTo({
    url: `/pages/order/review?orderNo=${encodeURIComponent(orderNo.value)}&projectName=${encodeURIComponent(
      projectName.value
    )}&status=${encodeURIComponent(status.value)}&price=${encodeURIComponent(price.value)}`,
  });
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
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(243, 244, 246, 0.94);
  backdrop-filter: blur(24px);
}

.back-action,
.share-action {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: #e8ebf3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon,
.share-icon {
  font-size: 20px;
  color: #1847d7;
  font-variation-settings: 'FILL' 1;
}

.top-title {
  font-size: 17px;
  font-weight: 800;
  color: #191c21;
}

.content {
  padding: 10px 16px 32px;
}

.hero-card,
.panel,
.info-card {
  border-radius: 26px;
  background: #fbfbfc;
  box-shadow: 0 10px 28px rgba(20, 26, 38, 0.04);
}

.hero-card {
  padding: 22px 20px;
  background: linear-gradient(180deg, #1f4fd8 0%, #123dc2 100%);
}

.hero-status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #eaf0ff;
  font-size: 11px;
  font-weight: 700;
}

.hero-title {
  display: block;
  margin-top: 18px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 800;
  color: #ffffff;
}

.hero-desc {
  display: block;
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(233, 239, 255, 0.84);
}

.hero-price-row {
  margin-top: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.hero-price {
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
}

.hero-order-no {
  font-size: 12px;
  color: rgba(233, 239, 255, 0.78);
}

.panel {
  margin-top: 18px;
  padding: 18px;
}

.section-title {
  display: block;
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 800;
  color: #1c2027;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.timeline-item + .timeline-item {
  margin-top: 14px;
}

.timeline-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d7dcef;
}

.timeline-dot-active {
  background: #1847d7;
  box-shadow: 0 0 0 4px rgba(24, 71, 215, 0.12);
}

.timeline-line {
  width: 2px;
  height: 42px;
  margin-top: 6px;
  background: #dce1ee;
}

.timeline-copy {
  flex: 1;
}

.timeline-title {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #1d2128;
}

.timeline-desc {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  line-height: 1.6;
  color: #737a89;
}

.timeline-time {
  display: block;
  margin-top: 5px;
  font-size: 11px;
  color: #9aa1b0;
}

.info-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.info-card {
  padding: 18px;
}

.info-card-wide {
  grid-column: span 2;
}

.info-label,
.summary-label {
  display: block;
  font-size: 12px;
  color: #808796;
}

.info-title,
.summary-value {
  display: block;
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.45;
  font-weight: 800;
  color: #1c2027;
}

.info-desc {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.6;
  color: #6f7686;
}

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-item + .summary-item {
  padding-top: 16px;
  border-top: 1px solid #eceef2;
}

.action-row {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.ghost-button,
.primary-button {
  height: 52px;
  border: none;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 800;
  line-height: 52px;
}

.ghost-button {
  background: #e9edf5;
  color: #4c5362;
}

.primary-button {
  background: linear-gradient(180deg, #1b49d8 0%, #0f3dc7 100%);
  color: #ffffff;
  box-shadow: 0 14px 24px rgba(19, 67, 201, 0.22);
}

button::after {
  border: none;
}
</style>
