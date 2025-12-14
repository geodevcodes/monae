import axiosInstance from "@/services/apiClient";
import { saveTokens } from "@/services/auth/saveTokens";
import {
  ForgotPasswordType,
  GoogleLoginType,
  LoginType,
} from "@/types/authType";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

// MANUAL LOGIN  REQUEST
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: LoginType }) => {
      const response = await axiosInstance.post(`/auth/login`, payload);
      return response.data;
    },
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response;
      await saveTokens(accessToken, refreshToken);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful! 🎉",
      });
    },

    onError: (error: any) => {
      const message = error.response?.data?.message;
      if (error.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Internal Server Error",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message ?? "Something went wrong",
        });
      }
    },
  });
};

// GOOGLE LOGIN  REQUEST
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: GoogleLoginType }) => {
      const response = await axiosInstance.post(`/auth/google-login`, payload);
      return response.data;
    },
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response;
      await saveTokens(accessToken, refreshToken);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful! 🎉",
      });
    },

    onError: (error: any) => {
      const message = error.response?.data?.message;
      if (error.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Internal Server Error",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message ?? "Something went wrong",
        });
      }
    },
  });
};

// SIGNUP  REQUEST
export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const response = await axiosInstance.post(`/auth/register`, payload);
      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Register successfully! 🎉",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Internal Server Error",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message,
        });
      }
    },
  });
};

// VERIFY EMAIL  REQUEST
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const response = await axiosInstance.post(`/auth/verify-email`, payload);
      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Email verified successfully! 🎉",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Internal Server Error",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message,
        });
      }
    },
  });
};

// RESEND OTP CODE  REQUEST
export const useResendOPT = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const response = await axiosInstance.post(
        `/auth/resend-verification`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "OTP resent successfully! 🎉",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Internal Server Error",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message,
        });
      }
    },
  });
};

// RESET PASSWORD REQUEST
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const response = await axiosInstance.post(
        `/auth/reset-password`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Reset Password successfully! 🎉",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Internal Server Error",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message,
        });
      }
    },
  });
};

// Forgot Password Request
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordType) => {
      const response = await axiosInstance.post(
        `/auth/forgot-password`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Reset Password Email Sent! 🎉",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Internal Server Error",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message,
        });
      }
    },
  });
};

// LOGOUT REQUEST
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/auth/logout");
    },

    onSuccess: async () => {
      // Clear tokens (single source of truth)
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");

      Toast.show({
        type: "success",
        text1: "Logged Out",
        text2: "You have been logged out successfully.",
      });
    },

    onError: async () => {
      // Even if server fails, force logout locally
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");

      Toast.show({
        type: "error",
        text1: "Session Ended",
        text2: "You have been logged out.",
      });
    },
  });
};
