import CustomButton from "@/components/CustomButton";
import { budgetData } from "@/lib/data/budgetData";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BudgetDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: budget, isLoading } = useQuery({
    queryKey: ["budget", id],
    queryFn: () => budgetData.find((item) => item.id === id),
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#ff6600" />;
  }

  return (
    <SafeAreaView className="px-5 pt-4 pb-2 bg-white h-full">
      <View className="flex flex-row mt-6">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="max-w-[50px] flex items-start justify-start border border-[#A9AEB7] rounded-lg p-1.5"
        >
          <View className="flex flex-row items-center justify-between gap-3">
            <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
          </View>
        </TouchableOpacity>
        <Text className="text-black font-semibold text-xl ml-32">
          My Budget
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: budget?.bg,
        }}
        className="mb-6 mt-10 px-7 py-3.5 rounded-lg gap-3"
      >
        <Text className="text-[#535862] font-medium text-sm">
          {budget?.name}
        </Text>
        <View className="flex flex-row justify-between">
          <View className="bg-[#F7FAFE] justify-center h-4 rounded-xl w-80">
            <View
              style={{
                backgroundColor: budget?.borderColor,
                width: `${budget?.progress as any}%`,
              }}
              className="h-2 rounded-xl"
            />
          </View>
          <Text className="text-sm ml-3">{budget?.progress}%</Text>
        </View>
        <Text className="text-[#535862] text-sm">
          You’ve used {budget?.progress}% of your total budget
        </Text>
      </TouchableOpacity>

      <View className="justify-center items-center gap-2 my-4">
        <Text
          style={{
            color: budget?.borderColor,
          }}
          className="text-[#FFFFFF] text-2xl font-semibold"
        >
          ₦503,000
        </Text>
        <Text className="text-sm text-[#535862]">Remaining</Text>
      </View>

      <View>
        <View className="flex flex-row justify-between px-7 py-3.5 rounded-lg gap-3 mt-4 border-b border-[#F5F6F6]">
          <Text className="text-[#535862] font-medium text-sm">
            Amount Budgeted
          </Text>
          <Text className="text-[#535862] font-medium text-sm">
            {budget?.amountBudgeted}
          </Text>
        </View>
        <View className="flex flex-row justify-between px-7 py-3.5 rounded-lg gap-3 mt-4 border-b border-[#F5F6F6]">
          <Text className="text-[#535862] font-medium text-sm">Expenses</Text>
          <Text className="text-[#535862] font-medium text-sm">
            {budget?.expenses}
          </Text>
        </View>
        <View className="flex flex-row justify-between px-7 py-3.5 rounded-lg gap-3 mt-4 border-b border-[#F5F6F6]">
          <Text className="text-[#535862] font-medium text-sm">
            Date Created
          </Text>
          <Text className="text-[#535862] font-medium text-sm">
            {budget?.createdAt}
          </Text>
        </View>
        <View className="flex flex-row justify-between px-7 py-3.5 rounded-lg gap-3 mt-4 border-b border-[#F5F6F6]">
          <Text className="text-[#535862] font-medium text-sm">End Date</Text>
          <Text className="text-[#535862] font-medium text-sm">
            {budget?.endDate}
          </Text>
        </View>
      </View>

      <CustomButton
        title="Add Budget"
        // handlePress={handleSubmit(onSignInPress)}
        style={{ backgroundColor: budget?.borderColor }}
        className="mt-24 rounded-3xl"
        textStyles="text-white font-medium"
      />
      <CustomButton
        title="Delete"
        // handlePress={handleSubmit(onSignInPress)}
        className="mt-3 rounded-3xl"
        textStyles="text-[#535862 font-medium"
      />
    </SafeAreaView>
  );
};

export default BudgetDetails;
