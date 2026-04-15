<template>
  <view class="app-container">
    <view class="content-wrapper">
      <text class="title">订单页面 (开发中...)</text>
    </view>

    <!-- Bottom Navigation Bar -->
    <view class="bottom-nav-bar">
      <view @click="switchTab('/pages/index/index')" class="tab-item">
        <text class="material-symbols-outlined tab-icon" data-icon="schedule_send">schedule_send</text>
        <text class="tab-text">预约</text>
      </view>
      <view @click="switchTab('/pages/order/order')" class="tab-item active">
        <text class="material-symbols-outlined tab-icon" data-icon="receipt_long">receipt_long</text>
        <text class="tab-text">订单</text>
      </view>
      <view @click="switchTab('/pages/mine/mine')" class="tab-item">
        <text class="material-symbols-outlined tab-icon" data-icon="person">person</text>
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.content-wrapper {
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #434655;
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
.tab-item:hover { color: #3b82f6; }

.tab-item.active {
  background-color: #eff6ff;
  color: #1d4ed8;
  border-radius: 16px;
}

.tab-icon { margin-bottom: 4px; }
.tab-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.025em; }

button::after {
  border: none;
}
</style>