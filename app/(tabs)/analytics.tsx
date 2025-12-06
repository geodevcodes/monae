import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Analytics = () => {
  const scrollY = useSharedValue(0);
  const [selectedMonth, setSelectedMonth] = useState("Sept 2025");
  const [activeTab, setActiveTab] = useState("Spendings");
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

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
      opacity: withTiming(isCentered ? 0.85 : 1, { duration: 300 }),
      fontSize: withTiming(isCentered ? 20 : 20, { duration: 300 }),
      marginLeft: withTiming(isCentered ? 16 : 0, { duration: 300 }),
    };
  });

  // Sample data for the line chart
  const chartData = {
    labels: ["1 Sept", "2 Sept", "3 Sept", "4 Sept", "5 Sept"],
    datasets: [
      {
        data: [100000, 150000, 120000, 180000, 201865345],
        strokeWidth: 2,
      },
    ],
  };

  // Budget categories data
  const budgetData = [
    { name: "Balance", percentage: 30, color: "#A855F7", amount: "₦300,000" },
    {
      name: "Dining & Food",
      percentage: 15,
      color: "#F97316",
      amount: "₦300,000",
    },
    { name: "Travel", percentage: 25, color: "#06B6D4", amount: "₦300,000" },
    { name: "Shopping", percentage: 20, color: "#EC4899", amount: "₦300,000" },
    { name: "Others", percentage: 10, color: "#10B981", amount: "₦300,000" },
  ];

  const renderPieChart = () => {
    const total = 360;
    let currentAngle = 0;

    return (
      <View className="items-center justify-center relative mt-10 mb-4">
        <View className="w-52 h-52 rounded-full relative items-center justify-center">
          {budgetData.map((item, index) => {
            const angle = (item.percentage / 100) * total;
            const segment = (
              <View
                key={index}
                style={{
                  position: "absolute",
                  width: 208,
                  height: 208,
                  borderRadius: 104,
                  transform: [{ rotate: `${currentAngle}deg` }],
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: 208,
                    height: 104,
                    backgroundColor: item.color,
                    transform: [{ rotate: `${angle}deg` }],
                    transformOrigin: "50% 100%",
                  }}
                />
              </View>
            );
            currentAngle += angle;
            return segment;
          })}

          {/* Center white circle */}
          <View className="w-36 h-36 rounded-full bg-white absolute items-center justify-center">
            <Text className="text-gray-400 text-xs">₦</Text>
            <Text className="text-black text-2xl font-bold">
              {selectedBudget
                ? budgetData
                    .find((b) => b.name === selectedBudget)
                    ?.amount.replace("₦", "")
                : "300,000"}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">
              {selectedBudget || "Total Budget"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="px-5 pt-6 pb-8 bg-white h-full">
      <View className="flex flex-row items-center justify-between gap-3 h-14">
        <Animated.Text
          style={[
            titleStyle,
            {
              fontWeight: "bold",
              color: "black",
            },
          ]}
        >
          Analytics
        </Animated.Text>

        {/* Month Selector */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex flex-row items-center gap-2 rounded-lg px-3 py-2"
        >
          <Text className="text-[#444CE7] text-sm font-medium">
            {selectedMonth}
          </Text>
          <FontAwesome6 name="chevron-down" size={12} color="#444CE7" />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-col mt-4">
          {/* Income Card */}
          <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-3">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-gray-600 text-sm">Income</Text>
              <TouchableOpacity>
                <FontAwesome6 name="circle-info" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <Text className="text-black text-3xl font-bold mt-2">00.00</Text>
          </View>

          {/* Expenses Card */}
          <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-gray-600 text-sm">Expenses</Text>
              <TouchableOpacity>
                <FontAwesome6 name="circle-info" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <Text className="text-black text-3xl font-bold mt-2">00.00</Text>
          </View>

          {/* Daily Expenses Chart */}
          <View className="bg-white rounded-2xl p-4 mt-6">
            <View className="flex flex-row items-center justify-between mb-4">
              <Text className="text-black text-base font-semibold">
                Daily Expenses
              </Text>
              <TouchableOpacity>
                <FontAwesome6 name="circle-info" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <LineChart
              data={chartData}
              width={width - 80}
              height={200}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#6366F1",
                },
                propsForBackgroundLines: {
                  strokeDasharray: "5,5",
                  stroke: "#E5E7EB",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero
              segments={4}
              decorator={() => {
                return tooltipPos.visible ? (
                  <View>
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "black",
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 8,
                        left: tooltipPos.x - 60,
                        top: tooltipPos.y - 40,
                      }}
                    >
                      <Text className="text-white font-semibold text-sm">
                        ${tooltipPos.value.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                ) : null;
              }}
              onDataPointClick={(data) => {
                const isSamePoint =
                  tooltipPos.x === data.x && tooltipPos.y === data.y;

                setTooltipPos({
                  x: data.x,
                  y: data.y,
                  visible: !isSamePoint,
                  value: data.value,
                });
              }}
            />
          </View>

          {/* Spendings and Budgets Section */}
          <View className="bg-white  rounded-2xl p-4 mt-10">
            {/* Tab Buttons */}
            <View className="flex flex-row mb-6 bg-gray-100 border border-gray-200 rounded-lg p-1">
              <TouchableOpacity
                onPress={() => setActiveTab("Spendings")}
                activeOpacity={0.7}
                className={`flex-1 py-2.5 rounded-lg ${
                  activeTab === "Spendings" ? "bg-white" : ""
                }`}
              >
                <Text
                  className={`text-center text-sm font-medium ${
                    activeTab === "Spendings" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Spendings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab("Budgets")}
                activeOpacity={0.7}
                className={`flex-1 py-2.5  rounded-lg ${
                  activeTab === "Budgets" ? "bg-white" : ""
                }`}
              >
                <Text
                  className={`text-center text-sm font-medium ${
                    activeTab === "Budgets" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Budgets
                </Text>
              </TouchableOpacity>
            </View>

            {/* Pie Chart */}
            {renderPieChart()}

            {/* Legend */}
            <View className="flex flex-row flex-wrap justify-centr gap-x-2 gap-y-3 mt-6 mb-4">
              {budgetData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedBudget(item.name)}
                  activeOpacity={0.7}
                  className="flex flex-row items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                >
                  <View
                    style={{ backgroundColor: item.color }}
                    className="w-3 h-3 rounded-full mr-2"
                  />
                  <Text className="text-gray-700 text-xs font-medium">
                    {item.name}-{item.percentage}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Budget Summary */}
          <View className="bg-white border border-gray-200 rounded-2xl p-4">
            <View className="flex flex-row justify-between mb-3">
              <Text className="text-gray-600 text-sm">Total Budget:</Text>
              <Text className="text-black text-sm font-semibold">
                ₦5,000.00
              </Text>
            </View>
            <View className="flex flex-row justify-between mb-3">
              <Text className="text-gray-600 text-sm">Total Expenses:</Text>
              <Text className="text-black text-sm font-semibold">₦3500.00</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-600 text-sm">Remaining Balance:</Text>
              <Text className="text-black text-sm font-semibold">₦1500.00</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;
