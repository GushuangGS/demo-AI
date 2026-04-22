import { request, USER_PROFILE_STORAGE_KEY, USER_TOKEN_STORAGE_KEY } from './request';

const DEMO_LOGIN_PAYLOAD = {
  phone: '13800138000',
  nickname: '演示用户',
};

export const ensureDemoLogin = async () => {
  const cachedUser = uni.getStorageSync(USER_PROFILE_STORAGE_KEY);
  const cachedToken = uni.getStorageSync(USER_TOKEN_STORAGE_KEY);

  if (cachedUser?.id && cachedToken) {
    return {
      token: cachedToken,
      user: cachedUser,
    };
  }

  const result = await request({
    url: '/auth/login',
    method: 'POST',
    data: DEMO_LOGIN_PAYLOAD,
  });

  uni.setStorageSync(USER_TOKEN_STORAGE_KEY, result.token);
  uni.setStorageSync(USER_PROFILE_STORAGE_KEY, result.user);

  return result;
};
