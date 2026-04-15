<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="back-action" @click="goBack">
          <text class="material-symbols-outlined back-icon">arrow_back</text>
        </view>
        <text class="top-title">联系客服</text>
        <view class="top-placeholder"></view>
      </view>

      <view class="content">
        <view class="hero-card">
          <text class="hero-badge">{{ sourceLabel }}</text>
          <text class="hero-title">订单服务中心</text>
          <text class="hero-desc">围绕订单咨询、进度异常、评价反馈提供统一入口</text>
        </view>

        <view class="order-card">
          <view class="order-row">
            <text class="order-label">订单号</text>
            <text class="order-value">{{ orderNo }}</text>
          </view>
          <view class="order-row">
            <text class="order-label">服务项目</text>
            <text class="order-value">{{ projectName }}</text>
          </view>
          <view class="order-row">
            <text class="order-label">当前状态</text>
            <text class="order-value order-status">{{ status }}</text>
          </view>
        </view>

        <view class="section">
          <text class="section-title">联系渠道</text>
          <view class="panel">
            <view v-for="item in contactOptions" :key="item.title" class="menu-item" @click="handleAction(item.action)">
              <view class="menu-left">
                <view class="menu-icon-box">
                  <text class="material-symbols-outlined menu-icon">{{ item.icon }}</text>
                </view>
                <view class="menu-copy">
                  <text class="menu-title">{{ item.title }}</text>
                  <text class="menu-desc">{{ item.desc }}</text>
                </view>
              </view>
              <text class="material-symbols-outlined menu-arrow">chevron_right</text>
            </view>
          </view>
        </view>

        <view class="section">
          <text class="section-title">常见问题</text>
          <view class="faq-list">
            <view v-for="item in faqList" :key="item.question" class="faq-item">
              <text class="faq-question">{{ item.question }}</text>
              <text class="faq-answer">{{ item.answer }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const source = ref('客服中心');
const orderNo = ref('UA-20230914-01');
const projectName = ref('订单服务咨询');
const status = ref('处理中');

const contactOptions = [
  {
    title: '在线客服',
    desc: '工作日 09:00 - 21:00 实时响应',
    icon: 'support_agent',
    action: 'startChat',
  },
  {
    title: '电话客服',
    desc: '400-820-8829',
    icon: 'call',
    action: 'call',
  },
  {
    title: '进度异常反馈',
    desc: '派单慢、配送延迟、交付问题',
    icon: 'warning',
    action: 'feedback',
  },
  {
    title: '售后与退款',
    desc: '发票、售后、退款进度咨询',
    icon: 'payments',
    action: 'refund',
  },
];

const faqList = [
  {
    question: '骑手/服务方长时间未响应怎么办？',
    answer: '可先进入在线客服，我们会协助催办并同步最新进度。',
  },
  {
    question: '订单完成后还可以修改评价吗？',
    answer: '提交后 24 小时内可联系人工客服申请补充说明。',
  },
  {
    question: '如何索取发票？',
    answer: '在订单详情页提交开票信息后，客服会在 1 个工作日内处理。',
  },
];

const sourceLabel = computed(() => `${source.value}入口`);

onLoad((options) => {
  source.value = options?.source || '客服中心';
  orderNo.value = options?.orderNo || orderNo.value;
  projectName.value = options?.projectName || projectName.value;
  status.value = options?.status || status.value;
});

const goBack = () => {
  uni.navigateBack();
};

const handleAction = (action) => {
  const actionMap = {
    startChat: '已进入在线客服队列',
    call: '准备拨打客服热线',
    feedback: '已打开异常反馈入口',
    refund: '已打开售后服务入口',
  };

  uni.showToast({
    title: actionMap[action] || '功能开发中',
    icon: 'none',
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
.top-placeholder {
  width: 36px;
  height: 36px;
}

.back-action {
  border-radius: 12px;
  background: #e8ebf3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
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

.hero-card {
  border-radius: 28px;
  padding: 22px 20px;
  background: linear-gradient(180deg, #2954db 0%, #123ec4 100%);
  box-shadow: 0 18px 34px rgba(18, 62, 196, 0.2);
}

.hero-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #e9efff;
  font-size: 11px;
  font-weight: 700;
}

.hero-title {
  display: block;
  margin-top: 18px;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
}

.hero-desc {
  display: block;
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(235, 240, 255, 0.88);
}

.order-card,
.panel,
.faq-list {
  margin-top: 18px;
  border-radius: 24px;
  background: #fbfbfc;
  box-shadow: 0 10px 28px rgba(20, 26, 38, 0.04);
}

.order-card {
  padding: 18px;
}

.order-row + .order-row {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #eceef2;
}

.order-label {
  display: block;
  font-size: 12px;
  color: #818897;
}

.order-value {
  display: block;
  margin-top: 6px;
  font-size: 16px;
  font-weight: 800;
  color: #1b1e25;
}

.order-status {
  color: #1847d7;
}

.section {
  margin-top: 26px;
}

.section-title {
  display: block;
  margin-bottom: 14px;
  font-size: 15px;
  font-weight: 800;
  color: #1d2128;
}

.panel {
  padding: 6px 0;
}

.menu-item {
  min-height: 74px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-left {
  display: flex;
  align-items: center;
  min-width: 0;
}

.menu-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 16px;
  background: #e8edf8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
  color: #1847d7;
  font-variation-settings: 'FILL' 1;
}

.menu-copy {
  margin-left: 12px;
  min-width: 0;
}

.menu-title {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #1d2128;
}

.menu-desc {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #7a8190;
}

.menu-arrow {
  font-size: 20px;
  color: #c4cad7;
}

.faq-list {
  padding: 18px;
}

.faq-item + .faq-item {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #eceef2;
}

.faq-question {
  display: block;
  font-size: 14px;
  font-weight: 800;
  color: #1c2027;
}

.faq-answer {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.7;
  color: #727988;
}
</style>
