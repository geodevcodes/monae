import CustomButton from "@/components/CustomButton";
import BudgetDetailShimmer from "@/components/shimmer/BudgetDetailShimmer";
import { useGetBudget } from "@/services/budget/budgetService";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BudgetDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: budget, isLoading } = useGetBudget(id as string);

  if (isLoading) {
    return <BudgetDetailShimmer />;
  }

  const progress = budget?.budgetProgress || 0;
  const remaining = budget?.remainingBudget || budget?.budgetAmount || 0;
  const expenses = budget?.totalExpenses || 0;

  return (
    <SafeAreaView className="px-5 pt-4 pb-2 bg-white h-full">
      {/* HEADER */}
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

      {/* Budget Card */}
      <TouchableOpacity className="mb-6 mt-10 px-7 py-3.5 rounded-lg gap-3 bg-[#EDF2FF]">
        <Text className="text-[#535862] font-medium text-sm">
          {budget?.budgetName}
        </Text>

        {/* Progress Bar */}
        <View className="flex flex-row justify-between">
          <View className="bg-[#F7FAFE] justify-center h-4 rounded-xl w-80">
            <View
              style={{
                backgroundColor: "#5F61F5",
                width: `${progress}%`,
              }}
              className="h-2 rounded-xl"
            />
          </View>
          <Text className="text-sm ml-3">{progress.toFixed(0)}%</Text>
        </View>

        <Text className="text-[#535862] text-sm">
          You’ve used {progress.toFixed(0)}% of your total budget
        </Text>
      </TouchableOpacity>

      {/* Remaining Amount */}
      <View className="justify-center items-center gap-2 my-4">
        <Text style={{ color: "#5F61F5" }} className="text-2xl font-semibold">
          ₦{remaining.toLocaleString()}
        </Text>
        <Text className="text-sm text-[#535862]">Remaining</Text>
      </View>

      {/* Budget Details */}
      <View>
        <DetailRow
          label="Amount Budgeted"
          value={`₦${budget?.budgetAmount.toLocaleString()}`}
        />
        <DetailRow label="Expenses" value={`₦${expenses.toLocaleString()}`} />
        <DetailRow
          label="Date Created"
          value={moment(budget?.createdAt).format("LL")}
        />
        <DetailRow
          label="End Date"
          value={moment(budget?.budgetDate).format("LL")}
        />
      </View>

      {/* BUTTONS */}
      <CustomButton
        title="Add Budget"
        handlePress={() => router.back()}
        className="mt-24 rounded-3xl bg-[#5F61F5]"
        textStyles="text-white font-medium"
      />
      <CustomButton
        title="Delete"
        handlePress={() => router.back()}
        className="mt-3 rounded-3xl"
        textStyles="text-[#535862] font-medium"
      />
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value }: any) => (
  <View className="flex flex-row justify-between px-7 py-3.5 mt-4 border-b border-[#F5F6F6]">
    <Text className="text-[#535862] font-medium text-sm">{label}</Text>
    <Text className="text-[#535862] font-medium text-sm">{value}</Text>
  </View>
);

export default BudgetDetails;
