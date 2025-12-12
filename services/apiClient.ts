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



// services/apiClient.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router"; // global router (no hook)
import * as Updates from "expo-updates";
import Toast from "react-native-toast-message";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Helper to force logout: clear tokens, optionally navigate back to auth, reload as fallback
async function forceLogoutAndRedirect(message?: string) {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  } catch (e) {
    // ignore storage errors, but log
    // console.warn("Failed to delete tokens", e);
  }

  if (message) {
    Toast.show({
      type: "info",
      text1: "Session expired",
      text2: message,
    });
  }

  // Try to navigate to auth screen using expo-router
  try {
    // Adjust the route path below if your login screen path differs.
    // Common choices: '/(auth)', '/auth', '/login', '/auth/login'
    router.replace("/(auth)/login-screen"); // replace so user can't go back
    return;
  } catch (e) {
    // router might not be ready (rare). Fall back to reloading the app so initial routing shows the auth screen.
    try {
      await Updates.reloadAsync();
      return;
    } catch (reloadErr) {
      // last-ditch: nothing we can do; just reject
      // console.error("Failed to reload app", reloadErr);
    }
  }
}

// REQUEST INTERCEPTOR - attach access token if present
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      // ensure headers object exists
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore storage read error
  }
  return config;
});

// RESPONSE INTERCEPTOR (auto-refresh + redirect on failure)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If there is no response (network error), just propagate it
    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // If 401 and not already retried, try to refresh
    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        // If there's no refresh token, force logout & redirect
        if (!refreshToken) {
          await forceLogoutAndRedirect("Please login again.");
          return Promise.reject(error);
        }

        // Request a new access token using a plain axios (not axiosInstance) to avoid interceptor loop
        const refreshResponse = await axios.post(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = refreshResponse.data?.accessToken;
        if (!newAccessToken) {
          // refresh endpoint didn't return token -> logout
          await forceLogoutAndRedirect("Please login again.");
          return Promise.reject(error);
        }

        // Save new token and retry original request with new header
        await SecureStore.setItemAsync("accessToken", newAccessToken);

        // update header on original request and retry via axiosInstance
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed (expired refresh token, server responded bad, etc) -> force logout + redirect
        await forceLogoutAndRedirect("Session has expired. Please sign in again.");
        return Promise.reject(refreshError);
      }
    }

    // For other statuses, just forward the error
    return Promise.reject(error);
  }
);

export default axiosInstance;

