<template>
  <view class="bg-surface text-on-surface min-h-screen pb-32">
    <!-- Top Navigation Shell -->
    <view class="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-xl flex justify-between items-center px-6 h-16 w-full">
      <view class="flex items-center gap-4">
        <text class="material-symbols-outlined text-[#0037b0] cursor-pointer">menu</text>
        <view class="text-xl font-extrabold tracking-tighter text-[#0037b0] font-['Plus_Jakarta_Sans']">Urban Architect</view>
      </view>
      <view class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
        <image class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAea2OR0Go6r13YEByR4WtZURQ5RNVFiLedA-oQ4JUf-g2Sz6f82t3Ssnvt0n7MfE_bruiPgLAcyT4MnzEAchesqJlbGBjUk5FlV-Yq4Cvd1Yy9cjl5eUMajDaCtcVKXy7nUHkfCodfY1VvG2dMS3wIyys6Ro_3y2gZObmg65omIcaiqLkYhmWeymB5lDXeE0xysIDQrFmxI3GzpE1Pcd-XtLuP3Ic89tM4z5_eLzyXTddubniSxH9kZ39MB5SxtARoCEKIRDPlU9U" mode="aspectFill"></image>
      </view>
    </view>
    <view class="pt-20 px-6 max-w-2xl mx-auto">
      <!-- Profile Section: Architectural Focus -->
      <view class="mb-8 relative">
        <view class="flex items-end justify-between mb-6">
          <view>
            <view class="text-3xl font-extrabold tracking-tight text-on-surface mb-1">个人中心</view>
            <view class="text-on-surface-variant text-sm flex items-center gap-2">
              <view class="w-2 h-2 rounded-full bg-primary animate-pulse"></view>
              高级会员 · 城市规划师
            </view>
          </view>
          <view class="p-3 bg-primary-fixed rounded-2xl">
            <text class="material-symbols-outlined text-primary text-2xl">qr_code_2</text>
          </view>
        </view>
        <!-- Bento Profile Card -->
        <view class="grid grid-cols-12 gap-4">
          <view class="col-span-12 bg-surface-container-lowest p-6 rounded-3xl shadow-[0_-4px_40px_rgba(25,28,30,0.04)] relative overflow-hidden group">
            <view class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></view>
            <view class="flex items-center gap-5 relative z-10">
              <view class="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
                <image class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANl9WSCHpXMxwnjD19rV39W6rh804lx_fgnrJziATE7DXZBayYNaZyTYhSLaMLiew5W62y0rbSGTYHjJNOzaSLGa2v-12-js6XtaqKZbjpoe2_mk-_Q8QNpBLNLcxoWKoGtM9oLz9mfhtcqUTVj-WDYGDmrhvMG7d16MW70ttWYOZmMZXKPEq-8EUFHwsiYCeHjXKFGKEkbBdV65iQffWMnpLCgQxuqTmU2CoSqh3P97alm_IT2q2aj7ULDh3jooXPq2OVQrInQ6c" mode="aspectFill"></image>
              </view>
              <view>
                <view class="text-xl font-bold text-on-surface">陈子昂</view>
                <view class="text-on-surface-variant text-sm mt-1">ID: 8829-ARCH-01</view>
                <view class="flex gap-2 mt-3">
                  <text class="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Verified</text>
                  <text class="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-wider">Level 5</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- Financial Dashboard: Asymmetric Cards -->
      <view class="mb-10">
        <view class="grid grid-cols-2 gap-4">
          <!-- Account Balance -->
          <view class="bg-primary p-6 rounded-3xl text-on-primary flex flex-col justify-between aspect-square relative overflow-hidden">
            <view class="absolute bottom-0 right-0 opacity-10">
              <text class="material-symbols-outlined text-[120px]" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</text>
            </view>
            <view>
              <text class="text-xs font-semibold tracking-widest opacity-70 uppercase">账户余额</text>
              <view class="text-3xl font-extrabold mt-1">¥12,840.50</view>
            </view>
            <view class="flex items-center gap-1 text-xs font-bold bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
              立即充值
              <text class="material-symbols-outlined text-sm">chevron_right</text>
            </view>
          </view>
          <view class="flex flex-col gap-4">
            <!-- Coupons Card -->
            <view class="bg-surface-container-low p-5 rounded-3xl flex-1 flex flex-col justify-between">
              <view class="flex justify-between items-start">
                <text class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">confirmation_number</text>
                <text class="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">4 张</text>
              </view>
              <view>
                <view class="text-lg font-bold text-on-surface leading-tight">优惠券</view>
                <view class="text-xs text-on-surface-variant mt-1">最近到期: 3天后</view>
              </view>
            </view>
            <!-- Points/Credits -->
            <view class="bg-secondary-container/30 p-5 rounded-3xl flex-1 flex flex-col justify-between">
              <view class="flex justify-between items-start">
                <text class="material-symbols-outlined text-secondary text-2xl" style="font-variation-settings: 'FILL' 1;">stars</text>
              </view>
              <view>
                <view class="text-lg font-bold text-on-surface leading-tight">积分商城</view>
                <view class="text-xs text-on-surface-variant mt-1">可用积分: 2,450</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- Service Settings: Editorial List -->
      <view class="mb-10">
        <view class="text-xs font-extrabold text-outline uppercase tracking-[0.2em] mb-6">服务与设置</view>
        <view class="bg-surface-container-lowest rounded-[2rem] overflow-hidden p-2 space-y-1">
          <view class="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-2xl transition-colors cursor-pointer group">
            <view class="flex items-center gap-4">
              <view class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                <text class="material-symbols-outlined">settings</text>
              </view>
              <view>
                <view class="font-bold text-on-surface">系统设置</view>
                <view class="text-xs text-on-surface-variant">偏好、隐私与安全</view>
              </view>
            </view>
            <text class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</text>
          </view>
          <view class="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-2xl transition-colors cursor-pointer group">
            <view class="flex items-center gap-4">
              <view class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                <text class="material-symbols-outlined">location_on</text>
              </view>
              <view>
                <view class="font-bold text-on-surface">地址管理</view>
                <view class="text-xs text-on-surface-variant">3 个常用服务点</view>
              </view>
            </view>
            <text class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</text>
          </view>
          <view class="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-2xl transition-colors cursor-pointer group">
            <view class="flex items-center gap-4">
              <view class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                <text class="material-symbols-outlined">support_agent</text>
              </view>
              <view>
                <view class="font-bold text-on-surface">在线客服</view>
                <view class="text-xs text-on-surface-variant">24/7 专属管家</view>
              </view>
            </view>
            <text class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</text>
          </view>
          <view class="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-2xl transition-colors cursor-pointer group">
            <view class="flex items-center gap-4">
              <view class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                <text class="material-symbols-outlined">description</text>
              </view>
              <view>
                <view class="font-bold text-on-surface">协议规则</view>
                <view class="text-xs text-on-surface-variant">服务条款与政策</view>
              </view>
            </view>
            <text class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</text>
          </view>
        </view>
      </view>
      <!-- Logout Trigger -->
      <view class="w-full py-5 text-error font-bold flex items-center justify-center gap-2 hover:bg-error/5 rounded-2xl transition-colors cursor-pointer">
        <text class="material-symbols-outlined">logout</text>
        退出当前账号
      </view>
    </view>
    <!-- Bottom Navigation Bar (Shell) -->
    <view class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-2 pb-6 bg-[#ffffff]/90 backdrop-blur-2xl rounded-t-[1.5rem] z-50 shadow-[0_-4px_40px_rgba(25,28,30,0.06)] border-t border-[#c4c5d7]/15">
      <navigator url="/pages/index/index" open-type="switchTab" hover-class="none" class="flex flex-col items-center justify-center text-[#434655] opacity-60 hover:bg-[#f2f4f6] rounded-xl px-5 py-1.5 transition-all">
        <text class="material-symbols-outlined">calendar_today</text>
        <text class="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold mt-1">预约</text>
      </navigator>
      <navigator url="/pages/order/order" open-type="switchTab" hover-class="none" class="flex flex-col items-center justify-center text-[#434655] opacity-60 hover:bg-[#f2f4f6] rounded-xl px-5 py-1.5 transition-all">
        <text class="material-symbols-outlined">receipt_long</text>
        <text class="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold mt-1">订单</text>
      </navigator>
      <navigator url="/pages/my/my" open-type="switchTab" hover-class="none" class="flex flex-col items-center justify-center text-[#0037b0] bg-[#dce1ff] rounded-2xl px-5 py-1.5 transition-all active:scale-90 duration-150">
        <text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</text>
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