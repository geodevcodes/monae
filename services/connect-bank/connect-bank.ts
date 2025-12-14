import axiosInstance from "@/services/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      queryClient.invalidateQueries({ queryKey: ["connected-banks"] });
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


// GET CONNECTED BANKS
export const useGetConnectedBanks = () => {
  return useQuery({
    queryKey: ["connected-banks"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/mono/banks`);
      return response.data.data;
    },
  });
};


// DELETE CONNECTED BANK
export const useDeleteBank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (accountId: string) => {
      const response = await axiosInstance.delete(`/mono/accounts/${accountId}`);
      return response.data;
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Bank disconnected successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["connected-banks"] });
    },

    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to disconnect bank",
      });
    },
  });
};