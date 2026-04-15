<template>
  <view class="app-container">
    <!-- TopAppBar -->
    <view class="top-nav-bar">
      <view class="nav-left">
        <text class="material-symbols-outlined nav-icon">menu</text>
        <text class="nav-title">Urban Architect</text>
      </view>
      <view class="nav-right">
        <view class="nav-links">
          <navigator class="nav-link active" url="#">首页</navigator>
          <navigator class="nav-link" url="#">服务</navigator>
          <navigator class="nav-link" url="#">关于</navigator>
        </view>
        <view class="user-avatar-container">
          <image class="user-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sve-wEPYIXTF7DfqPPa6qc_CVthX1AD85b2vPbjr_EeY6f30aVJSLvhl4yEjvTjT-kL3t6197LbZxDwUEYuNhbExJB29v5Q77_Ikt6pUDc5nxWLtASOOEnk5a3hsiv7BjeIGZGz5-RnSv5gHwu-v6cAnIdgfLqFqKmEG04aAkkSiR3gepSn6x_o0azAZjf4Ylad6CuDvEYp1d0ehXnaR5SyTQhUXlM_CA0DfpjAADEqk1Ojti5mM0zvp4E2_JokO0kNniTqJfyQ" mode="aspectFill" />
        </view>
      </view>
    </view>
    <view class="main-content">
      <!-- Hero Search Section -->
      <view class="hero-section">
        <view class="hero-title">
          欢迎回来，<text class="text-primary">张先生</text>
        </view>
        <view class="hero-subtitle">
          您的城市生活建筑师。无论买、送、办，我们随时待命。
        </view>
        <view class="search-container">
          <view class="search-icon-wrapper">
            <text class="material-symbols-outlined search-icon">search</text>
          </view>
          <input class="search-input" placeholder="搜寻附近的服务或快递员..." type="text" />
        </view>
      </view>
      <!-- 2x2 Bento Grid Services -->
      <view class="services-grid">
        <!-- 帮我买 -->
        <view class="service-card card-buy">
          <view class="service-icon-wrapper icon-buy">
            <text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shopping_bag</text>
          </view>
          <view class="service-title">帮我买</view>
          <view class="service-desc">餐饮、生鲜、药品<br />30分钟送达</view>
          <view class="service-bg-icon">
            <text class="material-symbols-outlined">shopping_cart</text>
          </view>
        </view>
        <!-- 帮我送 -->
        <view class="service-card card-send">
          <view class="service-icon-wrapper icon-send">
            <text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">local_shipping</text>
          </view>
          <view class="service-title">帮我送</view>
          <view class="service-desc">急件、鲜花、蛋糕<br />全城专人直送</view>
          <view class="service-bg-icon">
            <text class="material-symbols-outlined">package_2</text>
          </view>
        </view>
        <!-- 帮我办 -->
        <view class="service-card card-do">
          <view class="service-icon-wrapper icon-do">
            <text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">assignment</text>
          </view>
          <view class="service-title">帮我办</view>
          <view class="service-desc">排队、挂号、代取<br />节省您的每一分钟</view>
          <view class="service-bg-icon">
            <text class="material-symbols-outlined">task</text>
          </view>
        </view>
        <!-- 万能帮 -->
        <view class="service-card card-all">
          <view class="service-icon-wrapper icon-all">
            <text class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</text>
          </view>
          <view class="service-title text-white">万能帮</view>
          <view class="service-desc text-light">各种个性化需求<br />只有想不到，没有做不到</view>
          <view class="service-bg-icon opacity-high">
            <text class="material-symbols-outlined text-white">magic_button</text>
          </view>
        </view>
      </view>
      <view class="content-grid">
        <!-- Quick Order Section -->
        <view class="quick-order-section">
          <view class="section-header">
            <text class="section-title">快速预约</text>
            <button class="history-btn">
              历史地址 <text class="material-symbols-outlined icon-small">history</text>
            </button>
          </view>
          <view class="order-card">
            <view class="address-grid">
              <view class="address-item">
                <text class="address-label">取货地址</text>
                <view class="address-input-wrapper">
                  <text class="material-symbols-outlined icon-primary">location_on</text>
                  <input class="address-input" type="text" value="北京市朝阳区三里屯SOHO 5号楼" />
                </view>
              </view>
              <view class="address-item">
                <text class="address-label">收货地址</text>
                <view class="address-input-wrapper">
                  <text class="material-symbols-outlined icon-tertiary">near_me</text>
                  <input class="address-input" placeholder="输入收货地址..." type="text" />
                </view>
              </view>
            </view>
            <view class="tags-container">
              <text class="tag">手机数码</text>
              <text class="tag">文件合同</text>
              <text class="tag">钥匙配饰</text>
              <text class="tag">+ 自定义物品</text>
            </view>
            <button class="submit-btn">
              立即呼叫服务
            </button>
          </view>
        </view>
        <!-- Nearby Couriers -->
        <view class="nearby-section">
          <view class="section-header">
            <text class="section-title">附近跑男</text>
            <text class="online-badge">12人在线</text>
          </view>
          <view class="courier-list">
            <!-- Courier 1 -->
            <view class="courier-item">
              <view class="courier-avatar-wrapper">
                <image class="courier-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9s1Q218GYts49tw3dJdDAKx_WFhr3j0PrdPyFp6BytJmk3GosTQJpd1I2l_-gBm_BXSqXp-zlt8WBBI95tZqlW4-o7aEPnjqRhwkjAO0wTeH44IkWPK8NsQd1bYaCfMns92TCbuCVSbdCrrHcdO6Kr9KmY8CiI55DooLTNPTb1PX2bPSCblUp2JydgsELXMspLNj4_n9pdLbWaP3N1TbbyeFCeQ0MOvkMhm8fH3hF6chby3u4bWP4zur-kKg5qi9wWS56QAAOtis" mode="aspectFill" />
                <view class="online-status"></view>
              </view>
              <view class="courier-info">
                <view class="courier-header">
                  <text class="courier-name">王师傅</text>
                  <view class="courier-rating">
                    <text class="material-symbols-outlined rating-icon" style="font-variation-settings: 'FILL' 1;">star</text>
                    <text class="rating-value">4.9</text>
                  </view>
                </view>
                <view class="courier-stats">距离 500m | 已接 2.4k 单</view>
                <view class="courier-tags">
                  <text class="c-tag">准时达</text>
                  <text class="c-tag">好评如潮</text>
                </view>
              </view>
            </view>
            <!-- Courier 2 -->
            <view class="courier-item">
              <view class="courier-avatar-wrapper">
                <image class="courier-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwY8seJM0qJvyBT-hjf1syEYderUuCTXD90H_cqEizaCs0kuv7UU4cF3YF1ltllN5ttjClcNLcrF-mjAav9Z-vE5Sg7HFUOrOK2KXrYp7b7O5h3hh2ZnAK_Nu8XM4VADohpQQzvOusL0q94tx9hO75CAEfyCIxSGVZP0LEriUl-nHWRRIl05Vucd1obVeQyZUgPWU94RMCiSXsikDiPwQoAbD0ACZzKW7uxfmMyENYJuOg2s35dZvUxmKtvDfsT7wS-0syMZ2XRE" mode="aspectFill" />
                <view class="online-status"></view>
              </view>
              <view class="courier-info">
                <view class="courier-header">
                  <text class="courier-name">李师傅</text>
                  <view class="courier-rating">
                    <text class="material-symbols-outlined rating-icon" style="font-variation-settings: 'FILL' 1;">star</text>
                    <text class="rating-value">4.8</text>
                  </view>
                </view>
                <view class="courier-stats">距离 1.2km | 已接 1.8k 单</view>
                <view class="courier-tags">
                  <text class="c-tag">熟路</text>
                  <text class="c-tag">服务周到</text>
                </view>
              </view>
            </view>
            <!-- Courier 3 -->
            <view class="courier-item">
              <view class="courier-avatar-wrapper">
                <image class="courier-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2uBZreSE4H06taWABfExdDNB8CD8dsOLHAtTKT8L7gtoqGub5jNm7PmBbPMrSbja2mTWbNtA_m8FT-IG8krCDpg0iEBZ9Fqzsh_0Vt2ICzO1VqBiDwE0PDzHEszjJwXrmei8X6jE6Acv7FdI7wRkElMrEORq9xvSboaX7tk02-ZmmN5aHRA09POGDf-qgklynI-rsEyig0lLD28Cwg9rIyH2-RIY6EWcc1w7_tEPRynyU6_zhgkwMM9TBNDTnYj92ZGTSFZevdSE" mode="aspectFill" />
                <view class="online-status"></view>
              </view>
              <view class="courier-info">
                <view class="courier-header">
                  <text class="courier-name">赵师傅</text>
                  <view class="courier-rating">
                    <text class="material-symbols-outlined rating-icon" style="font-variation-settings: 'FILL' 1;">star</text>
                    <text class="rating-value">5.0</text>
                  </view>
                </view>
                <view class="courier-stats">距离 2.1km | 已接 3.2k 单</view>
                <view class="courier-tags">
                  <text class="c-tag">金牌服务</text>
                </view>
              </view>
            </view>
          </view>
          <button class="view-map-btn">
            查看地图上的人员
          </button>
        </view>
      </view>
      <!-- Latest Status Floating Section -->
      <view class="status-floating-section">
        <view class="status-left">
          <view class="status-orb"></view>
          <view class="status-text">
            <view class="status-title">最近订单正在配送中</view>
            <view class="status-desc">文件快递 • 预计 14:35 送达</view>
          </view>
        </view>
        <button class="track-btn">
          追踪位置
        </button>
      </view>
    </view>

    <!-- BottomNavBar -->
    <view class="bottom-nav-bar">
      <view @click="switchTab('/pages/index/index')" class="tab-item active">
        <text class="material-symbols-outlined tab-icon" style="font-variation-settings: 'FILL' 1;">calendar_today</text>
        <text class="tab-text">预约</text>
      </view>
      <view @click="switchTab('/pages/order/order')" class="tab-item">
        <text class="material-symbols-outlined tab-icon">receipt_long</text>
        <text class="tab-text">订单</text>
      </view>
      <view @click="switchTab('/pages/mine/mine')" class="tab-item">
        <text class="material-symbols-outlined tab-icon">person</text>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  uni.hideTabBar();
});

const switchTab = (url) => {
  uni.switchTab({ url });
};
</script>

<style scoped>
.app-container {
  background-color: #f7f9fb;
  color: #191c1e;
  min-height: 100vh;
  position: relative;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Top Navigation */
.top-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background-color: rgba(247, 249, 251, 0.8);
  backdrop-filter: blur(24px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  box-sizing: border-box;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-icon {
  color: #0037b0;
}

.nav-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #0037b0;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-links {
  display: none;
}
@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 24px;
    margin-right: 24px;
  }
}

.nav-link {
  color: #434655;
  font-weight: 600;
  transition: opacity 0.3s;
}
.nav-link.active {
  color: #0037b0;
}
.nav-link:hover {
  opacity: 0.8;
}

.user-avatar-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #dce1ff;
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main Content */
.main-content {
  padding-top: 96px;
  padding-bottom: 128px;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 1280px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  margin-bottom: 40px;
}

.hero-title {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #191c1e;
  margin-bottom: 16px;
}
@media (min-width: 768px) {
  .hero-title { font-size: 48px; }
}

.text-primary {
  color: #0037b0;
}

.hero-subtitle {
  color: #434655;
  font-size: 18px;
  max-width: 42rem;
  margin-bottom: 32px;
}

.search-container {
  position: relative;
  max-width: 48rem;
}

.search-icon-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.search-icon {
  color: #0037b0;
}

.search-input {
  width: 100%;
  background-color: #e6e8ea;
  border: none;
  border-radius: 16px;
  padding: 20px 24px 20px 56px;
  color: #191c1e;
  transition: all 0.3s;
  box-sizing: border-box;
}
.search-input:focus {
  outline: 2px solid rgba(0, 55, 176, 0.2);
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

.service-card {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  padding: 24px;
  transition: all 0.3s;
  cursor: pointer;
}
.service-card:hover {
  transform: translateY(-2px);
}

.card-buy, .card-send, .card-do {
  background-color: #f2f4f6;
}
.card-buy:hover, .card-send:hover, .card-do:hover {
  background-color: #ffffff;
  box-shadow: 0 20px 25px -5px rgba(0, 55, 176, 0.05), 0 8px 10px -6px rgba(0, 55, 176, 0.05);
}

.card-all {
  background-color: #1d4ed8;
}
.card-all:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 55, 176, 0.2), 0 8px 10px -6px rgba(0, 55, 176, 0.2);
}

.service-icon-wrapper {
  margin-bottom: 32px;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-buy { background-color: #dce1ff; color: #0037b0; }
.icon-send { background-color: #b0befe; color: #3d4c83; }
.icon-do { background-color: #ffdbcf; color: #7f2500; }
.icon-all { background-color: #cad3ff; color: #1d4ed8; }

.service-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.service-desc {
  font-size: 14px;
  color: #434655;
  line-height: 1.625;
}

.text-white { color: #ffffff; }
.text-light { color: #cad3ff; }

.service-bg-icon {
  position: absolute;
  right: -16px;
  bottom: -16px;
  opacity: 0.1;
  transition: opacity 0.3s;
}
.service-card:hover .service-bg-icon { opacity: 0.2; }
.opacity-high { opacity: 0.2; }
.service-card:hover .opacity-high { opacity: 0.3; }

.service-bg-icon .material-symbols-outlined {
  font-size: 120px;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .quick-order-section {
    grid-column: span 2 / span 2;
  }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.history-btn {
  color: #0037b0;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  line-height: 1;
}
.icon-small { font-size: 14px; }

.order-card {
  background-color: #ffffff;
  border-radius: 32px;
  padding: 32px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(196, 197, 215, 0.1);
}

.address-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 768px) {
  .address-grid { grid-template-columns: repeat(2, 1fr); }
}

.address-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.address-label {
  font-size: 14px;
  font-weight: 700;
  color: #434655;
  margin-left: 4px;
}

.address-input-wrapper {
  display: flex;
  align-items: center;
  background-color: #eceef0;
  border-radius: 16px;
  padding: 16px;
}

.icon-primary { color: #0037b0; margin-right: 12px; }
.icon-tertiary { color: #7f2500; margin-right: 12px; }

.address-input {
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
}
.address-input:focus { outline: none; }

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.tag {
  padding: 8px 16px;
  background-color: #e6e8ea;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  color: #434655;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.tag:hover {
  background-color: #dce1ff;
  color: #0037b0;
}

.submit-btn {
  width: 100%;
  background-color: #0037b0;
  margin-top: 24px;
  padding: 20px;
  border-radius: 16px;
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
  border: none;
  transition: all 0.3s;
}
.submit-btn:hover { background-color: #1d4ed8; }
.submit-btn:active { transform: scale(0.98); }

/* Nearby Section */
.nearby-section {
  margin-top: 32px;
}
@media (min-width: 1024px) {
  .nearby-section { margin-top: 0; }
}

.online-badge {
  font-size: 12px;
  font-weight: 700;
  color: #434655;
  background-color: #e6e8ea;
  padding: 4px 12px;
  border-radius: 9999px;
}

.courier-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.courier-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #f2f4f6;
  padding: 16px;
  border-radius: 16px;
  transition: background-color 0.3s;
}
.courier-item:hover { background-color: #e6e8ea; }

.courier-avatar-wrapper {
  position: relative;
}

.courier-avatar {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  background-color: #22c55e;
  border: 2px solid #f2f4f6;
  border-radius: 50%;
}

.courier-info {
  flex: 1;
}

.courier-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.courier-name { font-weight: 700; }

.courier-rating {
  display: flex;
  align-items: center;
  color: #0037b0;
}

.rating-icon { font-size: 14px; }
.rating-value { font-size: 12px; font-weight: 700; margin-left: 2px; }

.courier-stats {
  font-size: 12px;
  color: #434655;
  margin-top: 2px;
}

.courier-tags {
  margin-top: 8px;
  display: flex;
  gap: 4px;
}

.c-tag {
  font-size: 10px;
  background-color: #dce1ff;
  color: #001551;
  padding: 2px 8px;
  border-radius: 4px;
}

.view-map-btn {
  width: 100%;
  margin-top: 24px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #c4c5d7;
  color: #434655;
  font-weight: 700;
  font-size: 14px;
  background: transparent;
  transition: background-color 0.3s;
}
.view-map-btn:hover { background-color: #e6e8ea; }

/* Status Floating Section */
.status-floating-section {
  margin-top: 48px;
  background-color: #f2f4f6;
  border-radius: 32px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-orb {
  width: 8px;
  height: 8px;
  background-color: #0037b0;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 55, 176, 0.15);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 55, 176, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(0, 55, 176, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 55, 176, 0); }
}

.status-title { font-size: 14px; font-weight: 700; }
.status-desc { font-size: 12px; color: #434655; }

.track-btn {
  background-color: #dce1ff;
  color: #0037b0;
  font-weight: 700;
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 9999px;
  margin: 0;
  border: none;
  line-height: 1;
}

/* Bottom Navigation */
.bottom-nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px 24px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(40px);
  border-radius: 24px 24px 0 0;
  z-index: 50;
  box-shadow: 0 -4px 40px rgba(25, 28, 30, 0.06);
  border-top: 1px solid rgba(196, 197, 215, 0.15);
  box-sizing: border-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 20px;
  border-radius: 12px;
  transition: all 0.15s;
  color: #434655;
  opacity: 0.6;
}
.tab-item:active { transform: scale(0.9); }
.tab-item:hover { background-color: #f2f4f6; }

.tab-item.active {
  color: #0037b0;
  background-color: #dce1ff;
  opacity: 1;
  border-radius: 16px;
}

.tab-icon { margin-bottom: 4px; }
.tab-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 600; }

button::after {
  border: none;
}
</style>