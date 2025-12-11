import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import api from "../apiClient";

// CREATE BUDGET REQUEST
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const response = await api.post(`/budgets/create-budget`, payload);
      return response.data;
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
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Internal Server Error",
      });
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
      const response = await api.put(`/budgets/${budgetId}`, payload);
      return response.data;
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
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Internal Server Error",
      });
    },
  });
};

// GET BUDGET BY ID REQUEST
export const useGetBudget = (budgetId: string) => {
  return useQuery({
    queryKey: ["budget", budgetId],
    queryFn: async () => {
      const response = await api.get(`/budgets/${budgetId}`);
      return response.data.data;
    },
    enabled: !!budgetId,
  });
};

// GET ALL BUDGET
export const useGetBudgetsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["budget-list"],

    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/budgets`, {
        params: { pageNumber: pageParam, limit: 10 },
      });
      return response.data;
    },

    initialPageParam: 1,

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
      const response = await api.delete(`/budgets/${budgetId}`);
      return response.data;
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
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Internal Server Error",
      });
    },
  });
};
