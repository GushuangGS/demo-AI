<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="top-back" @tap="goBack">
          <LocalIcon class="top-back-icon" name="arrow_back" />
        </view>
        <text class="top-title">帮我送</text>
        <image class="top-avatar" :src="avatarUrl" mode="aspectFill" />
      </view>

      <view class="content">
        <view class="hero-card hero-card-send">
          <text class="hero-tag">URBAN ARCHITECT DELIVERY</text>
          <text class="hero-title">同城急送</text>
          <text class="hero-title">专人直达</text>
          <text class="hero-desc">文件、鲜花、蛋糕、礼品都可即时送达，支持全城快速响应。</text>
          <LocalIcon class="hero-icon" name="package_2" />
        </view>

        <view class="panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="inventory_2" />
            <text class="panel-head-title">寄送信息</text>
          </view>
          <input v-model="form.itemName" class="text-input" placeholder="请输入物品名称，如：文件合同、生日蛋糕" />
          <textarea
            v-model="form.itemRemark"
            class="text-area"
            maxlength="120"
            placeholder="补充物品大小、是否易碎、是否需要保温等说明"
          />
        </view>

        <view class="panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="route" />
            <text class="panel-head-title">配送路线</text>
          </view>
          <view class="route-card route-card-gap">
            <text class="route-label">取件地址</text>
            <text class="route-title">{{ form.pickupAddress }}</text>
            <text class="route-detail">{{ form.pickupContact }}</text>
          </view>
          <view class="route-card">
            <text class="route-label">收件地址</text>
            <text class="route-title">{{ form.receiverAddress }}</text>
            <text class="route-detail">{{ form.receiverContact }}</text>
          </view>
        </view>

        <view class="panel selector-panel" @tap="selectDeliverySpeed">
          <view class="selector-icon-box">
            <LocalIcon class="selector-icon" name="bolt" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">配送时效</text>
            <text class="selector-value">{{ form.deliverySpeed }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <view class="panel selector-panel" @tap="selectInsurance">
          <view class="selector-icon-box selector-icon-box-soft">
            <LocalIcon class="selector-icon" name="verified_user" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">保价服务</text>
            <text class="selector-value">{{ form.insurance }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <button
          class="submit-button"
          :class="{ 'submit-button-disabled': !isSubmitEnabled }"
          :disabled="!isSubmitEnabled"
          @tap="submitSendOrder"
        >
          立即下单
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import LocalIcon from '@/components/LocalIcon.vue';

import { computed, reactive } from 'vue';
import { buildCommonOrderRecord, submitOrderRecord } from '../../utils/order-store';

const avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80';

const form = reactive({
  itemName: '',
  itemRemark: '',
  pickupAddress: '北京市朝阳区三里屯 SOHO 5 号楼',
  pickupContact: '张先生 138****6666',
  receiverAddress: '北京市海淀区中关村大街 27 号',
  receiverContact: '李女士 139****8888',
  deliverySpeed: '1 小时达',
  insurance: '基础保价',
});

const isSubmitEnabled = computed(() =>
  [
    form.itemName.trim(),
    form.itemRemark.trim(),
    form.pickupAddress.trim(),
    form.pickupContact.trim(),
    form.receiverAddress.trim(),
    form.receiverContact.trim(),
    form.deliverySpeed.trim(),
    form.insurance.trim(),
  ].every(Boolean),
);

const selectDeliverySpeed = () => {
  const options = ['30 分钟加急', '1 小时达', '当日送达'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.deliverySpeed = options[res.tapIndex];
    },
  });
};

const selectInsurance = () => {
  const options = ['基础保价', '高价值保价', '无需保价'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.insurance = options[res.tapIndex];
    },
  });
};

const submitSendOrder = () => {
  if (!isSubmitEnabled.value) {
    uni.showToast({
      title: '请先完善全部寄送信息',
      icon: 'none',
    });
    return;
  }

  const orderNo = `#UA-${String(Date.now()).slice(-4)}-SD`;
  const activeOrderPayload = {
    orderNo,
    eta: form.deliverySpeed === '30 分钟加急' ? '预计 30 分钟送达' : `预计 ${form.deliverySpeed}`,
    payMethod: '在线支付',
    goods: `${form.itemName.trim()} · ${form.itemRemark.trim()}`,
    addressLabel: '收件地址',
    detailLabel: '寄送物品',
    rider: {
      name: '同城配送专员',
      rating: '4.9',
      completed: '3,800+ 配送',
      avatar: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=240&q=80',
    },
    steps: [
      {
        title: '已安排取件',
        desc: '配送专员正在前往取件地址',
        time: '刚刚更新',
        active: true,
      },
      {
        title: '已送往收件点',
        desc: `预计按 ${form.deliverySpeed} 完成配送`,
        time: '待完成',
        active: false,
      },
    ],
    address: {
      title: form.receiverAddress,
      detail: form.receiverContact,
    },
  };

  const orderListPayload = {
    orderNo,
    filter: 'inProgress',
    category: '帮我送',
    projectName: form.itemName.trim(),
    projectDesc: `${form.pickupAddress} -> ${form.receiverAddress}`,
    price: '¥25.00',
    actionText: '联系客服',
    actionType: 'service',
    statusLabel: '进行中',
    statusClass: 'status-blue',
    icon: 'local_shipping',
    iconClass: 'icon-blue',
    secondary: false,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=320&q=80',
  };

  const orderRecord = buildCommonOrderRecord({
    orderNo,
    type: 'send',
    listItem: orderListPayload,
    activeOrder: activeOrderPayload,
    detailPayload: {
      title: form.itemName.trim(),
      summary: `配送专员将从 ${form.pickupAddress} 取件后送往 ${form.receiverAddress}。`,
      price: orderListPayload.price,
      status: '进行中',
      payMethod: activeOrderPayload.payMethod,
      assignee: activeOrderPayload.rider.name,
      timeline: activeOrderPayload.steps,
      sections: {
        send: {
          itemName: form.itemName.trim(),
          itemRemark: form.itemRemark.trim(),
          pickupAddress: form.pickupAddress,
          pickupContact: form.pickupContact,
          receiverAddress: form.receiverAddress,
          receiverContact: form.receiverContact,
          deliverySpeed: form.deliverySpeed,
          insurance: form.insurance,
        },
      },
    },
  });

  submitOrderRecord(orderRecord);
  uni.reLaunch({
    url: '/pages/order/order',
  });
};

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
  background: rgba(242, 243, 245, 0.92);
  backdrop-filter: blur(24px);
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
  padding: 8px 12px 32px;
}

.hero-card {
  position: relative;
  overflow: hidden;
  min-height: 172px;
  border-radius: 28px;
  padding: 26px 22px;
  box-shadow: 0 16px 30px rgba(15, 57, 183, 0.2);
}

.hero-card-send {
  background: linear-gradient(180deg, #3555d6 0%, #233fb3 100%);
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
  max-width: 200px;
  font-size: 12px;
  line-height: 1.65;
  color: rgba(223, 232, 255, 0.84);
}

.hero-icon {
  position: absolute;
  right: 18px;
  bottom: -4px;
  width: 120px;
  height: 120px;
  color: rgba(150, 170, 255, 0.28);
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

.text-input,
.text-area,
.route-card {
  background: #eceef2;
  border-radius: 16px;
}

.text-input {
  height: 48px;
  margin-top: 16px;
  padding: 0 14px;
  font-size: 14px;
  color: #1d2128;
}

.text-area {
  width: 100%;
  height: 106px;
  margin-top: 12px;
  padding: 14px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.65;
  color: #1d2128;
}

.route-card {
  padding: 14px;
}

.route-card-gap {
  margin-top: 16px;
  margin-bottom: 12px;
}

.route-label,
.selector-label {
  display: block;
  font-size: 12px;
  color: #8a91a0;
}

.route-title,
.selector-value {
  display: block;
  margin-top: 6px;
  font-size: 15px;
  line-height: 1.4;
  font-weight: 800;
  color: #1b1e25;
}

.route-detail {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #737a89;
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

.selector-icon-box-soft {
  background: #e7e9ff;
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

.selector-arrow {
  width: 20px;
  height: 20px;
  color: #7f8695;
}

.submit-button {
  margin-top: 20px;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(180deg, #1847d7 0%, #0d3ecf 100%);
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  line-height: 56px;
}

.submit-button-disabled {
  background: #bfc7db;
}

button::after {
  border: none;
}
</style>
