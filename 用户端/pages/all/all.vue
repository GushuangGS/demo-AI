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
          <textarea
            v-model="form.requirement"
            class="text-area"
            maxlength="200"
            placeholder="请尽量详细描述诉求、地点、期望时间、预算范围和特殊要求"
          />
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
import { computed, reactive, ref } from 'vue';
import { buildCommonOrderRecord, submitOrderRecord } from '../../utils/order-store';

const avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80';

const taskScenes = ['临时代购', '上门协助', '资料递送', '陪同办理', '创意需求', '其他需求'];
const selectedScenes = ref(['其他需求']);

const form = reactive({
  requirement: '',
  deadline: '今天内完成',
  budget: '¥100 - ¥300',
});

const isSubmitEnabled = computed(() => {
  return Boolean(selectedScenes.value.length && form.requirement.trim() && form.deadline.trim() && form.budget.trim());
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

const submitAllInOne = () => {
  if (!isSubmitEnabled.value) {
    uni.showToast({
      title: '请先完善全部需求信息',
      icon: 'none',
    });
    return;
  }

  const orderNo = `#UA-${String(Date.now()).slice(-4)}-WN`;
  const sceneText = selectedScenes.value.join(' / ');
  const activeOrderPayload = {
    orderNo,
    eta: `${form.deadline} 前响应`,
    payMethod: '待沟通确认',
    goods: `${sceneText} · ${form.requirement.trim()}`,
    addressLabel: '需求概览',
    detailLabel: '服务说明',
    rider: {
      name: '智能分派顾问',
      rating: '4.9',
      completed: '5,100+ 咨询',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    },
    steps: [
      {
        title: '需求已受理',
        desc: '系统正在匹配最合适的服务方案',
        time: '刚刚更新',
        active: true,
      },
      {
        title: '等待人工确认',
        desc: '客服将在 5 分钟内回访您',
        time: '待完成',
        active: false,
      },
    ],
    address: {
      title: sceneText,
      detail: `${form.deadline} · ${form.budget}`,
    },
  };

  const orderListPayload = {
    orderNo,
    filter: 'inProgress',
    category: '万能帮',
    projectName: sceneText,
    projectDesc: form.requirement.trim(),
    price: form.budget,
    actionText: '联系客服',
    actionType: 'service',
    statusLabel: '进行中',
    statusClass: 'status-blue',
    icon: 'auto_awesome',
    iconClass: 'icon-blue',
    secondary: false,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=320&q=80',
  };

  const orderRecord = buildCommonOrderRecord({
    orderNo,
    type: 'all',
    listItem: orderListPayload,
    activeOrder: activeOrderPayload,
    detailPayload: {
      title: sceneText,
      summary: '平台已受理该非标准化需求，正在进行智能分派与人工确认。',
      price: orderListPayload.price,
      status: '进行中',
      payMethod: activeOrderPayload.payMethod,
      assignee: activeOrderPayload.rider.name,
      timeline: activeOrderPayload.steps,
      sections: {
        all: {
          sceneText,
          requirement: form.requirement.trim(),
          deadline: form.deadline,
          budget: form.budget,
          suggestion: '客服将在 5 分钟内与您确认服务边界、预算和执行方式。',
        },
      },
    },
  });

  submitOrderRecord(orderRecord);
  uni.switchTab({
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(242, 243, 245, 0.92);
}

.top-back {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-back-icon {
  font-size: 20px;
  color: #1747d7;
  font-variation-settings: 'FILL' 1;
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
  font-size: 120px;
  color: rgba(144, 196, 255, 0.22);
  font-variation-settings: 'FILL' 1;
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
  font-size: 20px;
  color: #1847d7;
  font-variation-settings: 'FILL' 1;
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

.text-area {
  width: 100%;
  height: 128px;
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: #eceef2;
  box-sizing: border-box;
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
  font-size: 20px;
  color: #1847d7;
  font-variation-settings: 'FILL' 1;
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
  font-size: 20px;
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
