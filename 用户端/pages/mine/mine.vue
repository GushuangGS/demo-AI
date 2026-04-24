<template>
  <view class="page">
    <view class="page-shell">
      <view class="top-bar">
        <view class="brand-group">
          <LocalIcon class="brand-icon" name="grid_view" />
          <text class="brand-title">UrbanConcierge</text>
        </view>
        <LocalIcon class="notice-icon" name="notifications" />
      </view>

      <scroll-view scroll-y class="page-scroll">
        <view class="content">
          <view class="hero-card" @tap="handleLogin">
            <view class="hero-avatar-shell">
              <view class="hero-avatar">
                <image
                  v-if="userInfo && userInfo.avatar"
                  :src="userInfo.avatar"
                  class="user-avatar-img"
                  mode="aspectFill"
                />
                <LocalIcon v-else class="hero-avatar-icon" name="account_circle" />
              </view>
            </view>
            <view class="hero-copy">
              <text class="hero-title">{{ userInfo ? userInfo.nickname : '点击登录/注册' }}</text>
              <text class="hero-desc">{{ userInfo ? userInfo.phone || '已登录' : '解锁优质城市服务体验' }}</text>
            </view>
          </view>

          <view class="feature-grid">
            <view class="feature-card" @tap="showToast('我的钱包')">
              <view class="feature-icon-box">
                <LocalIcon class="feature-icon" name="account_balance_wallet" />
              </view>
              <view class="feature-copy">
                <text class="feature-title">我的钱包</text>
                <text class="feature-desc">查看余额与权益</text>
              </view>
            </view>

            <view class="feature-card" @tap="showToast('常用地址')">
              <view class="feature-icon-box">
                <LocalIcon class="feature-icon" name="location_on" />
              </view>
              <view class="feature-copy">
                <text class="feature-title">常用地址</text>
                <text class="feature-desc">管理下单地址</text>
              </view>
            </view>
          </view>

          <view class="mini-grid">
            <view class="mini-card" @tap="goServiceCenter">
              <view class="mini-icon-box">
                <LocalIcon class="mini-icon" name="support_agent" />
              </view>
              <text class="mini-title">客户服务</text>
            </view>

            <view class="mini-card" @tap="showToast('通用设置')">
              <view class="mini-icon-box">
                <LocalIcon class="mini-icon" name="settings" />
              </view>
              <text class="mini-title">通用设置</text>
            </view>
          </view>

          <view class="recruit-card">
            <view class="recruit-glow recruit-glow-top"></view>
            <view class="recruit-glow recruit-glow-bottom"></view>
            <text class="recruit-badge">招聘中</text>
            <text class="recruit-title">加入我们的骑士团</text>
            <text class="recruit-desc">弹性时间，收入丰厚</text>
            <view class="recruit-button" @tap="showToast('立即申请')">立即申请</view>
          </view>

          <view class="menu-list">
            <view class="menu-item" @tap="showToast('法律协议与隐私政策')">
              <view class="menu-left">
                <view class="menu-icon-box">
                  <LocalIcon class="menu-icon" name="shield" />
                </view>
                <text class="menu-title">法律协议与隐私政策</text>
              </view>
              <LocalIcon class="menu-arrow" name="chevron_right" />
            </view>

            <view class="menu-item" @tap="showToast('关于 UrbanConcierge')">
              <view class="menu-left">
                <view class="menu-icon-box">
                  <LocalIcon class="menu-icon" name="help" />
                </view>
                <text class="menu-title">关于 UrbanConcierge</text>
              </view>
              <LocalIcon class="menu-arrow" name="chevron_right" />
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="tab-bar">
      <view class="tab-item" @tap="openRootPage('/pages/index/index')">
        <view class="tab-icon-box">
          <LocalIcon class="tab-icon" name="calendar_month" />
        </view>
        <text class="tab-text">预约</text>
      </view>
      <view class="tab-item" @tap="openRootPage('/pages/order/order')">
        <view class="tab-icon-box">
          <LocalIcon class="tab-icon" name="receipt_long" />
        </view>
        <text class="tab-text">订单</text>
      </view>
      <view class="tab-item tab-item-active" @tap="openRootPage('/pages/mine/mine')">
        <view class="tab-icon-box tab-icon-box-active">
          <LocalIcon class="tab-icon" name="person" />
        </view>
        <text class="tab-text tab-text-active">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import LocalIcon from '@/components/LocalIcon.vue';
import { loginApi } from '@/api/auth';
import { USER_PROFILE_STORAGE_KEY } from '@/api/request';

const userInfo = ref(null);

onShow(() => {
  const cachedUser = uni.getStorageSync(USER_PROFILE_STORAGE_KEY);
  if (cachedUser) {
    userInfo.value = cachedUser;
  }
});

const openRootPage = (url) => {
  uni.reLaunch({ url });
};

const showToast = (title) => {
  uni.showToast({
    title: `${title}待接入`,
    icon: 'none',
  });
};

const handleLogin = () => {
  if (userInfo.value) {
    uni.showToast({ title: '您已登录', icon: 'none' });
    return;
  }

  // 修复：uni.getUserProfile 必须直接由用户点击事件触发，不能放在 uni.login 回调中
  uni.getUserProfile({
    desc: '获取您的头像昵称用于个人中心展示',
    success: (infoRes) => {
      const { nickName, avatarUrl } = infoRes.userInfo;
      console.log(infoRes, '00000');

      uni.login({
        provider: 'weixin',
        success: async (loginRes) => {
          if (loginRes.code) {
            try {
              uni.showLoading({ title: '登录中...' });
              // 提示：真实的手机号需要通过 <button open-type="getPhoneNumber"> 获取，
              // 无法通过 uni.getUserProfile 拿到。此处为了完整演示流程，我们保持登录调用
              const result = await loginApi({
                phone: '13800138000', // 如果有真实后端，这里需用 getPhoneNumber 获取到的 code 去后端换取手机号
                nickname: nickName,
                avatar: avatarUrl,
              });

              userInfo.value = result.user;
              uni.hideLoading();
              uni.showToast({ title: '登录成功', icon: 'success' });
            } catch (err) {
              uni.hideLoading();
              uni.showToast({ title: '登录失败', icon: 'none' });
            }
          }
        },
        fail: () => {
          uni.showToast({ title: '获取登录凭证失败', icon: 'none' });
        },
      });
    },
    fail: () => {
      // 降级处理，用户拒绝授权或基础库不支持时
      uni.showLoading({ title: '登录中...' });
      loginApi({
        phone: '13800138000',
        nickname: '微信用户',
        avatar: '',
      })
        .then((result) => {
          userInfo.value = result.user;
          uni.hideLoading();
          uni.showToast({ title: '登录成功（降级）', icon: 'success' });
        })
        .catch(() => {
          uni.hideLoading();
          uni.showToast({ title: '登录失败', icon: 'none' });
        });
    },
  });
};

const goServiceCenter = () => {
  uni.navigateTo({
    url: '/pages/order/service?source=我的',
  });
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
  padding-bottom: 112px;
  box-sizing: border-box;
}

.page-scroll {
  height: 100vh;
}

.top-bar {
  padding-top: var(--status-bar-height, env(safe-area-inset-top));
  box-sizing: content-box;
  position: sticky;
  top: 0;
  z-index: 30;
  height: 74px;
  padding: 18px 20px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(242, 243, 245, 0.96);
  box-sizing: border-box;
}

.brand-group {
  display: flex;
  align-items: center;
}

.brand-icon {
  width: 24px;
  height: 24px;
}

.brand-title {
  margin-left: 12px;
  font-size: 20px;
  font-weight: 800;
  color: #1847d7;
}

.notice-icon {
  width: 22px;
  height: 22px;
}

.content {
  padding: 12px 18px 24px;
}

.hero-card {
  position: relative;
  overflow: hidden;
  min-height: 132px;
  border-radius: 28px;
  background: linear-gradient(180deg, #2b58dc 0%, #1847d7 100%);
  padding: 22px 18px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 16px 30px rgba(24, 71, 215, 0.2);
}

.hero-card::before,
.hero-card::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.hero-card::before {
  width: 120px;
  height: 120px;
  top: -32px;
  right: -18px;
}

.hero-card::after {
  width: 72px;
  height: 72px;
  left: -22px;
  bottom: -18px;
}

.hero-avatar-shell {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  padding: 6px;
  background: rgba(255, 255, 255, 0.75);
  box-sizing: border-box;
}

.hero-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(242, 243, 245, 0.96);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-avatar-icon {
  width: 40px;
  height: 40px;
  opacity: 0.45;
}

.user-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.hero-copy {
  margin-left: 18px;
}

.hero-title {
  display: block;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 800;
  color: #ffffff;
}

.hero-desc {
  display: block;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(235, 239, 255, 0.78);
}

.feature-grid {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}

.feature-card {
  width: calc(50% - 8px);
  min-height: 176px;
  border-radius: 24px;
  background: #f8f8f9;
  padding: 22px 18px;
  box-sizing: border-box;
}

.feature-icon-box,
.mini-icon-box,
.menu-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #eef1f6;
}

.feature-icon {
  width: 20px;
  height: 20px;
}

.feature-copy {
  margin-top: 48px;
}

.feature-title {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: #171b22;
}

.feature-desc {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  color: #6f7786;
}

.mini-grid {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.mini-card {
  width: calc(50% - 8px);
  height: 92px;
  border-radius: 24px;
  background: #eceef2;
  display: flex;
  align-items: center;
  padding: 0 18px;
  box-sizing: border-box;
}

.mini-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(20, 28, 40, 0.05);
}

.mini-icon {
  width: 20px;
  height: 20px;
}

.mini-title {
  margin-left: 12px;
  font-size: 16px;
  font-weight: 800;
  color: #1b2027;
}

.recruit-card {
  position: relative;
  overflow: hidden;
  margin-top: 28px;
  min-height: 164px;
  border-radius: 28px;
  background: linear-gradient(120deg, #0f1219 0%, #1d2332 45%, #11161f 100%);
  padding: 20px 22px;
  box-sizing: border-box;
}

.recruit-glow {
  position: absolute;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 196, 71, 0.55) 0%, rgba(255, 196, 71, 0) 100%);
  transform: rotate(26deg);
}

.recruit-glow-top {
  width: 118px;
  height: 188px;
  top: -30px;
  right: 42px;
}

.recruit-glow-bottom {
  width: 84px;
  height: 132px;
  right: 18px;
  bottom: -20px;
}

.recruit-badge,
.recruit-title,
.recruit-desc,
.recruit-button {
  position: relative;
  z-index: 2;
}

.recruit-badge {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
}

.recruit-title {
  display: block;
  margin-top: 12px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 800;
  color: #ffffff;
}

.recruit-desc {
  display: block;
  margin-top: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
}

.recruit-button {
  width: 108px;
  height: 44px;
  margin-top: 20px;
  border-radius: 14px;
  background: linear-gradient(180deg, #1e4ad8 0%, #103ed2 100%);
  text-align: center;
  line-height: 44px;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
}

.menu-list {
  margin-top: 26px;
}

.menu-item {
  height: 82px;
  margin-bottom: 16px;
  border-radius: 20px;
  background: #f8f8f9;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: #eef1f6;
}

.menu-icon {
  width: 20px;
  height: 20px;
}

.menu-title {
  margin-left: 14px;
  font-size: 16px;
  color: #171c23;
}

.menu-arrow {
  width: 18px;
  height: 18px;
  opacity: 0.45;
}

.tab-bar {
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 40;
  width: 100%;
  max-width: 430px;
  transform: translateX(-50%);
  padding: 14px 18px 24px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0 -8px 30px rgba(20, 28, 40, 0.06);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-item-active {
  color: #1847d7;
}

.tab-icon-box {
  width: 44px;
  height: 36px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon-box-active {
  background: #dce3ff;
}

.tab-icon {
  width: 18px;
  height: 18px;
}

.tab-text {
  margin-top: 4px;
  font-size: 10px;
  font-weight: 700;
  color: #8b92a0;
}

.tab-text-active {
  color: #1847d7;
}
</style>
