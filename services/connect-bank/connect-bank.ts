import axiosInstance from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

// CONNECT BANK REQUEST
export const useConnectBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (code: string) => {
      const response = await axiosInstance.post(`/mono/exchange`, { code });
      return response.data;
    },
    retry: false,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Mono Connected successfully! 🎉",
      });
      queryClient.invalidateQueries({ queryKey: ["Mono"] });
    },

    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to connect bank",
      });
    },
  });
};
