import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import api from "../apiClient";

// FILES UPLOAD REQUEST
export const useFilesUploadRequest = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      try {
        const response = await api.post(`/files-upload/file`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "File uploaded successfully! 🎉",
      });
    },

    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "An error occurred",
      });
    },
  });
};
