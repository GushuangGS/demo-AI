<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="top-back" @click="goBack">
          <LocalIcon class="top-back-icon" name="arrow_back" />
        </view>
        <text class="top-title">帮我买</text>
        <image class="top-avatar" :src="avatarUrl" mode="aspectFill" />
      </view>

      <view class="content">
        <view class="hero-card">
          <text class="hero-tag">URBAN ARCHITECT SERVICE</text>
          <text class="hero-title">即刻代购</text>
          <text class="hero-title">高效送达</text>
          <text class="hero-desc">告诉我们您需要什么，我们的城市建筑师团队将为您处理一切。</text>
          <LocalIcon class="hero-icon" name="shopping_bag" />
        </view>

        <view class="panel goods-panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="stylus_note" />
            <text class="panel-head-title">商品信息</text>
          </view>

          <view class="textarea-wrapper">
            <textarea
              v-model="form.goodsName"
              class="goods-textarea"
              maxlength="120"
              placeholder="请输入想买的商品，如：两杯瑞幸生椰拿铁，去冰半糖..."
              :cursor-spacing="20"
            />
          </view>

          <view class="goods-actions">
            <view class="price-card">
              <text class="price-label">预估价格</text>
              <view class="price-input-row">
                <text class="price-currency">¥</text>
                <input
                  v-model="form.goodsPrice"
                  class="price-input"
                  type="digit"
                  placeholder="0.00"
                  :cursor-spacing="20"
                />
              </view>
            </view>

            <view class="upload-card" @click="chooseImage">
              <image v-if="form.imageUrl" class="upload-preview" :src="form.imageUrl" mode="aspectFill" />
              <view v-else class="upload-empty">
                <LocalIcon class="upload-icon" name="photo_camera" />
                <text class="upload-text">添加图片</text>
              </view>
            </view>
          </view>
        </view>

        <view class="panel address-panel">
          <view class="address-item" @click="goAddressManager('pickup')">
            <view class="address-marker address-marker-gray"></view>
            <view class="address-copy">
              <text class="address-label">购买地址</text>
              <text class="address-title">{{ form.pickupAddress }}</text>
            </view>
            <LocalIcon class="address-arrow" name="chevron_right" />
          </view>

          <view class="address-divider"></view>

          <view class="address-item" @click="goAddressManager('receiver')">
            <view class="address-marker address-marker-blue"></view>
            <view class="address-copy">
              <text class="address-label">收货地址</text>
              <text class="address-title">{{ form.receiverAddress }}</text>
              <text class="address-detail">{{ form.receiverContact }}</text>
            </view>
            <LocalIcon class="address-arrow" name="chevron_right" />
          </view>
        </view>

        <view class="panel selector-panel" @click="selectDeliverTime">
          <view class="selector-icon-box">
            <LocalIcon class="selector-icon" name="schedule" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">送达时间</text>
            <text class="selector-value">{{ form.deliverTime }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <view class="panel selector-panel" @click="selectRemark">
          <view class="selector-icon-box selector-icon-box-note">
            <LocalIcon class="selector-icon" name="chat" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">备注要求</text>
            <text class="selector-value">{{ form.remark }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <view class="panel fee-panel">
          <view class="fee-row">
            <text class="fee-label">配送费</text>
            <text class="fee-value">¥15.00</text>
          </view>
          <view class="fee-row">
            <text class="fee-label">小费</text>
            <text class="fee-value fee-value-blue">+¥5.00</text>
          </view>
          <view class="fee-total-row">
            <text class="fee-total-label">合计</text>
            <view class="fee-total-right">
              <text class="fee-origin">¥25.00</text>
              <text class="fee-total">¥20.00</text>
            </view>
          </view>
        </view>

        <button
          class="submit-button"
          :class="{ 'submit-button-disabled': !isSubmitEnabled }"
          :disabled="!isSubmitEnabled"
          @click="submitOrder"
        >
          提交订单
          <LocalIcon class="submit-icon" name="rocket_launch" />
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import LocalIcon from '@/components/LocalIcon.vue';

import { computed, reactive } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { createOrder } from '../../api/order';
import { ORDER_REDIRECT_KEY } from '../../utils/order-store';
const BUY_ADDRESS_STORAGE_KEY = 'urban_architect_buy_address_selection';

const avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80';

const form = reactive({
  goodsName: '',
  goodsPrice: '',
  imageUrl: '',
  pickupAddress: '就近购买',
  receiverAddress: '上海市浦东新区陆家嘴环路1000号',
  receiverContact: '张先生 138****8888',
  deliverTime: '立即送达',
  remark: '无特殊要求',
});

const isSubmitEnabled = computed(() => {
  return [
    String(form.goodsName).trim(),
    String(form.goodsPrice).trim(),
    String(form.pickupAddress).trim(),
    String(form.receiverAddress).trim(),
    String(form.receiverContact).trim(),
    String(form.deliverTime).trim(),
    String(form.remark).trim(),
  ].every(Boolean);
});

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      form.imageUrl = res.tempFilePaths?.[0] || '';
    },
  });
};

const goAddressManager = (type) => {
  const selectedTitle = type === 'pickup' ? form.pickupAddress : form.receiverAddress;
  uni.navigateTo({
    url: `/pages/buy/address?type=${type}&selectedTitle=${encodeURIComponent(selectedTitle)}`,
  });
};

const selectDeliverTime = () => {
  const options = ['立即送达', '30分钟内送达', '1小时内送达'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.deliverTime = options[res.tapIndex];
    },
  });
};

const selectRemark = () => {
  const options = ['无特殊要求', '请先电话联系', '需要开发票', '轻拿轻放'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.remark = options[res.tapIndex];
    },
  });
};

const syncSelectedAddress = () => {
  const selected = uni.getStorageSync(BUY_ADDRESS_STORAGE_KEY);
  if (!selected || typeof selected !== 'object' || !selected.type) {
    return;
  }

  if (selected.type === 'pickup') {
    form.pickupAddress = selected.title || form.pickupAddress;
  }

  if (selected.type === 'receiver') {
    form.receiverAddress = selected.title || form.receiverAddress;
    form.receiverContact = selected.contact || form.receiverContact;
  }

  uni.removeStorageSync(BUY_ADDRESS_STORAGE_KEY);
};

const submitOrder = async () => {
  if (!isSubmitEnabled.value) {
    uni.showToast({
      title: '请先完善全部下单信息',
      icon: 'none',
    });
    return;
  }

  const parsedPrice = Number.parseFloat(form.goodsPrice || '0');
  const displayPrice = `¥${parsedPrice.toFixed(2)}`;

  try {
    uni.showLoading({ title: '正在提交...' });
    await createOrder({
      serviceType: 'buy',
      projectName: form.goodsName.trim(),
      projectDesc: `${form.pickupAddress} · 送至 ${form.receiverAddress}`,
      goods: `${form.goodsName.trim()} · 预估${displayPrice}`,
      price: parsedPrice,
      pickupTitle: form.pickupAddress,
      pickupDetail: '系统将就近选择门店',
      receiverTitle: form.receiverAddress,
      receiverDetail: form.receiverContact,
      note: form.remark,
      eta: form.deliverTime === '立即送达' ? '预计尽快送达' : `预计 ${form.deliverTime}`,
      detailSummary: `代购任务已创建，正在从 ${form.pickupAddress} 为您采购并配送。`,
      detailSections: {
        buy: {
          goodsName: form.goodsName.trim(),
          goodsPrice: displayPrice,
          pickupAddress: form.pickupAddress,
          receiverAddress: form.receiverAddress,
          receiverContact: form.receiverContact,
          deliverTime: form.deliverTime,
          remark: form.remark,
          imageUrl: form.imageUrl,
          feeText: '配送费 ¥15.00 + 小费 ¥5.00，合计 ¥20.00',
        },
      },
    });
    uni.hideLoading();

    uni.setStorageSync(ORDER_REDIRECT_KEY, 'delivery');
    uni.reLaunch({
      url: '/pages/order/order',
    });
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: error?.message || '下单失败，请稍后重试',
      icon: 'none',
    });
  }
};

onShow(() => {
  syncSelectedAddress();
});

const goBack = () => {
  uni.navigateBack();
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
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 30;
  height: 66px;
  padding: 0 14px;
  padding-top: var(--status-bar-height, env(safe-area-inset-top));
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f3f5;
}

.top-back {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-back-icon {
  width: 20px;
  height: 20px;
  color: #1747d7;
}

.top-title {
  flex: 1;
  margin-left: 4px;
  font-size: 18px;
  font-weight: 800;
  color: #1847d7;
}

.top-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.content {
  padding: 8px 12px calc(160px + env(safe-area-inset-bottom));
}

.hero-card {
  position: relative;
  overflow: hidden;
  min-height: 172px;
  border-radius: 28px;
  background: linear-gradient(180deg, #1543c4 0%, #0f39b7 100%);
  padding: 26px 22px;
  box-shadow: 0 16px 30px rgba(15, 57, 183, 0.26);
}

.hero-tag {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: rgba(225, 232, 255, 0.92);
}

.hero-title {
  display: block;
  font-size: 26px;
  line-height: 1.15;
  font-weight: 800;
  color: #ffffff;
}

.hero-title:first-of-type {
  margin-top: 16px;
}

.hero-desc {
  display: block;
  margin-top: 16px;
  max-width: 186px;
  font-size: 12px;
  line-height: 1.65;
  color: rgba(223, 232, 255, 0.84);
}

.hero-icon {
  position: absolute;
  right: 18px;
  bottom: -6px;
  width: 122px;
  height: 122px;
  opacity: 0.42;
}

.panel {
  margin-top: 18px;
  border-radius: 26px;
  background: #f7f7f8;
  padding: 18px;
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-head-icon {
  width: 20px;
  height: 20px;
  color: #1847d7;
}

.panel-head-title {
  font-size: 16px;
  font-weight: 800;
  color: #1c2027;
}

.textarea-wrapper {
  width: 100%;
  height: 118px;
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: #eceef2;
  box-sizing: border-box;
}

.goods-textarea {
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 14px;
  line-height: 1.65;
  color: #1d2128;
}

.goods-actions {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.price-card,
.upload-card {
  min-height: 78px;
  border-radius: 14px;
  background: #eceef2;
}

.price-card {
  padding: 12px 14px;
}

.price-label {
  display: block;
  font-size: 12px;
  line-height: 1.4;
  color: #3a3f4d;
}

.price-input-row {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.price-currency {
  font-size: 16px;
  font-weight: 800;
  color: #1847d7;
}

.price-input {
  flex: 1;
  margin-left: 6px;
  height: 32px;
  font-size: 28px;
  font-weight: 800;
  color: #6f7686;
  background: transparent;
}

.upload-card {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-empty {
  display: flex;
  align-items: center;
  gap: 6px;
}

.upload-icon {
  width: 18px;
  height: 18px;
  color: #505767;
}

.upload-text {
  font-size: 14px;
  color: #505767;
}

.upload-preview {
  width: 100%;
  height: 78px;
}

.address-item {
  display: flex;
  align-items: flex-start;
}

.address-marker {
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
}

.address-marker-gray {
  background: #d2d7e6;
}

.address-marker-blue {
  background: #1847d7;
  box-shadow: 0 0 0 4px rgba(24, 71, 215, 0.12);
}

.address-copy {
  flex: 1;
  margin-left: 14px;
}

.address-label {
  display: block;
  font-size: 12px;
  color: #8a91a0;
}

.address-title {
  display: block;
  margin-top: 6px;
  font-size: 15px;
  line-height: 1.4;
  font-weight: 800;
  color: #181b20;
}

.address-detail {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #737a89;
}

.address-arrow,
.selector-arrow {
  width: 20px;
  height: 20px;
  color: #7f8695;
}

.address-divider {
  width: 2px;
  height: 24px;
  margin: 10px 0 10px 4px;
  background: #dce0ea;
}

.selector-panel {
  display: flex;
  align-items: center;
}

.selector-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #dfe4ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selector-icon-box-note {
  background: #dde1ff;
}

.selector-icon {
  width: 20px;
  height: 20px;
  color: #1847d7;
}

.selector-copy {
  flex: 1;
  margin-left: 12px;
}

.selector-label {
  display: block;
  font-size: 12px;
  color: #949aa8;
}

.selector-value {
  display: block;
  margin-top: 6px;
  font-size: 16px;
  font-weight: 800;
  color: #1b1e25;
}

.fee-row,
.fee-total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fee-row + .fee-row {
  margin-top: 12px;
}

.fee-label {
  font-size: 14px;
  color: #2b2f38;
}

.fee-value {
  font-size: 14px;
  color: #2b2f38;
}

.fee-value-blue {
  color: #1847d7;
  font-weight: 700;
}

.fee-total-row {
  margin-top: 18px;
  padding-top: 12px;
}

.fee-total-label {
  font-size: 18px;
  font-weight: 800;
  color: #1c2027;
}

.fee-total-right {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.fee-origin {
  font-size: 12px;
  color: #a4aab8;
  text-decoration: line-through;
}

.fee-total {
  font-size: 22px;
  font-weight: 800;
  color: #1847d7;
}

.submit-button {
  position: fixed;
  left: 50%;
  bottom: calc(92px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: calc(100% - 24px);
  max-width: 406px;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(180deg, #1543c4 0%, #0f39b7 100%);
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  line-height: 56px;
  box-shadow: 0 14px 24px rgba(15, 57, 183, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-button-disabled {
  background: #bfc7db;
  box-shadow: none;
}

.submit-icon {
  width: 20px;
  height: 20px;
  color: #ffffff;
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
  background: rgba(247, 247, 248, 0.95);
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
  width: 22px;
  height: 22px;
  color: #9ca5b7;
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
