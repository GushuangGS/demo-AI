<template>
  <view class="app-container">
    <!-- Top Navigation Shell -->
    <view class="top-nav-shell">
      <view class="nav-left">
        <text class="material-symbols-outlined nav-icon" data-icon="grid_view">grid_view</text>
        <text class="nav-title">UrbanConcierge</text>
      </view>
      <view class="nav-right">
        <text class="material-symbols-outlined notif-icon" data-icon="notifications">notifications</text>
      </view>
    </view>

    <view class="main-content">
      <!-- Hero Section: Unlogged User State -->
      <view class="hero-section">
        <view class="hero-bg-primary"></view>
        <view class="hero-bg-white"></view>
        <view class="hero-content">
          <view class="avatar-outer">
            <view class="avatar-inner">
              <text class="material-symbols-outlined avatar-icon" data-icon="account_circle">account_circle</text>
            </view>
          </view>
          <view class="hero-text-wrapper">
            <text class="hero-title">点击登录/注册</text>
            <text class="hero-subtitle">解锁优质城市服务体验</text>
          </view>
        </view>
      </view>

      <!-- Bento Grid: Main Features -->
      <view class="features-grid">
        <!-- Wallet Card -->
        <view class="feature-card">
          <view class="card-header">
            <view class="icon-wrapper">
              <text class="material-symbols-outlined card-icon" data-icon="account_balance_wallet"
                >account_balance_wallet</text
              >
            </view>
          </view>
          <view class="card-text">
            <text class="card-title">我的钱包</text>
            <text class="card-desc">查看余额与权益</text>
          </view>
        </view>
        <!-- Address Card -->
        <view class="feature-card">
          <view class="card-header">
            <view class="icon-wrapper">
              <text class="material-symbols-outlined card-icon" data-icon="location_on">location_on</text>
            </view>
          </view>
          <view class="card-text">
            <text class="card-title">常用地址</text>
            <text class="card-desc">管理下单地址</text>
          </view>
        </view>
        <!-- Service & Settings Row (Asymmetric Layout) -->
        <view class="action-row">
          <view class="action-item">
            <view class="action-icon-wrapper">
              <text class="material-symbols-outlined action-icon" data-icon="support_agent">support_agent</text>
            </view>
            <text class="action-text">客户服务</text>
          </view>
          <view class="action-item">
            <view class="action-icon-wrapper">
              <text class="material-symbols-outlined action-icon" data-icon="settings">settings</text>
            </view>
            <text class="action-text">通用设置</text>
          </view>
        </view>
      </view>

      <!-- Join Us Banner (Visual Focus) -->
      <view class="banner-section">
        <image
          class="banner-image"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHtTnKPjjdsN6TJqVJtsj5RNpVoSSY_-d_cqKJFizMXdRWoP95bqqJUBE_pOMiKk6wkU_tCQ9RdK5974lzcDgyvS1S_lUNPqAupb1ClIerPsSjXz-SFjw_xTTn0nsxd0zfQ3CNQCixqF93pz2lPvx_J2feG2hfvqGaKm5Cof68qwnBOpEYD2uS-q1Yayn98x9ZVCNvbzLLXoT6-FwRg8EakGWN3C9sLV6V9XPDpGib1ioJU4HbNI5vUN_GQgQbHAUD3Vp4rRj74Ck"
          mode="aspectFill"
        />
        <view class="banner-overlay"></view>
        <view class="banner-content">
          <text class="banner-badge">招聘中</text>
          <text class="banner-title">加入我们的骑士团</text>
          <text class="banner-subtitle">弹性时间，收入丰厚</text>
          <view class="banner-btn-wrapper">
            <button class="banner-btn">立即申请</button>
          </view>
        </view>
      </view>

      <!-- Secondary Service List (Architectural minimalist style) -->
      <view class="list-section">
        <view class="list-item">
          <view class="list-item-left">
            <text class="material-symbols-outlined list-icon" data-icon="policy">policy</text>
            <text class="list-text">法律协议与隐私政策</text>
          </view>
          <text class="material-symbols-outlined list-arrow" data-icon="chevron_right">chevron_right</text>
        </view>
        <view class="list-item">
          <view class="list-item-left">
            <text class="material-symbols-outlined list-icon" data-icon="help">help</text>
            <text class="list-text">关于 UrbanConcierge</text>
          </view>
          <text class="material-symbols-outlined list-arrow" data-icon="chevron_right">chevron_right</text>
        </view>
      </view>
    </view>

    <!-- Bottom Navigation Bar -->
    <view class="bottom-nav-bar">
      <view @click="switchTab('/pages/index/index')" class="tab-item">
        <text class="material-symbols-outlined tab-icon" data-icon="schedule_send">schedule_send</text>
        <text class="tab-text">预约</text>
      </view>
      <view @click="switchTab('/pages/order/order')" class="tab-item">
        <text class="material-symbols-outlined tab-icon" data-icon="receipt_long">receipt_long</text>
        <text class="tab-text">订单</text>
      </view>
      <view @click="switchTab('/pages/mine/mine')" class="tab-item active">
        <text class="material-symbols-outlined tab-icon" data-icon="person" style="font-variation-settings: 'FILL' 1"
          >person</text
        >
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  uni.hideTabBar();
});

const switchTab = (url) => {
  uni.switchTab({ url });
};
</script>

<style scoped>
.app-container {
  background-color: #f7f9fb;
  color: #191c1e;
  min-height: 100vh;
  padding-bottom: 128px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Top Navigation Shell */
.top-nav-shell {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background-color: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(24px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  box-sizing: border-box;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-icon {
  color: #1d4ed8;
}

.nav-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #1e40af;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notif-icon {
  color: #64748b;
}

/* Main Content */
.main-content {
  padding-top: 80px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Hero Section */
.hero-section {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background-color: #1d4ed8;
  padding: 32px;
  color: #ffffff;
}

.hero-bg-primary {
  position: absolute;
  top: -48px;
  right: -48px;
  width: 192px;
  height: 192px;
  background-color: #0037b0;
  opacity: 0.2;
  border-radius: 50%;
  filter: blur(24px);
}

.hero-bg-white {
  position: absolute;
  bottom: -48px;
  left: -48px;
  width: 128px;
  height: 128px;
  background-color: #ffffff;
  opacity: 0.1;
  border-radius: 50%;
  filter: blur(16px);
}

.hero-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-outer {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-icon {
  color: #cbd5e1;
  font-size: 48px;
}

.hero-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.feature-card {
  grid-column: span 1 / span 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  color: #0037b0;
}

.card-title {
  font-weight: 700;
  color: #191c1e;
  display: block;
}

.card-desc {
  font-size: 12px;
  color: #434655;
  display: block;
}

.action-row {
  grid-column: span 2 / span 2;
  display: flex;
  gap: 16px;
}

.action-item {
  flex: 1;
  background-color: #f2f4f6;
  padding: 16px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.action-icon {
  color: #475569;
  font-size: 20px;
}

.action-text {
  font-weight: 600;
  font-size: 14px;
}

/* Banner Section */
.banner-section {
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 9;
  border-radius: 24px;
  overflow: hidden;
  background-color: #2d3133;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
  transition: transform 0.7s;
}
.banner-section:hover .banner-image {
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent);
}

.banner-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  gap: 8px;
  box-sizing: border-box;
}

.banner-badge {
  color: #dce1ff;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.banner-title {
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
}

.banner-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.banner-btn-wrapper {
  margin-top: 8px;
}

.banner-btn {
  background-color: #0037b0;
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  box-shadow:
    0 10px 15px -3px rgba(0, 55, 176, 0.2),
    0 4px 6px -2px rgba(0, 55, 176, 0.2);
  margin: 0;
  line-height: 1;
  display: inline-block;
  border: none;
}

/* List Section */
.list-section {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
}

.list-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.list-icon {
  color: rgba(0, 55, 176, 0.6);
}

.list-text {
  font-size: 14px;
  font-weight: 500;
}

.list-arrow {
  color: #c4c5d7;
}

/* Bottom Navigation */
.bottom-nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 16px 32px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(40px);
  border-radius: 24px 24px 0 0;
  z-index: 50;
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 20px;
  border-radius: 12px;
  transition: all 0.3s;
  color: #94a3b8;
}
.tab-item:hover {
  color: #3b82f6;
}

.tab-item.active {
  background-color: #eff6ff;
  color: #1d4ed8;
  border-radius: 16px;
}

.tab-icon {
  margin-bottom: 4px;
}
.tab-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.025em;
}

button::after {
  border: none;
}
</style>
