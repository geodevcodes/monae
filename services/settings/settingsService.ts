import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import Toast from "react-native-toast-message";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL!;

// =========================
// GET USER PROFILE
// =========================
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const token = await getItemAsync("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const response = await axios.get(`${baseUrl}/users/user-profile`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};

// =========================
// UPDATE USER PROFILE
// =========================
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const token = await getItemAsync("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const response = await axios.put(
        `${baseUrl}/users/update-user`,
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully 🎉",
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
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

// =========================
// DELETE USER PROFILE
// =========================
export const useDeleteUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const token = await getItemAsync("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const response = await axios.delete(`${baseUrl}/users/delete-user`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Account deleted successfully 🎉",
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
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

// CHANGEPASSWORD REQUEST
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
        const response = await axios.patch(
          `${baseUrl}/user/change-password`,
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
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password updated successfully! 🎉",
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
