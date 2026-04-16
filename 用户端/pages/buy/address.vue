<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="back-action" @click="goBack">
          <LocalIcon class="back-icon" name="arrow_back" />
        </view>
        <text class="top-title">{{ pageTitle }}</text>
        <view class="top-placeholder"></view>
      </view>

      <view class="content">
        <view class="hero-card">
          <text class="hero-badge">{{ mode === 'pickup' ? '购买地址' : '收货地址' }}</text>
          <text class="hero-title">{{ mode === 'pickup' ? '选择购买地点' : '选择收货信息' }}</text>
          <text class="hero-desc">{{ pageDesc }}</text>
        </view>

        <view class="address-list">
          <view
            v-for="item in currentOptions"
            :key="item.title"
            class="address-card"
            :class="{ 'address-card-active': selectedTitle === item.title }"
            @click="selectAddress(item)"
          >
            <view class="address-card-main">
              <view class="address-icon-box">
                <LocalIcon class="address-icon" :name="mode === 'pickup' ? 'storefront' : 'home_pin'" />
              </view>
              <view class="address-copy">
                <text class="address-title">{{ item.title }}</text>
                <text v-if="item.detail" class="address-detail">{{ item.detail }}</text>
                <text v-if="item.contact" class="address-contact">{{ item.contact }}</text>
              </view>
            </view>
            <view class="select-dot" :class="{ 'select-dot-active': selectedTitle === item.title }"></view>
          </view>
        </view>

        <button class="confirm-button" @click="confirmSelection">确认地址</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const BUY_ADDRESS_STORAGE_KEY = 'urban_architect_buy_address_selection';

const mode = ref('pickup');
const selectedTitle = ref('');

const pickupOptions = [
  {
    title: '就近购买',
    detail: '系统将自动匹配您附近的可购买门店',
  },
  {
    title: '静安嘉里中心',
    detail: '静安区南京西路 1515 号',
  },
  {
    title: '环贸商场',
    detail: '徐汇区淮海中路 999 号',
  },
  {
    title: '港汇恒隆广场',
    detail: '徐汇区虹桥路 1 号',
  },
];

const receiverOptions = [
  {
    title: '上海市浦东新区陆家嘴环路1000号',
    detail: '国金中心办公楼',
    contact: '张先生 138****8888',
  },
  {
    title: '静安区南京西路1601号',
    detail: '越洋广场 28 楼',
    contact: '李女士 136****9292',
  },
  {
    title: '徐汇区淮海中路999号',
    detail: '环贸商场写字楼 12 楼',
    contact: '王先生 139****5188',
  },
];

const currentOptions = computed(() => (mode.value === 'pickup' ? pickupOptions : receiverOptions));
const pageTitle = computed(() => (mode.value === 'pickup' ? '购买地址' : '收货地址'));
const pageDesc = computed(() =>
  mode.value === 'pickup'
    ? '选择代购门店或商圈，提交后将用于骑手购买路线。'
    : '选择您的收货地址和联系人，提交后会同步到进行中的订单。'
);

onLoad((options) => {
  mode.value = options?.type === 'receiver' ? 'receiver' : 'pickup';
  selectedTitle.value = options?.selectedTitle || currentOptions.value[0]?.title || '';
});

const selectAddress = (item) => {
  selectedTitle.value = item.title;
};

const confirmSelection = () => {
  const selected = currentOptions.value.find((item) => item.title === selectedTitle.value) || currentOptions.value[0];

  uni.setStorageSync(BUY_ADDRESS_STORAGE_KEY, {
    type: mode.value,
    title: selected.title,
    detail: selected.detail || '',
    contact: selected.contact || '',
  });

  uni.navigateBack();
};

const goBack = () => {
  uni.navigateBack();
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
  border-radius: 26px;
  padding: 22px 20px;
  background: linear-gradient(180deg, #2954db 0%, #123ec4 100%);
  box-shadow: 0 16px 30px rgba(18, 62, 196, 0.2);
}

.hero-badge {
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
  line-height: 1.2;
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

.address-list {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.address-card {
  border-radius: 24px;
  background: #fbfbfc;
  padding: 16px;
  box-shadow: 0 10px 28px rgba(20, 26, 38, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.address-card-active {
  outline: 2px solid rgba(24, 71, 215, 0.16);
}

.address-card-main {
  display: flex;
  align-items: center;
  min-width: 0;
}

.address-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: #e8edf8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.address-icon {
  font-size: 21px;
  color: #1847d7;
  font-variation-settings: 'FILL' 1;
}

.address-copy {
  margin-left: 12px;
  min-width: 0;
}

.address-title {
  display: block;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 800;
  color: #1d2128;
}

.address-detail,
.address-contact {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.6;
  color: #747b8a;
}

.select-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #d5dbe8;
  box-sizing: border-box;
  flex-shrink: 0;
}

.select-dot-active {
  border-color: #1847d7;
  box-shadow: inset 0 0 0 5px #1847d7;
}

.confirm-button {
  margin-top: 22px;
  height: 54px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(180deg, #1b49d8 0%, #0f3dc7 100%);
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  line-height: 54px;
  box-shadow: 0 14px 24px rgba(19, 67, 201, 0.22);
}

button::after {
  border: none;
}
</style>
