import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL!;

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
      toast.success("Password updated successfully! 🎉");
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

// Get User Profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/profile`);
        return response.data.data;
      } catch (error: any) {
        throw error;
      }
    },
  });
};
