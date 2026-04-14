<template>
  <view class="bg-background text-on-surface min-h-screen overflow-hidden relative">
    <!-- Background Login Page (Simulated) -->
    <view class="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-surface">
      <view class="w-full max-w-md space-y-8">
        <view class="flex flex-col items-center">
          <view class="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center mb-6">
            <text class="material-symbols-outlined text-primary text-4xl">electric_moped</text>
          </view>
          <view class="text-3xl font-extrabold tracking-tight text-on-surface">UrbanConcierge</view>
          <view class="text-on-surface-variant mt-2">同城高效 悦享生活</view>
        </view>
        <view class="space-y-4">
          <view class="h-14 w-full bg-surface-container-high rounded-xl"></view>
          <view class="h-14 w-full bg-surface-container-high rounded-xl"></view>
          <view class="h-14 w-full bg-primary/20 rounded-xl"></view>
        </view>
      </view>
    </view>

    <!-- Semi-transparent Overlay Mask -->
    <view class="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-40"></view>

    <!-- Bottom Modal: WeChat Authorization -->
    <view class="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out">
      <view
        class="bg-surface-container-lowest rounded-t-3xl p-8 pb-12 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] max-w-2xl mx-auto"
      >
        <!-- Handle -->
        <view class="w-12 h-1.5 bg-outline-variant/30 rounded-full mx-auto mb-8"></view>
        <!-- Header -->
        <view class="flex items-center gap-4 mb-8">
          <view class="w-12 h-12 bg-[#07C160] rounded-xl flex items-center justify-center">
            <!-- Replacing svg with an image or just a styled view -->
            <text class="material-symbols-outlined text-white text-2xl" style="font-variation-settings: 'FILL' 1"
              >chat</text
            >
          </view>
          <view>
            <view class="text-xl font-bold text-on-surface tracking-tight">微信授权</view>
            <view class="text-sm text-on-surface-variant">由 UrbanConcierge 开发</view>
          </view>
        </view>
        <!-- Content -->
        <view class="mb-10">
          <view class="text-lg font-semibold text-on-surface mb-3">申请获取您的个人信息</view>
          <view
            class="flex items-start gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10"
          >
            <text
              class="material-symbols-outlined text-primary-fixed-dim mt-0.5"
              style="font-variation-settings: 'FILL' 1"
              >check_circle</text
            >
            <view class="text-on-surface-variant text-base leading-relaxed"
              >您的昵称、头像、地区及性别信息，以便为您提供个性化的同城跑腿服务。</view
            >
          </view>
        </view>
        <!-- Action Buttons -->
        <view class="grid grid-cols-2 gap-4">
          <button
            class="h-14 flex items-center justify-center rounded-2xl bg-surface-container-high text-on-surface-variant font-bold text-lg hover:bg-surface-variant transition-colors active:scale-95 duration-200 after:border-none"
            @click="handleReject"
          >
            拒绝
          </button>
          <button
            class="h-14 flex items-center justify-center rounded-2xl bg-primary text-on-primary font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95 duration-200 after:border-none"
            @click="handleAllow"
          >
            允许
          </button>
        </view>
        <!-- Visual Asset Hint -->
        <view class="mt-8 opacity-0 pointer-events-none h-0">
          <image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmfB1JPb3mD93Ile-WGGyHARowGihrfvItcBddO6zJ_KhCNuC2hfBF3RFpoS2WfKcRuExsmN75WgkPQQ0vjXOs9RmXcBRA6rQRvWak9gahbMiKUI7IvX_Yg9QMXUXwckp4rr80SBZSnZ4kslQF9sF7b_F4JBtxW76blK9YhskZ7FYDuyp_I48PzfAr7mGLCmEUOzSSD7y00GUIMnzj4b31FDGtzuT8863IwJJwnECECJPlrwRr2r-0R2tv6rlIFRi6Mg7MZIYPMvE"
            mode="aspectFill"
          ></image>
        </view>
      </view>
    </view>

    <!-- Decorative Architectural Background Elements -->
    <view class="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 opacity-30">
      <view class="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed blur-[120px] rounded-full"></view>
      <view class="absolute top-1/2 -left-48 w-80 h-80 bg-secondary-fixed blur-[100px] rounded-full"></view>
    </view>
  </view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';

const handleReject = () => {
  uni.showToast({
    title: '已拒绝',
    icon: 'none',
  });
};

const handleAllow = () => {
  uni.switchTab({
    url: '/pages/index/index',
  });
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  font-family: 'Material Symbols Outlined';
}
</style>
