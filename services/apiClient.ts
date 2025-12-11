import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR (auto-refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only refresh if token expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = response.data.accessToken;

        // Save new access token
        await SecureStore.setItemAsync("accessToken", newAccessToken);

        // Update header and retry request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
