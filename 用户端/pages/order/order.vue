<template>
  <view class="bg-surface text-on-surface min-h-screen pb-24">
    <!-- Top Navigation Anchor -->
    <view class="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-xl flex justify-between items-center px-6 h-16">
      <view class="flex items-center gap-4">
        <view class="material-symbols-outlined text-primary hover:opacity-80 transition-opacity">menu</view>
        <text class="text-xl font-extrabold tracking-tighter text-[#0037b0] font-headline">Urban Architect</text>
      </view>
      <view class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/10">
        <image class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnx_8PCg7QH8C2DHtTQNQQqHE3vcqpKusHswxFD1PiL4e4caYKTdCjA3fudvA19FvEWTsz_A-z_vTnVbgGdBckltf4tUpH8zGocnHbcBy8saEdPWq9AO6t8nJXtGN_VfSj6lA_aA3VtDdb3LOstw_hGHbSydoLuS47FX4uS0mEsK6AzyhU1jGwRIcQCpDJ_t7zgBApaLDK7nihysNT0jlwxDDTMudgNYJXSP8qXu7I9q-WFQXrP5MC8k7VU4O5ZeyDdiVIFlsxLh4" mode="aspectFill"></image>
      </view>
    </view>
    <view class="pt-24 px-6 max-w-2xl mx-auto">
      <!-- Header & Tabs Section -->
      <view class="mb-8">
        <view class="text-3xl font-bold tracking-tight text-on-surface mb-6">我的订单</view>
        <!-- Bento-style Tab Switcher -->
        <view class="flex p-1.5 bg-surface-container-low rounded-2xl gap-1 overflow-x-auto no-scrollbar">
          <view class="whitespace-nowrap px-6 py-2.5 rounded-xl bg-surface-container-lowest text-primary font-bold shadow-sm transition-all duration-200">全部</view>
          <view class="whitespace-nowrap px-6 py-2.5 rounded-xl text-on-surface-variant font-medium hover:bg-surface-container-high transition-all duration-200">进行中</view>
          <view class="whitespace-nowrap px-6 py-2.5 rounded-xl text-on-surface-variant font-medium hover:bg-surface-container-high transition-all duration-200">待评价</view>
          <view class="whitespace-nowrap px-6 py-2.5 rounded-xl text-on-surface-variant font-medium hover:bg-surface-container-high transition-all duration-200">已完成</view>
        </view>
      </view>
      <!-- Order Cards List -->
      <view class="space-y-4">
        <!-- Active Order Card -->
        <view class="group bg-surface-container-lowest rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10">
          <view class="flex justify-between items-start mb-4">
            <view class="flex items-center gap-3">
              <view class="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center">
                <text class="material-symbols-outlined text-primary-container">architecture</text>
              </view>
              <view>
                <view class="text-sm font-semibold text-primary uppercase tracking-wider">空间规划设计</view>
                <view class="text-xs text-on-surface-variant">订单号: UA-20230914-01</view>
              </view>
            </view>
            <view class="flex items-center gap-2 px-3 py-1 bg-primary-fixed rounded-full">
              <view class="w-2 h-2 rounded-full bg-primary animate-pulse"></view>
              <text class="text-[10px] font-bold text-on-primary-fixed-variant">进行中</text>
            </view>
          </view>
          <view class="py-4 border-y border-outline-variant/10 flex items-center gap-4">
            <image class="w-20 h-20 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxNTTHtAc0Oak_E-QNc_UVj5L9enH1cHaBQ2IoZpgfLO3N3mdEmSlY9kO0QPDPCXoqxhTwNJ1IB6kg7EDa2pmmwYJWBJ6m6KzqXqRfG14N3WsPYXMQWcRbEGOWHhepRWzOmIZsaEQveOQMcN4TfQy73RkkIp4NsnwNcmvSEQrV7dAnHsN1ZdXVBx03PTGAD-jUn6RlZj0lWEgK4e7bHcPTxrKM-bVbWXGPHPjh-bW0TGjpqvc8peP3G_volphu5E4AiJJ5cM4mFtU" mode="aspectFill"></image>
            <view class="flex-1">
              <view class="font-bold text-lg text-on-surface mb-1">滨海别墅概念方案</view>
              <view class="text-sm text-on-surface-variant line-clamp-1">包含平面布局、3D建模及初步材质选择</view>
              <view class="mt-2 text-xl font-extrabold text-on-surface">¥12,800.00</view>
            </view>
          </view>
          <view class="mt-4 flex justify-end gap-3">
            <view class="px-5 py-2 text-sm font-bold text-primary rounded-xl hover:bg-primary/5 transition-colors">查看详情</view>
            <view class="px-5 py-2 text-sm font-bold bg-primary text-on-primary rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">联系建筑师</view>
          </view>
        </view>
        <!-- Completed Order Card -->
        <view class="group bg-surface-container-lowest rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10">
          <view class="flex justify-between items-start mb-4">
            <view class="flex items-center gap-3">
              <view class="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center">
                <text class="material-symbols-outlined text-on-surface-variant">home_work</text>
              </view>
              <view>
                <view class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">园林景观改造</view>
                <view class="text-xs text-on-surface-variant opacity-60">订单号: UA-20230822-04</view>
              </view>
            </view>
            <view class="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
              <text class="text-[10px] font-bold text-on-surface-variant">已完成</text>
            </view>
          </view>
          <view class="py-4 border-y border-outline-variant/10 flex items-center gap-4 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
            <image class="w-20 h-20 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxtQYmWL7tXQ0Yt_e0gKB5a5RCdX8IigwZD6_xjSCucvz8vIFjarDfLq2hBcSGk_UIN8wCerFtD5JrGa9-sUTjxL-qWJjx6XeAPNgoyEvBiZ9qFxv1xMEmlbb2rOXERaHtYiYW609F35YJ3wjTCDvi44tBJJKbhiLKboW5dWtDjE5Dz8lYbSbIME0wG6iyqgIIfVrYy0eg_NlDtpE1COMc7hVJHBL-D8ZDZhP1-JcALvjhz11bGWciV1tzM6r6qmmiNdwRKS6ceuI" mode="aspectFill"></image>
            <view class="flex-1">
              <view class="font-bold text-lg text-on-surface mb-1">私人住宅庭院景观</view>
              <view class="text-sm text-on-surface-variant line-clamp-1">项目已于2023年9月5日交付完毕</view>
              <view class="mt-2 text-xl font-extrabold text-on-surface">¥45,000.00</view>
            </view>
          </view>
          <view class="mt-4 flex justify-end gap-3">
            <view class="px-5 py-2 text-sm font-bold text-on-surface-variant rounded-xl hover:bg-surface-container-high transition-colors">再次咨询</view>
            <view class="px-5 py-2 text-sm font-bold border border-primary text-primary rounded-xl hover:bg-primary/5 transition-all">评价订单</view>
          </view>
        </view>
        <!-- Pending Review Card -->
        <view class="group bg-surface-container-lowest rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10">
          <view class="flex justify-between items-start mb-4">
            <view class="flex items-center gap-3">
              <view class="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center">
                <text class="material-symbols-outlined text-tertiary">design_services</text>
              </view>
              <view>
                <view class="text-sm font-semibold text-tertiary uppercase tracking-wider">灯光氛围设计</view>
                <view class="text-xs text-on-surface-variant">订单号: UA-20230910-09</view>
              </view>
            </view>
            <view class="flex items-center gap-2 px-3 py-1 bg-tertiary-fixed rounded-full">
              <text class="text-[10px] font-bold text-on-tertiary-fixed-variant">待评价</text>
            </view>
          </view>
          <view class="py-4 border-y border-outline-variant/10 flex items-center gap-4">
            <image class="w-20 h-20 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtsovotvTSFQsT4NWwDjAaeb_0IeWNDU0grYqhc6AjFeV8_2a1AvLFB9eU7De93Io_SDCdty5FMUbwv6_AYMNYIR5VLNMxGK-g6Fms3K3Yml3Uk7Lz1pdjuqDaoeixqqUeg5KAYhXw2R-F5_Ry57-M3k3mctZeKLlOLRUUjdtkH4THpVO9b0x_F88Tkypd6nKqD7erGuO1YTrjnVeJB66-eYPewibU5Vr9lWNu2m8iR1_JIPd6z_v-2uQDA8EEw94Z8YlixtFQsPw" mode="aspectFill"></image>
            <view class="flex-1">
              <view class="font-bold text-lg text-on-surface mb-1">光影交互体验设计</view>
              <view class="text-sm text-on-surface-variant line-clamp-1">全屋智能灯光联动方案</view>
              <view class="mt-2 text-xl font-extrabold text-on-surface">¥8,500.00</view>
            </view>
          </view>
          <view class="mt-4 flex justify-end gap-3">
            <view class="px-5 py-2 text-sm font-bold bg-primary text-on-primary rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">立即评价</view>
          </view>
        </view>
      </view>
    </view>
    <!-- Bottom Navigation Shell -->
    <view class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-2 pb-6 bg-[#ffffff]/90 backdrop-blur-2xl rounded-t-[1.5rem] z-50 border-t border-[#c4c5d7]/15 shadow-[0_-4px_40px_rgba(25,28,30,0.06)]">
      <navigator url="/pages/index/index" open-type="switchTab" hover-class="none" class="flex flex-col items-center justify-center text-[#434655] opacity-60 hover:bg-[#f2f4f6] rounded-xl px-5 py-1.5 transition-all">
        <text class="material-symbols-outlined text-2xl">calendar_today</text>
        <text class="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold mt-1">预约</text>
      </navigator>
      <navigator url="/pages/order/order" open-type="switchTab" hover-class="none" class="flex flex-col items-center justify-center text-[#0037b0] bg-[#dce1ff] rounded-2xl px-5 py-1.5 transition-all active:scale-90 duration-150">
        <text class="material-symbols-outlined text-2xl">receipt_long</text>
        <text class="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold mt-1">订单</text>
      </navigator>
      <navigator url="/pages/my/my" open-type="switchTab" hover-class="none" class="flex flex-col items-center justify-center text-[#434655] opacity-60 hover:bg-[#f2f4f6] rounded-xl px-5 py-1.5 transition-all">
        <text class="material-symbols-outlined text-2xl">person</text>
        <text class="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold mt-1">我的</text>
      </navigator>
    </view>
  </view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app'

onShow(() => {
  uni.hideTabBar({
    animation: false
  })
})
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-family: 'Material Symbols Outlined';
}
</style>