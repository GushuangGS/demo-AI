<template>
  <view class="page">
    <view class="page-shell">
      <view v-if="isLoggedIn" class="top-bar logged-top-bar bg-glass">
        <view class="brand-wrap">
          <text class="material-symbols-outlined top-leading-icon">menu</text>
          <text class="brand-name logged-brand-name">UrbanArchitect</text>
        </view>
        <image class="top-avatar" :src="profile.avatarUrl" mode="aspectFill" />
      </view>

      <view v-else class="top-bar bg-glass">
        <view class="brand-wrap">
          <text class="material-symbols-outlined brand-icon">grid_view</text>
          <text class="brand-name">UrbanConcierge</text>
        </view>
        <text class="material-symbols-outlined notice-icon">notifications</text>
      </view>

      <view v-if="isLoggedIn" class="content logged-content">
        <view class="profile-hero">
          <view class="profile-hero-main">
            <text class="profile-page-title">个人中心</text>
            <view class="profile-member-row">
              <view class="profile-member-dot"></view>
              <text class="profile-member-text">{{ profile.memberLabel }}</text>
            </view>
          </view>
          <view class="profile-hero-side">
            <view class="profile-qr-box">
              <text class="material-symbols-outlined profile-qr-icon">qr_code_2</text>
            </view>
          </view>
        </view>

        <view class="profile-card">
          <view class="profile-card-deco"></view>
          <image class="profile-card-avatar" :src="profile.avatarUrl" mode="aspectFill" />
          <view class="profile-card-copy">
            <text class="profile-card-name">{{ profile.nickName }}</text>
            <text class="profile-card-id">ID: {{ profile.userId }}</text>
            <view class="profile-badge-row">
              <text class="profile-badge profile-badge-primary">VERIFIED</text>
              <text class="profile-badge profile-badge-warm">LEVEL 5</text>
            </view>
          </view>
        </view>

        <view class="asset-grid">
          <view class="balance-card">
            <text class="asset-label">账户余额</text>
            <text class="balance-value">{{ profile.balance }}</text>
            <view class="balance-button">
              <text class="balance-button-text">立即充值</text>
              <text class="material-symbols-outlined balance-button-icon">chevron_right</text>
            </view>
            <view class="balance-bubble balance-bubble-one"></view>
            <view class="balance-bubble balance-bubble-two"></view>
          </view>

          <view class="asset-side">
            <view class="benefit-card">
              <view class="benefit-card-top">
                <text class="material-symbols-outlined benefit-icon">confirmation_number</text>
                <text class="benefit-pill">{{ profile.couponCount }}</text>
              </view>
              <text class="benefit-title">优惠券</text>
              <text class="benefit-desc">{{ profile.couponHint }}</text>
            </view>

            <view class="benefit-card points-card">
              <view class="benefit-card-top">
                <text class="material-symbols-outlined benefit-icon">stars</text>
              </view>
              <text class="benefit-title">积分商城</text>
              <text class="benefit-desc">可用积分:{{ profile.points }}</text>
            </view>
          </view>
        </view>

        <view class="service-section">
          <text class="service-section-title">服务 与 设置</text>
          <view class="service-panel">
            <view v-for="item in loggedMenuItems" :key="item.title" class="service-item">
              <view class="service-item-left">
                <view class="service-item-icon-box">
                  <text class="material-symbols-outlined service-item-icon">{{ item.icon }}</text>
                </view>
                <view class="service-item-copy">
                  <text class="service-item-title">{{ item.title }}</text>
                  <text class="service-item-desc">{{ item.desc }}</text>
                </view>
              </view>
              <text class="material-symbols-outlined service-item-arrow">chevron_right</text>
            </view>
          </view>
        </view>

        <view class="logout-wrap">
          <view class="logout-button" @click="logout">
            <text class="material-symbols-outlined logout-icon">logout</text>
            <text class="logout-text">退出当前账号</text>
          </view>
        </view>
      </view>

      <view v-else class="content">
        <view class="login-card" @click="handleWechatLogin">
          <view class="login-glow login-glow-right"></view>
          <view class="login-glow login-glow-left"></view>
          <view class="login-main">
            <view class="avatar-shell">
              <view class="avatar-ring">
                <view class="avatar-core">
                  <text class="material-symbols-outlined avatar-icon">account_circle</text>
                </view>
              </view>
            </view>
            <view class="login-copy">
              <text class="login-title">点击登录/注册</text>
              <text class="login-subtitle">解锁优质城市服务体验</text>
            </view>
          </view>
        </view>

        <view class="feature-grid">
          <view v-for="item in featureCards" :key="item.title" class="feature-card">
            <view class="feature-icon-box">
              <text class="material-symbols-outlined feature-icon">{{ item.icon }}</text>
            </view>
            <view class="feature-copy">
              <text class="feature-title">{{ item.title }}</text>
              <text class="feature-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>

        <view class="quick-actions">
          <view v-for="item in quickActions" :key="item.title" class="quick-action">
            <view class="quick-action-icon-box">
              <text class="material-symbols-outlined quick-action-icon">{{ item.icon }}</text>
            </view>
            <text class="quick-action-title">{{ item.title }}</text>
          </view>
        </view>

        <view class="recruit-card">
          <image
            class="recruit-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHtTnKPjjdsN6TJqVJtsj5RNpVoSSY_-d_cqKJFizMXdRWoP95bqqJUBE_pOMiKk6wkU_tCQ9RdK5974lzcDgyvS1S_lUNPqAupb1ClIerPsSjXz-SFjw_xTTn0nsxd0zfQ3CNQCixqF93pz2lPvx_J2feG2hfvqGaKm5Cof68qwnBOpEYD2uS-q1Yayn98x9ZVCNvbzLLXoT6-FwRg8EakGWN3C9sLV6V9XPDpGib1ioJU4HbNI5vUN_GQgQbHAUD3Vp4rRj74Ck"
            mode="aspectFill"
          />
          <view class="recruit-mask"></view>
          <view class="recruit-copy">
            <text class="recruit-badge">招聘中</text>
            <text class="recruit-title">加入我们的骑士团</text>
            <text class="recruit-desc">弹性时间，收入丰厚</text>
            <button class="recruit-button">立即申请</button>
          </view>
        </view>

        <view class="menu-list">
          <view v-for="item in menuItems" :key="item.title" class="menu-item">
            <view class="menu-item-left">
              <view class="menu-icon-box">
                <text class="material-symbols-outlined menu-icon">{{ item.icon }}</text>
              </view>
              <text class="menu-title">{{ item.title }}</text>
            </view>
            <text class="material-symbols-outlined menu-arrow">chevron_right</text>
          </view>
        </view>
      </view>
    </view>

    <view class="tab-bar bg-glass">
      <view class="tab-item" @click="switchTab('/pages/index/index')">
        <view class="tab-icon-box">
          <text class="material-symbols-outlined tab-icon">calendar_month</text>
        </view>
        <text class="tab-text">预约</text>
      </view>

      <view class="tab-item" @click="switchTab('/pages/order/order')">
        <view class="tab-icon-box">
          <text class="material-symbols-outlined tab-icon">receipt_long</text>
        </view>
        <text class="tab-text">订单</text>
      </view>

      <view class="tab-item tab-item-active" @click="switchTab('/pages/mine/mine')">
        <view class="tab-icon-box tab-icon-box-active">
          <text class="material-symbols-outlined tab-icon">person</text>
        </view>
        <text class="tab-text tab-text-active">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { onShow } from '@dcloudio/uni-app';

const USER_STORAGE_KEY = 'urban_architect_user_profile';
const defaultAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80';
const defaultNickName = '微信用户';

const defaultProfile = {
  nickName: defaultNickName,
  avatarUrl: defaultAvatar,
  memberLabel: '高级会员 . 城市规划师',
  userId: '8829-ARCH-01',
  balance: '¥12,840.45',
  couponCount: '4 张',
  couponHint: '最近到期: 3天后',
  points: '2,450',
  loginCode: '',
};

const isLoggedIn = ref(false);
const profile = ref({ ...defaultProfile });

const featureCards = [
  {
    title: '我的钱包',
    desc: '查看余额与权益',
    icon: 'account_balance_wallet',
  },
  {
    title: '常用地址',
    desc: '管理下单地址',
    icon: 'location_on',
  },
];

const quickActions = [
  {
    title: '客户服务',
    icon: 'support_agent',
  },
  {
    title: '通用设置',
    icon: 'settings',
  },
];

const menuItems = [
  {
    title: '法律协议与隐私政策',
    icon: 'shield',
  },
  {
    title: '关于 UrbanConcierge',
    icon: 'help',
  },
];

const loggedMenuItems = [
  {
    title: '系统设置',
    desc: '偏好、隐私与安全',
    icon: 'settings',
  },
  {
    title: '地址管理',
    desc: '3 个常用服务点',
    icon: 'location_on',
  },
  {
    title: '在线客服',
    desc: '24/7 专属管家',
    icon: 'support_agent',
  },
  {
    title: '协议规则',
    desc: '服务条款与政策',
    icon: 'description',
  },
];

const loadUserProfile = () => {
  const cached = uni.getStorageSync(USER_STORAGE_KEY);
  if (cached && typeof cached === 'object' && cached.nickName) {
    profile.value = {
      ...defaultProfile,
      ...cached,
      avatarUrl: cached.avatarUrl || defaultAvatar,
    };
    isLoggedIn.value = true;
    return;
  }

  profile.value = { ...defaultProfile };
  isLoggedIn.value = false;
};

const persistUserProfile = (data) => {
  profile.value = {
    ...defaultProfile,
    ...data,
    avatarUrl: data.avatarUrl || defaultAvatar,
  };
  uni.setStorageSync(USER_STORAGE_KEY, profile.value);
  isLoggedIn.value = true;
};

const handleWechatLogin = () => {
  // #ifndef MP-WEIXIN
  uni.showToast({
    title: '请在微信小程序中进行授权登录',
    icon: 'none',
  });
  // #endif

  // #ifdef MP-WEIXIN
  uni.showLoading({ title: '登录中...' });
  uni.getUserProfile({
    desc: '用于完善会员资料并同步头像昵称',
    success: (profileRes) => {
      const currentUser = profileRes.userInfo || {};
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          uni.hideLoading();
          persistUserProfile({
            nickName: currentUser.nickName || defaultNickName,
            avatarUrl: currentUser.avatarUrl || defaultAvatar,
            memberLabel: defaultProfile.memberLabel,
            userId: defaultProfile.userId,
            balance: defaultProfile.balance,
            couponCount: defaultProfile.couponCount,
            couponHint: defaultProfile.couponHint,
            points: defaultProfile.points,
            loginCode: loginRes.code || '',
          });
          uni.showToast({
            title: '登录成功',
            icon: 'success',
          });
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            title: '微信登录失败',
            icon: 'none',
          });
        },
      });
    },
    fail: () => {
      uni.hideLoading();
      uni.showToast({
        title: '您已取消授权',
        icon: 'none',
      });
    },
  });
  // #endif
};

const logout = () => {
  uni.removeStorageSync(USER_STORAGE_KEY);
  loadUserProfile();
  uni.showToast({
    title: '已退出登录',
    icon: 'none',
  });
};

onMounted(() => {
  uni.hideTabBar();
  loadUserProfile();
});

onShow(() => {
  loadUserProfile();
});

const switchTab = (url) => {
  uni.switchTab({ url });
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
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  background: rgba(242, 243, 245, 0.84);
}

.logged-top-bar {
  padding-right: 24px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon,
.top-leading-icon {
  font-size: 24px;
  color: #2550d9;
  font-variation-settings: 'FILL' 1;
}

.top-leading-icon {
  font-size: 22px;
}

.brand-name {
  font-size: 18px;
  font-weight: 800;
  color: #2550d9;
  letter-spacing: -0.035em;
}

.logged-brand-name {
  font-size: 15px;
}

.notice-icon {
  font-size: 22px;
  color: #6b7a96;
  font-variation-settings: 'FILL' 1;
}

.top-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 14px rgba(25, 28, 30, 0.08);
}

.content {
  padding: 14px 22px calc(130px + env(safe-area-inset-bottom));
}

.logged-content {
  padding-top: 8px;
}

.profile-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.profile-page-title {
  display: block;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #1d1f25;
}

.profile-member-row {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-member-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4b6fd8;
}

.profile-member-text {
  font-size: 11px;
  color: #616673;
}

.profile-hero-side {
  padding-top: 2px;
}

.profile-qr-box {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: #dfe4fb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-qr-icon {
  font-size: 22px;
  color: #2550d9;
  font-variation-settings: 'FILL' 1;
}

.profile-card {
  position: relative;
  overflow: hidden;
  min-height: 114px;
  border-radius: 22px;
  background: #f7f7f8;
  display: flex;
  align-items: center;
  padding: 16px 18px;
}

.profile-card-deco {
  position: absolute;
  top: -34px;
  right: -16px;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: rgba(228, 233, 250, 0.95);
}

.profile-card-avatar {
  position: relative;
  z-index: 2;
  width: 68px;
  height: 68px;
  border-radius: 18px;
  margin-right: 14px;
}

.profile-card-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.profile-card-name {
  display: block;
  font-size: 17px;
  font-weight: 800;
  color: #1d2027;
}

.profile-card-id {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: #737888;
}

.profile-badge-row {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.profile-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
}

.profile-badge-primary {
  background: #dfe5ff;
  color: #2b55db;
}

.profile-badge-warm {
  background: #f5ddcf;
  color: #9f5f3f;
}

.asset-grid {
  margin-top: 28px;
  display: flex;
  gap: 14px;
}

.balance-card {
  position: relative;
  overflow: hidden;
  width: 140px;
  min-height: 140px;
  border-radius: 24px;
  background: linear-gradient(180deg, #1543c4 0%, #0f39b7 100%);
  padding: 16px 16px 14px;
}

.asset-label {
  display: block;
  font-size: 10px;
  color: rgba(219, 229, 255, 0.92);
}

.balance-value {
  display: block;
  margin-top: 16px;
  font-size: 24px;
  line-height: 1.1;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.05em;
}

.balance-button {
  position: absolute;
  left: 16px;
  bottom: 14px;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
}

.balance-button-text {
  font-size: 11px;
  font-weight: 700;
  color: #e8eeff;
}

.balance-button-icon {
  margin-left: 4px;
  font-size: 14px;
  color: #e8eeff;
}

.balance-bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(111, 146, 255, 0.2);
}

.balance-bubble-one {
  right: 18px;
  bottom: 20px;
  width: 16px;
  height: 16px;
}

.balance-bubble-two {
  right: -8px;
  bottom: -8px;
  width: 52px;
  height: 52px;
}

.asset-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.benefit-card {
  min-height: 63px;
  border-radius: 22px;
  background: #f6f6f7;
  padding: 14px 16px;
}

.points-card {
  background: #dfe4fb;
}

.benefit-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.benefit-icon {
  font-size: 18px;
  color: #3752b8;
  font-variation-settings: 'FILL' 1;
}

.benefit-pill {
  min-width: 34px;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: #0f47c8;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  line-height: 20px;
  text-align: center;
}

.benefit-title {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 800;
  color: #23262d;
}

.benefit-desc {
  display: block;
  margin-top: 4px;
  font-size: 10px;
  color: #666b79;
}

.service-section {
  margin-top: 34px;
}

.service-section-title {
  display: block;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #727785;
}

.service-panel {
  border-radius: 28px;
  background: #f7f7f8;
  padding: 10px 0;
}

.service-item {
  min-height: 70px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.service-item-left {
  display: flex;
  align-items: center;
}

.service-item-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: #eff2f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-item-icon {
  font-size: 20px;
  color: #1747d1;
  font-variation-settings: 'FILL' 1;
}

.service-item-copy {
  margin-left: 14px;
}

.service-item-title {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #1f2229;
}

.service-item-desc {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: #6b707e;
}

.service-item-arrow {
  font-size: 22px;
  color: #c2c7d2;
}

.logout-wrap {
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 10px;
}

.logout-icon,
.logout-text {
  color: #e00000;
}

.logout-icon {
  font-size: 18px;
  font-variation-settings: 'FILL' 1;
}

.logout-text {
  font-size: 13px;
  font-weight: 700;
}

.login-card {
  position: relative;
  overflow: hidden;
  min-height: 132px;
  border-radius: 26px;
  background: linear-gradient(135deg, #2e59e7 0%, #234ad8 100%);
  padding: 22px 24px;
}

.login-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(26px);
  opacity: 0.16;
}

.login-glow-right {
  right: -28px;
  top: -22px;
  width: 130px;
  height: 130px;
  background: #7ca0ff;
}

.login-glow-left {
  left: -42px;
  bottom: -34px;
  width: 120px;
  height: 120px;
  background: #ffffff;
}

.login-main {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 88px;
}

.avatar-shell {
  width: 78px;
  height: 78px;
  flex-shrink: 0;
}

.avatar-ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(180deg, #f6f8fc 0%, #d7dde8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(19, 35, 95, 0.16);
}

.avatar-core {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: linear-gradient(180deg, #edf1f6 0%, #dbe1ea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 42px;
  color: #b8c1cf;
  font-variation-settings: 'FILL' 1;
}

.login-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.login-title {
  display: block;
  color: #ffffff;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.035em;
}

.login-subtitle {
  display: block;
  color: rgba(222, 230, 255, 0.9);
  font-size: 12px;
  line-height: 1.5;
  font-weight: 500;
}

.feature-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.feature-card {
  min-height: 176px;
  border-radius: 24px;
  background: #f7f7f8;
  padding: 22px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.feature-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #eef1f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon {
  font-size: 21px;
  color: #1d47d8;
  font-variation-settings: 'FILL' 1;
}

.feature-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-title {
  display: block;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 800;
  color: #1c1f24;
}

.feature-desc {
  display: block;
  font-size: 12px;
  line-height: 1.5;
  color: #626776;
}

.quick-actions {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.quick-action {
  min-height: 62px;
  border-radius: 20px;
  background: #f1f2f4;
  display: flex;
  align-items: center;
  padding: 0 18px;
}

.quick-action-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 13px;
  background: #f7f7f8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.quick-action-icon {
  font-size: 20px;
  color: #5c6982;
  font-variation-settings: 'FILL' 1;
}

.quick-action-title {
  font-size: 14px;
  font-weight: 800;
  color: #24272e;
}

.recruit-card {
  position: relative;
  margin-top: 28px;
  min-height: 166px;
  border-radius: 26px;
  overflow: hidden;
  background: linear-gradient(90deg, #111214 0%, #202631 100%);
}

.recruit-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.34;
  transform: scale(1.18);
  transform-origin: right center;
}

.recruit-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(12, 13, 16, 0.96) 0%,
    rgba(20, 24, 31, 0.86) 48%,
    rgba(24, 29, 38, 0.16) 100%
  );
}

.recruit-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 0 0 34px;
}

.recruit-badge {
  display: block;
  color: #dbe2ff;
  font-size: 12px;
  line-height: 1.3;
  font-weight: 700;
}

.recruit-title {
  display: block;
  margin-top: 10px;
  color: #ffffff;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.recruit-desc {
  display: block;
  margin-top: 10px;
  color: rgba(233, 236, 245, 0.68);
  font-size: 12px;
  line-height: 1.5;
}

.recruit-button {
  margin-top: 18px;
  margin-left: 0;
  height: 42px;
  padding: 0 24px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(180deg, #1d4add 0%, #0f3fce 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  line-height: 42px;
}

.menu-list {
  margin-top: 46px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.menu-item {
  min-height: 60px;
  border-radius: 18px;
  background: #f7f7f8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px 0 18px;
}

.menu-item-left {
  display: flex;
  align-items: center;
  min-width: 0;
}

.menu-icon-box {
  width: 30px;
  height: 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 21px;
  color: #6d86d8;
  font-variation-settings: 'FILL' 1;
}

.menu-title {
  margin-left: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #2b2e35;
}

.menu-arrow {
  font-size: 22px;
  color: #c2c6d3;
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
  font-size: 22px;
  color: #9ca5b7;
  font-variation-settings: 'FILL' 1;
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
