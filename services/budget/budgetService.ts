import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { toast } from "sonner";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL!;

// CREATE BUDGET REQUEST
export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  const token = getItemAsync("token");
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      try {
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
      toast.success("Budget created successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["budget-list"] });
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

// UPDATE BUDGET REQUEST
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  const token = getItemAsync("token");
  return useMutation({
    mutationFn: async ({
      payload,
      budgetId,
    }: {
      payload: any;
      budgetId: string;
    }) => {
      try {
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
      toast.success("Budget updated successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["budget-list"] });
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

// GET BUDGET BY ID REQUEST
export const useGetBudget = (budgetId: string) => {
  const token = getItemAsync("token");
  return useQuery({
    queryKey: ["budget", budgetId],
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseUrl}/budgets/${budgetId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    enabled: !!budgetId,
  });
};

// GET ALL BUDGET
export const useGetBudgets = (skip?: number, search = "") => {
  const token = getItemAsync("token");
  return useQuery({
    queryKey: ["budget-list", skip, search],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();

        if (skip) params.append("skip", String(skip));
        if (search.trim()) params.append("search", search);

        const queryString = params.toString() ? `?${params.toString()}` : "";
        const response = await axios.get(`${baseUrl}/budgets${queryString}`);
        return response.data.data;
      } catch (error: any) {
        throw error;
      }
    },
  });
};

// DELETE BUDGET REQUEST
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  const token = getItemAsync("token");
  return useMutation({
    mutationFn: async (budgetId: string) => {
      try {
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
      toast.success("Budget deleted successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["budget-list"] });
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
