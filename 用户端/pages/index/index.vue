<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="brand-group">
          <LocalIcon class="brand-menu" name="menu" />
          <text class="brand-title">UrbanArchitect</text>
        </view>
        <image class="brand-avatar" :src="heroAvatar" mode="aspectFill" />
      </view>

      <scroll-view scroll-y class="page-scroll">
        <view class="content">
          <view class="hero-section">
            <text class="hero-title">欢迎回来，</text>
            <view class="hero-title-row">
              <text class="hero-title">张先生</text>
            </view>
            <text class="hero-desc">您的城市生活建筑师。无论买、送、办，我们随时待命。</text>

            <view class="search-box">
              <LocalIcon class="search-icon" name="search" />
              <input
                class="search-input"
                placeholder="搜寻附近的服务或快递员..."
                placeholder-class="search-placeholder"
              />
            </view>
          </view>

          <view class="service-grid">
            <view
              v-for="item in services"
              :key="item.title"
              class="service-card"
              :class="[item.cardClass, selectedService === item.key ? 'service-card-selected' : '']"
              @tap="handleServiceTap(item)"
            >
              <view class="service-icon-box" :class="item.iconBoxClass">
                <LocalIcon class="service-icon" :name="item.icon" />
              </view>
              <text class="service-title" :class="item.light ? 'service-title-light' : ''">{{ item.title }}</text>
              <text class="service-desc" :class="item.light ? 'service-desc-light' : ''">{{ item.desc }}</text>
              <LocalIcon class="service-bg-icon" :name="item.bgIcon" />
            </view>
          </view>

          <view class="section-header">
            <text class="section-title">快速预约</text>
            <view class="section-action" @tap="showHistory">
              <text class="section-action-text">历史地址</text>
              <LocalIcon class="section-action-icon" name="history" />
            </view>
          </view>

          <view class="quick-card">
            <view class="form-field">
              <text class="field-label">取货地址</text>
              <view class="field-box">
                <LocalIcon class="field-icon" name="location_on" />
                <input v-model="quickForm.pickupAddress" class="field-input" />
              </view>
            </view>

            <view class="form-field">
              <text class="field-label">收货地址</text>
              <view class="field-box">
                <LocalIcon class="field-icon field-icon-warm" name="near_me" />
                <input
                  v-model="quickForm.deliveryAddress"
                  class="field-input"
                  placeholder="输入收货地址..."
                  placeholder-class="field-placeholder"
                />
              </view>
            </view>

            <view class="tag-list">
              <view
                v-for="tag in goodsTags"
                :key="tag"
                class="tag-item"
                :class="activeTag === tag ? 'tag-item-active' : ''"
                @tap="activeTag = tag"
              >
                <text class="tag-text" :class="activeTag === tag ? 'tag-text-active' : ''">{{ tag }}</text>
              </view>
            </view>

            <button class="primary-button" @tap="submitQuickOrder">立即呼叫服务</button>
          </view>

          <view class="section-header section-header-tight">
            <text class="section-title">附近跑男</text>
            <view class="online-pill">12人在线</view>
          </view>

          <view class="courier-list">
            <view v-for="item in couriers" :key="item.name" class="courier-card">
              <view class="courier-avatar-wrap">
                <image class="courier-avatar" :src="item.avatar" mode="aspectFill" />
                <view class="courier-dot"></view>
              </view>

              <view class="courier-main">
                <view class="courier-top">
                  <text class="courier-name">{{ item.name }}</text>
                  <view class="courier-rating">
                    <LocalIcon class="courier-star" name="star" />
                    <text class="courier-rating-text">{{ item.rating }}</text>
                  </view>
                </view>
                <text class="courier-meta">距离 {{ item.distance }} | 已接 {{ item.completed }} 单</text>
                <view class="courier-tags">
                  <text v-for="tag in item.tags" :key="tag" class="courier-tag">{{ tag }}</text>
                </view>
              </view>
            </view>
          </view>

          <view class="map-button" @tap="showMap">查看地图上的人员</view>

          <view class="status-card" @tap="openOrderPage">
            <view class="status-left">
              <view class="status-orb"></view>
              <view>
                <text class="status-title">最近订单正在配送中</text>
                <text class="status-desc">文件快递 • 预计 14:35 送达</text>
              </view>
            </view>
            <view class="status-button">追踪位置</view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="tab-bar">
      <view class="tab-item tab-item-active" @tap="openRootPage('/pages/index/index')">
        <view class="tab-icon-box tab-icon-box-active">
          <LocalIcon class="tab-icon" name="calendar_month" />
        </view>
        <text class="tab-text tab-text-active">预约</text>
      </view>
      <view class="tab-item" @tap="openRootPage('/pages/order/order')">
        <view class="tab-icon-box">
          <LocalIcon class="tab-icon" name="receipt_long" />
        </view>
        <text class="tab-text">订单</text>
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

import { reactive, ref } from 'vue';

const heroAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80';

const quickForm = reactive({
  pickupAddress: '北京市朝阳区三里屯SOHO 5号楼',
  deliveryAddress: '',
});

const goodsTags = ['手机数码', '文件合同', '钥匙配饰', '+ 自定义物品'];
const activeTag = ref('钥匙配饰');
const selectedService = ref('all');

const services = [
  {
    key: 'buy',
    title: '帮我买',
    desc: '餐饮、生鲜、药品\n30分钟送达',
    icon: 'shopping_bag',
    bgIcon: 'shopping_cart',
    path: '/pages/buy/buy',
    cardClass: 'service-card-soft',
    iconBoxClass: 'service-icon-box-primary',
    light: false,
  },
  {
    key: 'send',
    title: '帮我送',
    desc: '急件、鲜花、蛋糕\n全城专人直送',
    icon: 'local_shipping',
    bgIcon: 'package_2',
    path: '/pages/send/send',
    cardClass: 'service-card-soft',
    iconBoxClass: 'service-icon-box-purple',
    light: false,
  },
  {
    key: 'errand',
    title: '帮我办',
    desc: '排队、挂号、代取\n节省您的每一分钟',
    icon: 'assignment',
    bgIcon: 'task',
    path: '/pages/errand/errand',
    cardClass: 'service-card-soft',
    iconBoxClass: 'service-icon-box-warm',
    light: false,
  },
  {
    key: 'all',
    title: '万能帮',
    desc: '各种个性化需求\n只有想不到，没有做不到',
    icon: 'auto_awesome',
    bgIcon: 'magic_button',
    path: '/pages/all/all',
    cardClass: 'service-card-strong',
    iconBoxClass: 'service-icon-box-white',
    light: true,
  },
];

const couriers = [
  {
    name: '王师傅',
    avatar: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
    distance: '500m',
    completed: '2.4k',
    rating: '4.9',
    tags: ['准时达', '好评如潮'],
  },
  {
    name: '李师傅',
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=240&q=80',
    distance: '1.2km',
    completed: '1.8k',
    rating: '4.8',
    tags: ['熟路', '服务周到'],
  },
  {
    name: '赵师傅',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
    distance: '2.1km',
    completed: '3.2k',
    rating: '5.0',
    tags: ['金牌服务'],
  },
];

const openRootPage = (url) => {
  uni.reLaunch({ url });
};

const handleServiceTap = (item) => {
  selectedService.value = item.key;
  uni.navigateTo({ url: item.path });
};

const submitQuickOrder = () => {
  const target = services.find((item) => item.key === selectedService.value) || services[3];
  uni.navigateTo({ url: target.path });
};

const showHistory = () => {
  uni.showToast({
    title: '历史地址功能待接入',
    icon: 'none',
  });
};

const showMap = () => {
  uni.showToast({
    title: '地图能力待接入',
    icon: 'none',
  });
};

const openOrderPage = () => {
  openRootPage('/pages/order/order');
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

.top-bar {
  padding-top: var(--status-bar-height, env(safe-area-inset-top));
  box-sizing: content-box;
  position: sticky;
  top: 0;
  z-index: 30;
  height: 74px;
  padding: 48px 18px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(242, 243, 245, 0.96);
  box-sizing: border-box;
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
  padding: 0 14px 24px;
}

.hero-section {
  padding-top: 10px;
}

.hero-title,
.hero-title-row {
  display: block;
}

.hero-title {
  font-size: 24px;
  line-height: 1.2;
  font-weight: 800;
  color: #11161f;
}

.hero-title-row .hero-title {
  color: #1545d5;
}

.hero-desc {
  display: block;
  margin-top: 12px;
  font-size: 13px;
  line-height: 1.7;
  color: #6c7484;
}

.search-box {
  margin-top: 18px;
  height: 56px;
  border-radius: 18px;
  background: #e7e9ee;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
}

.search-icon {
  width: 18px;
  height: 18px;
}

.search-input {
  flex: 1;
  margin-left: 12px;
  font-size: 13px;
  color: #1d2128;
}

.search-placeholder,
.field-placeholder {
  color: #9ba2af;
}

.service-grid {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.service-card {
  position: relative;
  overflow: hidden;
  width: calc(50% - 7px);
  min-height: 164px;
  margin-bottom: 14px;
  padding: 18px 16px;
  border-radius: 24px;
  box-sizing: border-box;
}

.service-card-selected {
  transform: translateY(-2px);
}

.service-card-soft {
  background: #e8e9ed;
}

.service-card-strong {
  background: linear-gradient(180deg, #2b58dc 0%, #1745d7 100%);
}

.service-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon-box-primary {
  background: #dbe2ff;
}

.service-icon-box-purple {
  background: #dce0ff;
}

.service-icon-box-warm {
  background: #ffdcd3;
}

.service-icon-box-white {
  background: #eef1ff;
}

.service-icon {
  width: 20px;
  height: 20px;
}

.service-title {
  display: block;
  margin-top: 28px;
  font-size: 18px;
  font-weight: 800;
  color: #1a2028;
}

.service-title-light {
  color: #ffffff;
}

.service-desc {
  display: block;
  margin-top: 10px;
  font-size: 11px;
  line-height: 1.65;
  color: #707888;
  white-space: pre-line;
}

.service-desc-light {
  color: rgba(235, 240, 255, 0.82);
}

.service-bg-icon {
  position: absolute;
  right: 10px;
  bottom: 8px;
  width: 56px;
  height: 56px;
  opacity: 0.12;
}

.section-header {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-header-tight {
  margin-top: 18px;
}

.section-title {
  font-size: 18px;
  font-weight: 800;
  color: #151922;
}

.section-action {
  display: flex;
  align-items: center;
}

.section-action-text {
  font-size: 11px;
  font-weight: 700;
  color: #1847d7;
}

.section-action-icon {
  width: 14px;
  height: 14px;
  margin-left: 4px;
}

.quick-card {
  margin-top: 12px;
  border-radius: 24px;
  background: #f8f8f9;
  padding: 18px 16px;
  box-shadow: 0 12px 28px rgba(20, 28, 40, 0.05);
}

.form-field + .form-field {
  margin-top: 14px;
}

.field-label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #5f6778;
}

.field-box {
  height: 50px;
  border-radius: 16px;
  background: #ebedf1;
  display: flex;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
}

.field-icon {
  width: 18px;
  height: 18px;
}

.field-icon-warm {
  opacity: 0.7;
}

.field-input {
  flex: 1;
  margin-left: 10px;
  font-size: 13px;
  color: #1b1f27;
}

.tag-list {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: #eceef2;
}

.tag-item-active {
  background: #dce3ff;
}

.tag-text {
  font-size: 10px;
  font-weight: 700;
  color: #616978;
}

.tag-text-active {
  color: #1847d7;
}

.primary-button {
  margin-top: 10px;
  height: 52px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(180deg, #1d49d8 0%, #113fd1 100%);
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  line-height: 52px;
}

.online-pill {
  min-width: 66px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: #eceef2;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  color: #6a7280;
  box-sizing: border-box;
}

.courier-list {
  margin-top: 10px;
}

.courier-card {
  margin-bottom: 12px;
  border-radius: 22px;
  background: #f8f8f9;
  padding: 14px;
  display: flex;
  box-shadow: 0 10px 24px rgba(20, 28, 40, 0.04);
}

.courier-avatar-wrap {
  position: relative;
}

.courier-avatar {
  width: 50px;
  height: 50px;
  border-radius: 14px;
}

.courier-dot {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background: #36c15c;
}

.courier-main {
  flex: 1;
  margin-left: 12px;
}

.courier-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.courier-name {
  font-size: 15px;
  font-weight: 800;
  color: #1a2028;
}

.courier-rating {
  display: flex;
  align-items: center;
}

.courier-star {
  width: 13px;
  height: 13px;
}

.courier-rating-text {
  margin-left: 4px;
  font-size: 11px;
  font-weight: 800;
  color: #1847d7;
}

.courier-meta {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: #727a89;
}

.courier-tags {
  margin-top: 8px;
}

.courier-tag {
  display: inline-block;
  margin-right: 6px;
  margin-bottom: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  background: #dce3ff;
  font-size: 9px;
  font-weight: 700;
  color: #1847d7;
}

.map-button {
  height: 52px;
  margin-top: 4px;
  border-radius: 18px;
  border: 1px solid #cfd4df;
  text-align: center;
  font-size: 12px;
  line-height: 52px;
  color: #49505f;
}

.status-card {
  margin-top: 18px;
  padding: 18px 16px;
  border-radius: 24px;
  background: #f8f8f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.status-orb {
  width: 8px;
  height: 8px;
  margin-right: 12px;
  border-radius: 50%;
  background: #1847d7;
  box-shadow: 0 0 0 6px rgba(24, 71, 215, 0.14);
}

.status-title {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: #1a2028;
}

.status-desc {
  display: block;
  margin-top: 4px;
  font-size: 10px;
  color: #79808d;
}

.status-button {
  min-width: 70px;
  height: 28px;
  margin-left: 12px;
  padding: 0 12px;
  border-radius: 999px;
  background: #dbe2ff;
  text-align: center;
  font-size: 10px;
  line-height: 28px;
  color: #1847d7;
  font-weight: 700;
  box-sizing: border-box;
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

button::after {
  border: none;
}
</style>
