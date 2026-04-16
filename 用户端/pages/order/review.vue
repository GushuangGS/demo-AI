<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="back-action" @click="goBack">
          <LocalIcon class="back-icon" name="arrow_back" />
        </view>
        <text class="top-title">评价订单</text>
        <view class="top-placeholder"></view>
      </view>

      <view class="content">
        <view class="project-card">
          <text class="project-status">{{ status }}</text>
          <text class="project-title">{{ projectName }}</text>
          <text class="project-order">订单号 {{ orderNo }}</text>
          <text class="project-price">{{ price }}</text>
        </view>

        <view class="panel">
          <text class="section-title">综合评分</text>
          <view class="star-row">
            <LocalIcon
              v-for="star in stars"
              :key="star"
              class="star-icon"
              :class="{ 'star-icon-active': star <= rating }"
              @click="rating = star"
             name="star" />
          </view>
          <text class="rating-text">{{ ratingText }}</text>
        </view>

        <view class="panel">
          <text class="section-title">评价标签</text>
          <view class="tag-list">
            <view
              v-for="item in reviewTags"
              :key="item"
              class="tag-item"
              :class="{ 'tag-item-active': selectedTags.includes(item) }"
              @click="toggleTag(item)"
            >
              <text class="tag-text" :class="{ 'tag-text-active': selectedTags.includes(item) }">
                {{ item }}
              </text>
            </view>
          </view>
        </view>

        <view class="panel">
          <text class="section-title">补充说明</text>
          <textarea
            v-model="comment"
            class="review-input"
            maxlength="200"
            placeholder="说说本次服务体验，比如沟通效率、专业度、交付质量..."
          />
          <text class="input-counter">{{ comment.length }}/200</text>
        </view>

        <button class="submit-button" @click="submitReview">提交评价</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const orderNo = ref('UA-20230910-09');
const projectName = ref('光影交互体验设计');
const status = ref('待评价');
const price = ref('¥8,500.00');

const stars = [1, 2, 3, 4, 5];
const rating = ref(5);
const comment = ref('');
const selectedTags = ref(['沟通顺畅', '交付专业']);
const reviewTags = ['沟通顺畅', '交付专业', '响应及时', '设计细致', '值得推荐', '性价比高'];

const ratingText = computed(() => {
  const map = {
    1: '体验一般，建议补充说明问题',
    2: '仍有改进空间',
    3: '整体尚可',
    4: '体验不错',
    5: '非常满意，推荐该服务',
  };
  return map[rating.value];
});

onLoad((options) => {
  orderNo.value = options?.orderNo || orderNo.value;
  projectName.value = options?.projectName || projectName.value;
  status.value = options?.status || status.value;
  price.value = options?.price || price.value;
});

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((item) => item !== tag);
    return;
  }
  selectedTags.value = [...selectedTags.value, tag];
};

const goBack = () => {
  uni.navigateBack();
};

const submitReview = () => {
  uni.showToast({
    title: '评价已提交',
    icon: 'success',
  });
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
  backdrop-filter: blur(24px);
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

.project-card,
.panel {
  border-radius: 26px;
  background: #fbfbfc;
  box-shadow: 0 10px 28px rgba(20, 26, 38, 0.04);
}

.project-card {
  padding: 22px 20px;
  background: linear-gradient(180deg, #2954db 0%, #123ec4 100%);
}

.project-status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #eaf0ff;
  font-size: 11px;
  font-weight: 700;
}

.project-title {
  display: block;
  margin-top: 18px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 800;
  color: #ffffff;
}

.project-order {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: rgba(233, 239, 255, 0.82);
}

.project-price {
  display: block;
  margin-top: 14px;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
}

.panel {
  margin-top: 18px;
  padding: 18px;
}

.section-title {
  display: block;
  margin-bottom: 14px;
  font-size: 15px;
  font-weight: 800;
  color: #1c2027;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.star-icon {
  font-size: 34px;
  color: #ccd3e3;
  font-variation-settings: 'FILL' 1;
}

.star-icon-active {
  color: #f5bb2e;
}

.rating-text {
  display: block;
  margin-top: 12px;
  font-size: 13px;
  color: #727988;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background: #edf0f5;
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
  color: #636a79;
}

.tag-text-active {
  color: #1847d7;
}

.review-input {
  width: 100%;
  min-height: 140px;
  padding: 14px;
  border-radius: 18px;
  background: #f2f4f8;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 1.7;
  color: #1d2128;
}

.input-counter {
  display: block;
  margin-top: 10px;
  text-align: right;
  font-size: 12px;
  color: #8b92a1;
}

.submit-button {
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
