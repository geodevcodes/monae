import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import Toast from "react-native-toast-message";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL!;

// FILES UPLOAD REQUESTS
export const useFilesUploadRequest = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const token = await getItemAsync("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const response = await axios.post(
        `${baseUrl}/files-upload/file`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "An error occurred",
      });
    },
  });
};
