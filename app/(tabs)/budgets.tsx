import BudgetShimmer from "@/components/shimmer/BudgetShimmer";
import { getProgressStyles } from "@/lib/lib";
import { useGetBudgetsInfinite } from "@/services/budget/budgetService";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Budgets = () => {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const scrollY = useSharedValue(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetBudgetsInfinite();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const titleStyle = useAnimatedStyle(() => {
    const isCentered = scrollY.value > 10;
    return {
      transform: [
        {
          translateX: withTiming(isCentered ? width / 2 - 80 : 0, {
            duration: 300,
          }),
        },
      ],
      opacity: withTiming(isCentered ? 0.8 : 1, { duration: 300 }),
      fontSize: withTiming(isCentered ? 20 : 24, { duration: 300 }),
      marginLeft: withTiming(isCentered ? 16 : 0, { duration: 300 }),
    };
  });

  // Flatten infinite pages
  const budgetData = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <SafeAreaView className="pt-6 pb-8 bg-white h-full">
        <BudgetShimmer />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="px-5 pt-6 pb-8 bg-white h-full">
      <View className="flex flex-row items-center justify-between mb-6 h-12">
        <Animated.Text className="text-black font-bold" style={titleStyle}>
          Budgets
        </Animated.Text>
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <TouchableOpacity className="mb-6 px-7 py-3.5 rounded-lg gap-3 bg-[#EDF2FF]">
          <View className="flex flex-row justify-between">
            <Text className="text-[#535862] font-medium text-sm">
              Total Budgets
            </Text>
            <Text className="text-[#535862] font-medium text-sm">
              ₦{data?.pages[0]?.meta?.totalBudgetAmount?.toLocaleString() ?? 0}
            </Text>
          </View>
          <View className="flex flex-row justify-between mt-2">
            <View className="bg-[#F7FAFE] justify-center h-4 rounded-xl w-80">
              <View
                style={{
                  backgroundColor: getProgressStyles(
                    data?.pages[0]?.meta?.overallProgress ?? 0
                  ).borderColor,
                  width: `${data?.pages[0]?.meta?.overallProgress ?? 0}%`,
                }}
                className="h-2 rounded-xl"
              />
            </View>
            <Text className="text-sm ml-3">
              {data?.pages[0]?.meta?.overallProgress ?? 0}%
            </Text>
          </View>
          <Text className="text-[#535862] text-sm mt-1">
            You’ve used {data?.pages[0]?.meta?.overallProgress ?? 0}% of your
            total budget
          </Text>

          <View className="flex flex-row justify-between mt-1">
            <Text className="text-[#535862] font-medium text-sm">
              Remaining
            </Text>
            <Text className="text-[#535862] font-medium text-sm">
              ₦
              {data?.pages[0]?.meta?.overallRemainingBudget?.toLocaleString() ??
                0}
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={budgetData}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#5F61F5" />
            ) : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/(others)/budget-details/${item._id}`)
              }
              className="px-7 py-3.5 rounded-lg gap-3 mt-4 border-b border-[#F5F6F6]"
            >
              <View className="flex flex-row justify-between">
                <Text className="text-[#535862] font-medium text-sm">
                  {item.budgetName}
                </Text>
                <Text className="text-[#535862] font-medium text-sm">
                  ₦{item.budgetAmount.toLocaleString()}
                </Text>
              </View>

              <View className="flex flex-row justify-between mt-2">
                <View className="bg-[#F7FAFE] justify-center h-4 rounded-xl w-80">
                  <View
                    style={{
                      backgroundColor: getProgressStyles(item.budgetProgress)
                        .borderColor,
                      width: `${item.budgetProgress}%`,
                    }}
                    className="h-2 rounded-xl"
                  />
                </View>
                <Text className="text-sm ml-3">{item.budgetProgress}%</Text>
              </View>
              <Text className="text-[#535862] text-sm mt-1">
                You've used {item.budgetProgress}% of your budget
              </Text>
            </TouchableOpacity>
          )}
        />
      </Animated.ScrollView>
      <TouchableOpacity
        onPress={() => router.push("/(others)/create-budget")}
        className="absolute bottom-40 right-6 bg-[#5F61F5] w-16 h-16 rounded-full items-center justify-center shadow-lg"
        style={{
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Budgets;
