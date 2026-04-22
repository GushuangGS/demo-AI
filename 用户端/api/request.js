const BASE_URL = 'http://127.0.0.1:3000';

export const USER_TOKEN_STORAGE_KEY = 'urban_architect_token';
export const USER_PROFILE_STORAGE_KEY = 'urban_architect_user';

export const request = ({ url, method = 'GET', data, header = {} }) =>
  new Promise((resolve, reject) => {
    const token = uni.getStorageSync(USER_TOKEN_STORAGE_KEY);

    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...header,
      },
      success: (response) => {
        const { statusCode, data: responseData } = response;

        if (statusCode >= 200 && statusCode < 300) {
          resolve(responseData);
          return;
        }

        reject(responseData);
      },
      fail: reject,
    });
  });
