<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="top-back" @tap="goBack">
          <LocalIcon class="top-back-icon" name="arrow_back" />
        </view>
        <text class="top-title">万能帮</text>
        <image class="top-avatar" :src="avatarUrl" mode="aspectFill" />
      </view>

      <view class="content">
        <view class="hero-card hero-card-all">
          <text class="hero-tag">URBAN ARCHITECT CUSTOM HELP</text>
          <text class="hero-title">万能帮忙</text>
          <text class="hero-title">灵活响应</text>
          <text class="hero-desc">不确定属于哪类服务？把需求告诉我们，平台会智能分派最合适的服务方案。</text>
          <LocalIcon class="hero-icon" name="auto_awesome" />
        </view>

        <view class="panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="lightbulb" />
            <text class="panel-head-title">需求类型</text>
          </view>
          <view class="tag-group">
            <view
              v-for="item in taskScenes"
              :key="item"
              class="tag-item"
              :class="{ 'tag-item-active': selectedScenes.includes(item) }"
              @tap="toggleScene(item)"
            >
              <text class="tag-text" :class="{ 'tag-text-active': selectedScenes.includes(item) }">{{ item }}</text>
            </view>
          </view>
        </view>

        <view class="panel">
          <view class="panel-head">
            <LocalIcon class="panel-head-icon" name="forum" />
            <text class="panel-head-title">详细需求</text>
          </view>
          <view class="textarea-wrapper">
            <textarea
              v-model="form.requirement"
              class="text-area"
              maxlength="200"
              placeholder="请尽量详细描述诉求、地点、期望时间、预算范围和特殊要求"
              :cursor-spacing="20"
            />
          </view>
        </view>

        <view class="panel selector-panel" @tap="selectDeadline">
          <view class="selector-icon-box">
            <LocalIcon class="selector-icon" name="schedule" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">期望完成时间</text>
            <text class="selector-value">{{ form.deadline }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <view class="panel selector-panel" @tap="selectBudget">
          <view class="selector-icon-box selector-icon-box-soft">
            <LocalIcon class="selector-icon" name="payments" />
          </view>
          <view class="selector-copy">
            <text class="selector-label">预算范围</text>
            <text class="selector-value">{{ form.budget }}</text>
          </view>
          <LocalIcon class="selector-arrow" name="expand_more" />
        </view>

        <view class="panel tips-panel">
          <text class="tips-title">平台建议</text>
          <text class="tips-desc"
            >万能帮更适合非标准化服务需求，提交后会由客服在 5 分钟内协助分流到最匹配的服务类型。</text
          >
        </view>

        <button
          class="submit-button"
          :class="{ 'submit-button-disabled': !isSubmitEnabled }"
          :disabled="!isSubmitEnabled"
          @tap="submitAllInOne"
        >
          提交需求
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import LocalIcon from '@/components/LocalIcon.vue';

import { computed, reactive, ref } from 'vue';
import { createOrder } from '../../api/order';
import { ORDER_REDIRECT_KEY } from '../../utils/order-store';

const avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80';

const taskScenes = ['临时代购', '上门协助', '资料递送', '陪同办理', '创意需求', '其他需求'];
const selectedScenes = ref(['其他需求']);

const form = reactive({
  requirement: '',
  deadline: '今天内完成',
  budget: '¥100 - ¥300',
});

const isSubmitEnabled = computed(() => {
  return Boolean(
    selectedScenes.value.length &&
    String(form.requirement).trim() &&
    String(form.deadline).trim() &&
    String(form.budget).trim(),
  );
});

const toggleScene = (scene) => {
  if (selectedScenes.value.includes(scene)) {
    selectedScenes.value = selectedScenes.value.filter((item) => item !== scene);
    return;
  }

  selectedScenes.value = [...selectedScenes.value, scene];
};

const selectDeadline = () => {
  const options = ['今天内完成', '明天前完成', '本周内完成', '可灵活安排'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.deadline = options[res.tapIndex];
    },
  });
};

const selectBudget = () => {
  const options = ['¥0 - ¥100', '¥100 - ¥300', '¥300 - ¥800', '预算可议'];
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      form.budget = options[res.tapIndex];
    },
  });
};

const submitAllInOne = async () => {
  if (!isSubmitEnabled.value) {
    uni.showToast({
      title: '请完善详细需求说明',
      icon: 'none',
    });
    return;
  }

  try {
    uni.showLoading({ title: '正在提交...' });
    await createOrder({
      serviceType: 'universal',
      projectName: selectedScenes.value.join(' / ') || '万能帮',
      projectDesc: form.requirement.trim().substring(0, 30) + '...',
      goods: form.requirement.trim(),
      price: Number.parseFloat(form.budget.replace(/[^\d.]/g, '') || '0'),
      pickupTitle: '任务需求点',
      pickupDetail: '详见需求说明',
      receiverTitle: '任务交付点',
      receiverDetail: '详见需求说明',
      note: form.requirement,
      eta: form.deadline === '尽快处理' ? '预计 30 分钟内响应' : `预计 ${form.deadline}`,
      detailSummary: `万能帮需求已收到，客服将在 5 分钟内为您对接专属服务专员。`,
      detailSections: {
        all: {
          requirement: form.requirement.trim(),
          deadline: form.deadline,
          budget: form.budget,
          selectedScenes: selectedScenes.value.join(', '),
          feeText: `预估预算 ${form.budget}`,
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

.hero-card-all {
  background: linear-gradient(180deg, #1565c4 0%, #0f49a7 100%);
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
  max-width: 208px;
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
  color: rgba(144, 196, 255, 0.22);
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
  height: 128px;
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
  background: #dff1ff;
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

.tips-panel {
  background: #eef5ff;
}

.tips-title {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #1847d7;
}

.tips-desc {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.7;
  color: #57709d;
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
