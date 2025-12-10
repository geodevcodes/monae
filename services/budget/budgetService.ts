import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import Toast from "react-native-toast-message";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL!;

// CREATE BUDGET REQUEST
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
        const token = await getItemAsync("token");
        const response = await axios.post(
          `${baseUrl}/budgets/create-budget`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
        text2: "Budget created successfully! 🎉",
      });
      queryClient.invalidateQueries({ queryKey: ["budget-list"] });
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
          text2: error.response.data.message,
        });
      }
    },
  });
};

// UPDATE BUDGET REQUEST
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      payload,
      budgetId,
    }: {
      payload: any;
      budgetId: string;
    }) => {
      try {
        const token = await getItemAsync("token");
        const response = await axios.put(
          `${baseUrl}/budgets/${budgetId}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
        text2: "Budget updated successfully! 🎉",
      });
      queryClient.invalidateQueries({ queryKey: ["budget-list"] });
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

// GET BUDGET BY ID REQUEST
export const useGetBudget = (budgetId: string) => {
  return useQuery({
    queryKey: ["budget", budgetId],
    queryFn: async () => {
      try {
        const token = await getItemAsync("token");
        const response = await axios.get(`${baseUrl}/budgets/${budgetId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.data;
      } catch (error: any) {
        throw error;
      }
    },
    enabled: !!budgetId,
  });
};

// GET ALL BUDGET
export const useGetBudgetsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["budget-list"],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const token = await getItemAsync("token");

        const response = await axios.get(`${baseUrl}/budgets`, {
          params: {
            pageNumber: pageParam,
            limit: 10, // adjust if needed
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Failed to load budgets",
          text2: error?.response?.data?.message || "Please try again.",
        });

        throw error;
      }
    },
    initialPageParam: 1,

    // determine the next page
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNextPage) return undefined;
      return lastPage.meta.pageNumber + 1;
    },
    staleTime: 1000 * 60 * 2,
  });
};

// DELETE BUDGET REQUEST
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (budgetId: string) => {
      try {
        const token = await getItemAsync("token");
        const response = await axios.delete(`${baseUrl}/budgets/${budgetId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Budget deleted successfully! 🎉",
      });
      queryClient.invalidateQueries({ queryKey: ["budget-list"] });
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
