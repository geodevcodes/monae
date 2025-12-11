import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import api from "../apiClient";

// =========================
// GET USER PROFILE
// =========================
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get(`/users/user-profile`);
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
      const response = await api.put(`/users/update-user`, payload);
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
      const response = await api.delete(`/users/delete-user`);
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
      const response = await api.patch(`/user/change-password`, payload);
      return response.data;
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
