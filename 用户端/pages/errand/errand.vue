<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="top-back" @tap="goBack">
          <LocalIcon class="top-back-icon" name="arrow_back" />
        </view>
        <text class="top-title">帮我办</text>
        <image class="top-avatar" :src="avatarUrl" mode="aspectFill" />
      </view>

      <view class="content">
        <view class="hero-card hero-card-errand">
          <text class="hero-tag">URBAN ARCHITECT ERRAND</text>
          <text class="hero-title">代办跑腿</text>
          <text class="hero-title">省时省心</text>
          <text class="hero-desc">证件代取、材料递交、排队代办、上门协助，临时任务一键发起。</text>
          <LocalIcon class="hero-icon" name="assignment" />
        </view>

        <view class="panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="checklist" />
            <text class="panel-head-title">代办类型</text>
          </view>
          <view class="tag-group">
            <view
              v-for="item in taskTypes"
              :key="item"
              class="tag-item"
              :class="{ 'tag-item-active': form.taskType === item }"
              @tap="form.taskType = item"
            >
              <text class="tag-text" :class="{ 'tag-text-active': form.taskType === item }">{{ item }}</text>
            </view>
          </view>
        </view>

        <view class="panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="edit_note" />
            <text class="panel-head-title">任务说明</text>
          </view>
          <view class="textarea-wrapper">
            <textarea
              v-model="form.taskDesc"
              class="text-area"
              maxlength="180"
              placeholder="请描述具体事项、办理地点、所需材料、截止时间等"
              :cursor-spacing="20"
            />
          </view>
        </view>

        <view class="panel selector-panel" @tap="selectTime">
          <view class="selector-icon-box">
            <LocalIcon class="selector-icon" name="event" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">期望时间</text>
            <text class="selector-value">{{ form.taskTime }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <view class="panel selector-panel" @tap="selectPriority">
          <view class="selector-icon-box selector-icon-box-soft">
            <LocalIcon class="selector-icon" name="bolt" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">任务优先级</text>
            <text class="selector-value">{{ form.priority }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <view class="panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="attach_money" />
            <text class="panel-head-title">预算范围</text>
          </view>
          <view class="budget-row">
            <view class="budget-box">
              <text class="budget-label">起步预算</text>
              <view class="budget-input-row">
                <text class="budget-prefix">¥</text>
                <input
                  v-model="form.budgetMin"
                  class="budget-input"
                  type="digit"
                  placeholder="50"
                  :cursor-spacing="20"
                />
              </view>
            </view>
            <view class="budget-box">
              <text class="budget-label">上限预算</text>
              <view class="budget-input-row">
                <text class="budget-prefix">¥</text>
                <input
                  v-model="form.budgetMax"
                  class="budget-input"
                  type="digit"
                  placeholder="200"
                  :cursor-spacing="20"
                />
              </view>
            </view>
          </view>
        </view>

        <button
          class="submit-button"
          :class="{ 'submit-button-disabled': !isSubmitEnabled }"
          :disabled="!isSubmitEnabled"
          @tap="submitErrandOrder"
        >
          发起代办
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, reactive } from 'vue';
import LocalIcon from '../../components/LocalIcon.vue';
import { createOrder } from '../../api/order';
import { ORDER_REDIRECT_KEY } from '../../utils/order-store';

const avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80';

const taskTypes = ['排队代办', '文件递交', '证件代取', '上门协助'];

const form = reactive({
  taskType: '排队代办',
  taskDesc: '',
  taskTime: '今天下午',
  priority: '标准处理',
  budgetMin: '50',
  budgetMax: '200',
});

const isSubmitEnabled = computed(() =>
  [
    String(form.taskType).trim(),
    String(form.taskDesc).trim(),
    String(form.taskTime).trim(),
    String(form.priority).trim(),
    String(form.budgetMin).trim(),
    String(form.budgetMax).trim(),
  ].every(Boolean),
);

const selectTime = () => {
  const options = ['今天上午', '今天下午', '今晚', '明日上午'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.taskTime = options[res.tapIndex];
    },
  });
};

const selectPriority = () => {
  const options = ['标准处理', '加急优先', '全天候跟进'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.priority = options[res.tapIndex];
    },
  });
};

const submitErrandOrder = async () => {
  if (!isSubmitEnabled.value) {
    uni.showToast({
      title: '请先完善全部下单信息',
      icon: 'none',
    });
    return;
  }

  try {
    uni.showLoading({ title: '正在提交...' });
    await createOrder({
      serviceType: 'task',
      projectName: `${form.taskType} · ${form.priority}处理`,
      projectDesc: form.taskDesc.trim().substring(0, 30) + '...',
      goods: form.taskDesc.trim(),
      price: Number.parseFloat(form.budgetMin || '0'),
      pickupTitle: '任务办理地点',
      pickupDetail: '详见任务说明',
      receiverTitle: '任务交付地点',
      receiverDetail: '详见任务说明',
      note: form.taskDesc,
      eta: form.taskTime === '尽快处理' ? '预计 1 小时内响应' : `预计 ${form.taskTime}`,
      detailSummary: `跑腿任务已发布，系统正在为您匹配最合适的代办专员。`,
      detailSections: {
        errand: {
          taskType: form.taskType,
          taskDesc: form.taskDesc.trim(),
          taskTime: form.taskTime,
          priority: form.priority,
          budgetMin: form.budgetMin,
          budgetMax: form.budgetMax,
          feeText: `预估报酬 ¥${form.budgetMin} - ¥${form.budgetMax}`,
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

.hero-card-errand {
  background: linear-gradient(180deg, #4d43d8 0%, #3423b4 100%);
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
  max-width: 210px;
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
  opacity: 0.28;
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

.tag-group {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background: #eceef2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-item-active {
  background: #dfe6ff;
}

.tag-text {
  font-size: 13px;
  font-weight: 700;
  color: #666d7d;
}

.tag-text-active {
  color: #1847d7;
}

.textarea-wrapper {
  width: 100%;
  height: 120px;
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: #eceef2;
  box-sizing: border-box;
}

.text-area {
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 14px;
  line-height: 1.65;
  color: #1d2128;
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
  background: #e8e3ff;
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
  color: #8a91a0;
}

.selector-value {
  display: block;
  margin-top: 6px;
  font-size: 15px;
  line-height: 1.4;
  font-weight: 800;
  color: #1b1e25;
}

.selector-arrow {
  width: 20px;
  height: 20px;
  color: #7f8695;
}

.budget-row {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.budget-box {
  padding: 14px;
  border-radius: 16px;
  background: #eceef2;
}

.budget-label {
  display: block;
  font-size: 12px;
  color: #8a91a0;
}

.budget-input-row {
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.budget-prefix {
  font-size: 18px;
  font-weight: 800;
  color: #1b1e25;
}

.budget-input {
  flex: 1;
  margin-left: 6px;
  height: 32px;
  font-size: 24px;
  font-weight: 800;
  color: #1b1e25;
  background: transparent;
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
