// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const axiosInstance = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // REQUEST INTERCEPTOR
// axiosInstance.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync("accessToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // RESPONSE INTERCEPTOR (auto-refresh)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Only refresh if token expired (401)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshToken = await SecureStore.getItemAsync("refreshToken");

//       if (!refreshToken) {
//         return Promise.reject(error);
//       }

//       try {
//         const response = await axios.post(
//           `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`,
//           { refreshToken }
//         );

//         const newAccessToken = response.data.accessToken;

//         // Save new access token
//         await SecureStore.setItemAsync("accessToken", newAccessToken);

//         // Update header and retry request
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import { triggerLogout } from "@/services/auth/authEvents";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// REQUEST INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (!refreshToken) return Promise.reject(error);

      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        await SecureStore.setItemAsync("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 🔥 Explicit force logout
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");

        triggerLogout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
