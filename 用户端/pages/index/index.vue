<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar bg-glass">
        <text class="brand-name">Urban Architect</text>
        <image
          class="profile-avatar"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sve-wEPYIXTF7DfqPPa6qc_CVthX1AD85b2vPbjr_EeY6f30aVJSLvhl4yEjvTjT-kL3t6197LbZxDwUEYuNhbExJB29v5Q77_Ikt6pUDc5nxWLtASOOEnk5a3hsiv7BjeIGZGz5-RnSv5gHwu-v6cAnIdgfLqFqKmEG04aAkkSiR3gepSn6x_o0azAZjf4Ylad6CuDvEYp1d0ehXnaR5SyTQhUXlM_CA0DfpjAADEqk1Ojti5mM0zvp4E2_JokO0kNniTqJfyQ"
          mode="aspectFill"
        />
      </view>

      <view class="content">
        <view class="hero-block">
          <text class="hero-title">
            欢迎回来，
            <text class="hero-title-primary">张先生</text>
          </text>
          <text class="hero-subtitle">您的城市生活建筑师。无论买、送、办，我们随时待命。</text>

          <view class="search-box">
            <LocalIcon class="search-icon" name="search" />
            <input class="search-input" placeholder="搜寻附近的服务或快递员..." type="text" />
          </view>
        </view>

        <view class="service-grid">
          <view
            v-for="item in services"
            :key="item.title"
            class="service-card"
            :class="[item.cardClass, { 'service-card-active': activeService?.title === item.title }]"
            @tap="handleServiceCardTap(item)"
          >
            <view class="service-icon-box" :class="item.iconClass">
              <LocalIcon class="service-icon" :name="item.icon" />
            </view>
            <text class="service-title" :class="{ 'service-title-light': item.highlight }">
              {{ item.title }}
            </text>
            <view class="service-copy">
              <text class="service-copy-line" :class="{ 'service-copy-light': item.highlight }">
                {{ item.descTop }}
              </text>
              <text class="service-copy-line" :class="{ 'service-copy-light': item.highlight }">
                {{ item.descBottom }}
              </text>
            </view>
            <LocalIcon class="service-mark" :class="{ 'service-mark-light': item.highlight }" :name="item.bgIcon" />
          </view>
        </view>

        <view class="section-block">
          <view class="section-head">
            <text class="section-title">快速预约</text>
            <view class="section-link">
              <text class="section-link-text">历史地址</text>
              <LocalIcon class="section-link-icon" name="history" />
            </view>
          </view>

          <view class="booking-card">
            <view class="field-group">
              <text class="field-label">取货地址</text>
              <view class="field-box">
                <LocalIcon class="field-icon field-icon-primary" name="location_on" />
                <input class="field-input" type="text" value="北京市朝阳区三里屯SOHO 5号楼" />
              </view>
            </view>

            <view class="field-group field-group-gap">
              <text class="field-label">收货地址</text>
              <view class="field-box">
                <LocalIcon class="field-icon field-icon-tertiary" name="near_me" />
                <input class="field-input" placeholder="输入收货地址..." type="text" />
              </view>
            </view>

            <view class="tag-list">
              <text v-for="tag in orderTags" :key="tag" class="tag-chip">{{ tag }}</text>
            </view>

            <button class="primary-button" @tap="handlePrimaryBooking">立即呼叫服务</button>
          </view>
        </view>

        <view class="section-block nearby-block">
          <view class="section-head">
            <text class="section-title">附近跑男</text>
            <text class="online-pill">12人在岗</text>
          </view>

          <view class="courier-list">
            <view v-for="courier in couriers" :key="courier.name" class="courier-card">
              <view class="courier-main">
                <view class="courier-avatar-wrap">
                  <image class="courier-avatar" :src="courier.avatar" mode="aspectFill" />
                  <view class="courier-status"></view>
                </view>

                <view class="courier-detail">
                  <view class="courier-topline">
                    <text class="courier-name">{{ courier.name }}</text>
                    <view class="courier-rating">
                      <LocalIcon class="courier-star" name="star" />
                      <text class="courier-score">{{ courier.score }}</text>
                    </view>
                  </view>
                  <text class="courier-meta">{{ courier.meta }}</text>
                  <view class="courier-tags">
                    <text v-for="tag in courier.tags" :key="tag" class="courier-tag">{{ tag }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <button class="map-button">查看地图上的人员</button>
        </view>

        <view class="delivery-status">
          <view class="delivery-status-main">
            <view class="delivery-status-dot"></view>
            <view class="delivery-status-copy">
              <text class="delivery-status-title">最近订单正在配送中</text>
              <text class="delivery-status-desc">文件速递 · 预计 14:35 送达</text>
            </view>
          </view>
          <button class="track-button">立即查看</button>
        </view>
      </view>
    </view>

    <view class="tab-bar bg-glass">
      <view class="tab-item tab-item-active" @click="switchTab('/pages/index/index')">
        <view class="tab-icon-box tab-icon-box-active">
          <LocalIcon class="tab-icon" name="calendar_month" />
        </view>
        <text class="tab-text tab-text-active">预约</text>
      </view>

      <view class="tab-item" @click="switchTab('/pages/order/order')">
        <view class="tab-icon-box">
          <LocalIcon class="tab-icon" name="receipt_long" />
        </view>
        <text class="tab-text">订单</text>
      </view>

      <view class="tab-item" @click="switchTab('/pages/mine/mine')">
        <view class="tab-icon-box">
          <LocalIcon class="tab-icon" name="person" />
        </view>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const services = [
  {
    title: '帮我买',
    descTop: '餐饮、生鲜、药品',
    descBottom: '30分钟送达',
    icon: 'shopping_bag',
    bgIcon: 'shopping_cart',
    cardClass: 'service-card-buy',
    iconClass: 'service-icon-buy',
    highlight: false,
    path: '/pages/buy/buy',
  },
  {
    title: '帮我送',
    descTop: '急件、鲜花、蛋糕',
    descBottom: '全城专人直送',
    icon: 'local_shipping',
    bgIcon: 'package_2',
    cardClass: 'service-card-send',
    iconClass: 'service-icon-send',
    highlight: false,
    path: '/pages/send/send',
  },
  {
    title: '帮我办',
    descTop: '排队、挂号、代取',
    descBottom: '节省您的每一分钟',
    icon: 'assignment',
    bgIcon: 'task',
    cardClass: 'service-card-do',
    iconClass: 'service-icon-do',
    highlight: false,
    path: '/pages/errand/errand',
  },
  {
    title: '万能帮',
    descTop: '各种个性化需求',
    descBottom: '只有想不到，没有做不到',
    icon: 'auto_awesome',
    bgIcon: 'magic_button',
    cardClass: 'service-card-all',
    iconClass: 'service-icon-all',
    highlight: true,
    path: '/pages/all/all',
  },
];

const activeServiceTitle = ref('帮我买');
const activeService = computed(() => services.find((item) => item.title === activeServiceTitle.value) || services[0]);

const orderTags = ['手机数码', '文件合同', '钥匙配饰', '+ 自定义物品'];

const couriers = [
  {
    name: '王师傅',
    score: '4.9',
    meta: '距您 500m | 已送 2.4k 单',
    tags: ['准时达', '好评高'],
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9s1Q218GYts49tw3dJdDAKx_WFhr3j0PrdPyFp6BytJmk3GosTQJpd1I2l_-gBm_BXSqXp-zlt8WBBI95tZqlW4-o7aEPnjqRhwkjAO0wTeH44IkWPK8NsQd1bYaCfMns92TCbuCVSbdCrrHcdO6Kr9KmY8CiI55DooLTNPTb1PX2bPSCblUp2JydgsELXMspLNj4_n9pdLbWaP3N1TbbyeFCeQ0MOvkMhm8fH3hF6chby3u4bWP4zur-kKg5qi9wWS56QAAOtis',
  },
  {
    name: '李师傅',
    score: '4.8',
    meta: '距您 1.2km | 已送 1.8k 单',
    tags: ['熟悉路线', '服务周到'],
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApwY8seJM0qJvyBT-hjf1syEYderUuCTXD90H_cqEizaCs0kuv7UU4cF3YF1ltllN5ttjClcNLcrF-mjAav9Z-vE5Sg7HFUOrOK2KXrYp7b7O5h3hh2ZnAK_Nu8XM4VADohpQQzvOusL0q94tx9hO75CAEfyCIxSGVZP0LEriUl-nHWRRIl05Vucd1obVeQyZUgPWU94RMCiSXsikDiPwQoAbD0ACZzKW7uxfmMyENYJuOg2s35dZvUxmKtvDfsT7wS-0syMZ2XRE',
  },
  {
    name: '赵师傅',
    score: '5.0',
    meta: '距您 2.1km | 已送 3.2k 单',
    tags: ['金牌服务'],
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2uBZreSE4H06taWABfExdDNB8CD8dsOLHAtTKT8L7gtoqGub5jNm7PmBbPMrSbja2mTWbNtA_m8FT-IG8krCDpg0iEBZ9Fqzsh_0Vt2ICzO1VqBiDwE0PDzHEszjJwXrmei8X6jE6Acv7FdI7wRkElMrEORq9xvSboaX7tk02-ZmmN5aHRA09POGDf-qgklynI-rsEyig0lLD28Cwg9rIyH2-RIY6EWcc1w7_tEPRynyU6_zhgkwMM9TBNDTnYj92ZGTSFZevdSE',
  },
];

onMounted(() => {
  uni.hideTabBar();
});

const handleServiceCardTap = (item) => {
  activeServiceTitle.value = item.title;
  handleServiceAction(item);
};

const handlePrimaryBooking = () => {
  handleServiceAction(activeService.value);
};

const handleServiceAction = (item) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path,
      fail: () => {
        uni.showToast({
          title: '页面跳转失败',
          icon: 'none',
        });
      },
    });
    return;
  }

  uni.showToast({
    title: `${item.title}功能待接入`,
    icon: 'none',
  });
};

const switchTab = (url) => {
  uni.switchTab({ url });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f4f6fb;
  color: #191c1e;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.page-shell {
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px 10px;
  background: rgba(244, 246, 251, 0.82);
}

.brand-name {
  font-size: 14px;
  font-weight: 800;
  color: #1d46c2;
  letter-spacing: -0.03em;
}

.profile-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 6px 18px rgba(25, 28, 30, 0.08);
}

.content {
  padding: 4px 12px calc(124px + env(safe-area-inset-bottom));
}

.hero-block {
  padding-top: 4px;
}

.hero-title {
  display: block;
  font-size: 17px;
  line-height: 1.35;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.hero-title-primary {
  color: #1848d7;
}

.hero-subtitle {
  display: block;
  margin-top: 10px;
  color: #5c6172;
  font-size: 11px;
  line-height: 1.7;
  padding-right: 6px;
}

.search-box {
  margin-top: 16px;
  position: relative;
  height: 48px;
  border-radius: 14px;
  background: #e7e9ee;
  display: flex;
  align-items: center;
  padding: 0 14px 0 40px;
}

.search-icon {
  position: absolute;
  left: 14px;
  font-size: 18px;
  color: #244dd4;
}

.search-input {
  width: 100%;
  height: 48px;
  font-size: 11px;
  color: #191c1e;
  background: transparent;
  border: none;
}

.service-grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.service-card {
  position: relative;
  overflow: hidden;
  min-height: 128px;
  padding: 16px 12px 14px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.service-card-active {
  outline: 2px solid rgba(28, 71, 214, 0.18);
  box-shadow: 0 12px 24px rgba(28, 71, 214, 0.08);
}

.service-card-buy,
.service-card-send,
.service-card-do {
  background: #eceef2;
}

.service-card-all {
  background: linear-gradient(180deg, #2d57e8 0%, #1a47d7 100%);
}

.service-icon-box {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon-buy {
  background: #dbe2ff;
  color: #2448c7;
}

.service-icon-send {
  background: #c8d0ff;
  color: #4c5b95;
}

.service-icon-do {
  background: #ffd9cc;
  color: #8a330f;
}

.service-icon-all {
  background: #dce1ff;
  color: #214bd9;
}

.service-icon {
  font-size: 18px;
  font-variation-settings: 'FILL' 1;
}

.service-title {
  margin-top: 18px;
  font-size: 13px;
  font-weight: 800;
}

.service-title-light {
  color: #ffffff;
}

.service-copy {
  margin-top: 8px;
  position: relative;
  z-index: 2;
}

.service-copy-line {
  display: block;
  font-size: 10px;
  line-height: 1.6;
  color: #616678;
}

.service-copy-light {
  color: #dce2ff;
}

.service-mark {
  position: absolute;
  right: -8px;
  bottom: -10px;
  font-size: 58px;
  color: rgba(25, 28, 30, 0.08);
  z-index: 1;
}

.service-mark-light {
  color: rgba(255, 255, 255, 0.28);
}

.section-block {
  margin-top: 26px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.section-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.section-link {
  display: flex;
  align-items: center;
  gap: 2px;
}

.section-link-text {
  font-size: 10px;
  font-weight: 700;
  color: #2448c7;
}

.section-link-icon {
  font-size: 12px;
  color: #2448c7;
}

.booking-card {
  background: #f6f6f7;
  border-radius: 20px;
  padding: 16px;
}

.field-group-gap {
  margin-top: 14px;
}

.field-label {
  display: block;
  margin-bottom: 8px;
  font-size: 10px;
  font-weight: 800;
  color: #2d3037;
}

.field-box {
  min-height: 46px;
  border-radius: 14px;
  background: #e7e9ee;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.field-icon {
  font-size: 17px;
  margin-right: 8px;
}

.field-icon-primary {
  color: #1c47d6;
}

.field-icon-tertiary {
  color: #9b3b17;
}

.field-input {
  flex: 1;
  font-size: 10px;
  color: #3c4150;
  background: transparent;
  border: none;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tag-chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef0f4;
  color: #5d6474;
  font-size: 9px;
  font-weight: 700;
}

.primary-button {
  margin-top: 16px;
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(180deg, #1847d7 0%, #0d3ecf 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  line-height: 46px;
}

.online-pill {
  padding: 4px 8px;
  border-radius: 999px;
  background: #eef0f4;
  color: #6b6f80;
  font-size: 9px;
  font-weight: 700;
}

.courier-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.courier-card {
  background: #f5f6f8;
  border-radius: 18px;
  padding: 10px 10px 10px 8px;
}

.courier-main {
  display: flex;
  align-items: center;
}

.courier-avatar-wrap {
  position: relative;
  width: 46px;
  height: 46px;
  margin-right: 10px;
}

.courier-avatar {
  width: 46px;
  height: 46px;
  border-radius: 12px;
}

.courier-status {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2bc160;
  border: 2px solid #f5f6f8;
}

.courier-detail {
  flex: 1;
  min-width: 0;
}

.courier-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.courier-name {
  font-size: 11px;
  font-weight: 800;
  color: #22252c;
}

.courier-rating {
  display: flex;
  align-items: center;
  color: #1847d7;
}

.courier-star {
  font-size: 11px;
  font-variation-settings: 'FILL' 1;
}

.courier-score {
  margin-left: 2px;
  font-size: 10px;
  font-weight: 800;
}

.courier-meta {
  display: block;
  margin-top: 3px;
  color: #7a7f8d;
  font-size: 9px;
}

.courier-tags {
  display: flex;
  gap: 4px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.courier-tag {
  padding: 3px 6px;
  border-radius: 999px;
  background: #dce2ff;
  color: #3f4c87;
  font-size: 8px;
  font-weight: 700;
}

.map-button {
  margin-top: 14px;
  width: 100%;
  height: 42px;
  border-radius: 14px;
  background: transparent;
  border: 1px solid rgba(196, 197, 215, 0.65);
  color: #4f5463;
  font-size: 10px;
  font-weight: 700;
  line-height: 42px;
}

.delivery-status {
  margin-top: 18px;
  border-radius: 18px;
  background: #f3f4f7;
  padding: 14px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.delivery-status-main {
  display: flex;
  align-items: center;
  min-width: 0;
}

.delivery-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2450db;
  box-shadow: 0 0 0 4px rgba(36, 80, 219, 0.12);
  animation: pulse 2s infinite;
}

.delivery-status-copy {
  min-width: 0;
  margin-left: 12px;
}

.delivery-status-title {
  display: block;
  font-size: 10px;
  font-weight: 800;
  color: #2a2d34;
}

.delivery-status-desc {
  display: block;
  margin-top: 4px;
  font-size: 9px;
  color: #7a7f8d;
}

.track-button {
  flex-shrink: 0;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  border: none;
  background: #dfe5ff;
  color: #1c47d6;
  font-size: 9px;
  font-weight: 800;
  line-height: 28px;
}

.tab-bar {
  position: fixed;
  left: 50%;
  bottom: calc(10px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: calc(100% - 24px);
  max-width: 366px;
  padding: 8px 8px 10px;
  border-radius: 20px;
  background: rgba(249, 250, 252, 0.94);
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
  width: 34px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon-box-active {
  background: #dce2ff;
}

.tab-icon {
  font-size: 18px;
}

.tab-text {
  font-size: 9px;
  font-weight: 700;
  color: #8b8f9b;
}

.tab-text-active {
  color: #1c47d6;
}

button::after {
  border: none;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(36, 80, 219, 0.32);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(36, 80, 219, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(36, 80, 219, 0);
  }
}
</style>
