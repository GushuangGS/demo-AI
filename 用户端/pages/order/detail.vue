<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="back-action" @click="goBack">
          <LocalIcon class="back-icon" name="arrow_back" />
        </view>
        <text class="top-title">订单详情</text>
        <view>
          <!-- <LocalIcon class="share-icon" name="share" /> -->
        </view>
      </view>

      <view class="content">
        <view class="hero-card" :class="heroThemeClass">
          <text class="hero-status">{{ detailState.status }}</text>
          <text class="hero-title">{{ detailState.title }}</text>
          <text class="hero-desc">{{ detailState.summary }}</text>
          <view class="hero-price-row">
            <text class="hero-price">{{ detailState.price }}</text>
            <text class="hero-order-no">{{ detailState.orderNo }}</text>
          </view>
        </view>

        <view class="panel">
          <text class="section-title">服务进度</text>
          <view v-for="(step, index) in detailState.timeline" :key="step.title" class="timeline-item">
            <view class="timeline-side">
              <view class="timeline-dot" :class="{ 'timeline-dot-active': index === 0 }"></view>
              <view v-if="index !== detailState.timeline.length - 1" class="timeline-line"></view>
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
            <text class="info-label">{{ detailState.infoLabel }}</text>
            <text class="info-title">{{ detailState.infoTitle }}</text>
            <text class="info-desc">{{ detailState.infoDesc }}</text>
          </view>

          <view class="info-card">
            <text class="info-label">支付方式</text>
            <text class="info-title">{{ detailState.payMethod }}</text>
          </view>

          <view class="info-card">
            <text class="info-label">服务人员</text>
            <text class="info-title">{{ detailState.assignee }}</text>
          </view>
        </view>

        <view v-if="detailType === 'buy'" class="panel">
          <text class="section-title">代购详情</text>
          <view class="summary-list">
            <view class="summary-item">
              <text class="summary-label">商品信息</text>
              <text class="summary-value">{{ buySection.goodsName }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">预估价格</text>
              <text class="summary-value">{{ buySection.goodsPrice }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">购买地址</text>
              <text class="summary-value">{{ buySection.pickupAddress }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">收货地址</text>
              <text class="summary-value">{{ buySection.receiverAddress }}</text>
              <text class="summary-extra">{{ buySection.receiverContact }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">送达时间</text>
              <text class="summary-value">{{ buySection.deliverTime }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">备注要求</text>
              <text class="summary-value">{{ buySection.remark }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">费用说明</text>
              <text class="summary-value">{{ buySection.feeText }}</text>
            </view>
          </view>
          <image v-if="buySection.imageUrl" class="detail-image" :src="buySection.imageUrl" mode="aspectFill" />
        </view>

        <view v-else-if="detailType === 'send'" class="panel">
          <text class="section-title">寄送详情</text>
          <view class="summary-list">
            <view class="summary-item">
              <text class="summary-label">寄送物品</text>
              <text class="summary-value">{{ sendSection.itemName }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">物品说明</text>
              <text class="summary-value">{{ sendSection.itemRemark }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">取件地址</text>
              <text class="summary-value">{{ sendSection.pickupAddress }}</text>
              <text class="summary-extra">{{ sendSection.pickupContact }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">收件地址</text>
              <text class="summary-value">{{ sendSection.receiverAddress }}</text>
              <text class="summary-extra">{{ sendSection.receiverContact }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">配送时效</text>
              <text class="summary-value">{{ sendSection.deliverySpeed }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">保价服务</text>
              <text class="summary-value">{{ sendSection.insurance }}</text>
            </view>
          </view>
        </view>

        <view v-else-if="detailType === 'errand'" class="panel">
          <text class="section-title">代办详情</text>
          <view class="summary-list">
            <view class="summary-item">
              <text class="summary-label">代办类型</text>
              <text class="summary-value">{{ errandSection.taskType }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">任务说明</text>
              <text class="summary-value">{{ errandSection.taskDesc }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">期望时间</text>
              <text class="summary-value">{{ errandSection.taskTime }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">优先级</text>
              <text class="summary-value">{{ errandSection.priority }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">预算范围</text>
              <text class="summary-value">{{ errandSection.budget }}</text>
            </view>
          </view>
        </view>

        <view v-else-if="detailType === 'all'" class="panel">
          <text class="section-title">需求详情</text>
          <view class="summary-list">
            <view class="summary-item">
              <text class="summary-label">需求类型</text>
              <text class="summary-value">{{ allSection.sceneText }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">详细需求</text>
              <text class="summary-value">{{ allSection.requirement }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">期望完成时间</text>
              <text class="summary-value">{{ allSection.deadline }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">预算范围</text>
              <text class="summary-value">{{ allSection.budget }}</text>
            </view>
            <view class="summary-item">
              <text class="summary-label">平台建议</text>
              <text class="summary-value">{{ allSection.suggestion }}</text>
            </view>
          </view>
        </view>

        <view v-else class="panel">
          <text class="section-title">服务内容</text>
          <view class="summary-list">
            <view v-for="item in genericList" :key="item.label" class="summary-item">
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
import LocalIcon from '@/components/LocalIcon.vue';

import { computed, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getOrderRecordByNo } from '../../utils/order-store';

const detailState = reactive({
  orderNo: 'UA-20230914-01',
  status: '进行中',
  title: '滨海别墅概念方案',
  price: '¥12,800.00',
  summary: '包含平面布局、3D 建模及初步材料建议',
  payMethod: '微信支付',
  assignee: '主案建筑师 刘工',
  infoLabel: '服务地址',
  infoTitle: '静安区南京西路 1601 号，越洋广场 28 楼',
  infoDesc: '联系人：张女士 138****8888',
  type: 'generic',
  timeline: [
    { title: '需求已确认', desc: '服务内容和交付时间已锁定', time: '04-14 10:20' },
    { title: '方案设计中', desc: '设计师正在整理概念稿与空间建议', time: '04-15 14:10' },
    { title: '待您确认', desc: '初稿完成后会通过站内消息同步', time: '预计 04-18' },
  ],
});

const sectionsState = reactive({
  buy: {},
  send: {},
  errand: {},
  all: {},
  generic: [
    { label: '订单类型', value: '空间规划设计' },
    { label: '交付形式', value: '线上方案 + PDF 文件' },
    { label: '预计交付', value: '2026-04-18 18:00' },
    { label: '备注信息', value: '偏好现代极简风格，关注采光与动线' },
  ],
});

const detailType = computed(() => detailState.type || 'generic');
const buySection = computed(() => sectionsState.buy || {});
const sendSection = computed(() => sectionsState.send || {});
const errandSection = computed(() => sectionsState.errand || {});
const allSection = computed(() => sectionsState.all || {});
const genericList = computed(() => sectionsState.generic || []);

const heroThemeClass = computed(() => {
  const map = {
    buy: 'hero-theme-buy',
    send: 'hero-theme-send',
    errand: 'hero-theme-errand',
    all: 'hero-theme-all',
  };
  return map[detailType.value] || 'hero-theme-generic';
});

const applyOrderRecord = (record, fallbackOptions) => {
  if (!record) {
    detailState.orderNo = fallbackOptions.orderNo || detailState.orderNo;
    detailState.status = fallbackOptions.status || detailState.status;
    detailState.title = fallbackOptions.projectName || detailState.title;
    detailState.price = fallbackOptions.price || detailState.price;
    return;
  }

  const payload = record.detailPayload || {};
  detailState.orderNo = record.orderNo;
  detailState.status = payload.status || record.listItem?.statusLabel || detailState.status;
  detailState.title = payload.title || record.listItem?.projectName || detailState.title;
  detailState.price = payload.price || record.listItem?.price || detailState.price;
  detailState.summary = payload.summary || record.listItem?.projectDesc || detailState.summary;
  detailState.payMethod = payload.payMethod || record.activeOrder?.payMethod || detailState.payMethod;
  detailState.assignee = payload.assignee || record.activeOrder?.rider?.name || detailState.assignee;
  detailState.infoLabel = record.activeOrder?.addressLabel || '服务信息';
  detailState.infoTitle = record.activeOrder?.address?.title || detailState.infoTitle;
  detailState.infoDesc = record.activeOrder?.address?.detail || detailState.infoDesc;
  detailState.type = record.type || 'generic';
  detailState.timeline = payload.timeline?.length ? payload.timeline : detailState.timeline;

  sectionsState.buy = payload.sections?.buy || {};
  sectionsState.send = payload.sections?.send || {};
  sectionsState.errand = payload.sections?.errand || {};
  sectionsState.all = payload.sections?.all || {};
};

onLoad((options) => {
  const orderNo = options?.orderNo || detailState.orderNo;
  const orderRecord = getOrderRecordByNo(orderNo);
  applyOrderRecord(orderRecord, {
    orderNo,
    status: options?.status,
    projectName: options?.projectName,
    price: options?.price,
  });
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
      detailState.orderNo,
    )}&projectName=${encodeURIComponent(detailState.title)}&status=${encodeURIComponent(detailState.status)}`,
  });
};

const goReview = () => {
  uni.navigateTo({
    url: `/pages/order/review?orderNo=${encodeURIComponent(detailState.orderNo)}&projectName=${encodeURIComponent(
      detailState.title,
    )}&status=${encodeURIComponent(detailState.status)}&price=${encodeURIComponent(detailState.price)}`,
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
  padding-top: var(--status-bar-height, env(safe-area-inset-top));
  box-sizing: content-box;
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
  width: 20px;
  height: 20px;
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

.hero-theme-buy {
  background: linear-gradient(180deg, #1f4fd8 0%, #123dc2 100%);
}

.hero-theme-send {
  background: linear-gradient(180deg, #3455d7 0%, #233eb4 100%);
}

.hero-theme-errand {
  background: linear-gradient(180deg, #4d43d8 0%, #3423b4 100%);
}

.hero-theme-all {
  background: linear-gradient(180deg, #1565c4 0%, #0f49a7 100%);
}

.hero-theme-generic {
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

.summary-extra {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: #6f7686;
}

.detail-image {
  width: 100%;
  height: 180px;
  margin-top: 18px;
  border-radius: 18px;
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
