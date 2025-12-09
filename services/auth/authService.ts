import { ForgotPasswordType, LoginType } from "@/types/authType";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL!;

// LOGIN  REQUEST
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: LoginType }) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/login`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Login successfully! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// SIGNUP  REQUEST
export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/register`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Register successfully! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// VERIFY EMAIL  REQUEST
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
        const response = await axios.post(
          `${baseUrl}/auth/verify-email`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Email verified successfully! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// RESEND OTP CODE  REQUEST
export const useResendOPT = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
        const response = await axios.post(
          `${baseUrl}/auth/resend-verification`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("OTP resent successfully! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// RESET PASSWORD REQUEST
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
        const response = await axios.put(
          `${baseUrl}/auth/reset-password`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Reset Password successfully! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// Forgot Password Request
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordType) => {
      try {
        const response = await axios.post(
          `${baseUrl}/auth/forgot-password`,
          payload
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Reset Password Email Sent! 🎉");
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
