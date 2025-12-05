import CustomButton from "@/components/CustomButton";
import { categoriesData, durationOptions } from "@/lib/data/budgetData";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateBudget = () => {
  const router = useRouter();
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [duration, setDuration] = useState("Monthly");
  const [date, setDate] = useState("01 Oct 2025");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);

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
          Create Budget
        </Text>
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-col mt-10">
          <Text className="text-gray-500 text-base mb-8">
            Set how much you want to spend and track it easily
          </Text>
          <View className="flex flex-col mt-3">
            {/* Budget Name Field */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Budget Name
              </Text>
              <TextInput
                value={budgetName}
                onChangeText={setBudgetName}
                placeholder="Enter Budget Name"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-300 rounded-xl px-4 py-4 text-base"
              />
            </View>

            {/* Budget Amount Field */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Budget Amount
              </Text>
              <TextInput
                value={budgetAmount}
                onChangeText={setBudgetAmount}
                placeholder="Enter Budget Amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                className="border border-gray-300 rounded-xl px-4 py-4 text-base"
              />
            </View>

            {/* Duration Dropdown */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Duration
              </Text>
              <TouchableOpacity
                onPress={() => setShowDurationDropdown(!showDurationDropdown)}
                activeOpacity={0.7}
                className="border border-gray-300 rounded-xl px-4 py-4 flex flex-row justify-between items-center"
              >
                <Text className="text-base text-black">{duration}</Text>
                <FontAwesome6
                  name={showDurationDropdown ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#6B7280"
                />
              </TouchableOpacity>
              {showDurationDropdown && (
                <View className="border border-gray-300 rounded-xl mt-2 bg-white">
                  {durationOptions.map((option, index) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        setDuration(option);
                        setShowDurationDropdown(false);
                      }}
                      activeOpacity={0.7}
                      className={`px-4 py-3 ${
                        index !== durationOptions.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <Text className="text-base text-black">{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Date Field */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Date
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                className="border border-gray-300 rounded-xl px-4 py-4 flex flex-row justify-between items-center"
              >
                <Text className="text-base text-[#232429]">{date}</Text>
                <FontAwesome6 name="calendar" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Select Category */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Select Category
              </Text>
              <View className="flex flex-row flex-wrap gap-3">
                {categoriesData.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.id)}
                    activeOpacity={0.7}
                    className={`px-4 py-3 rounded-xl border ${
                      selectedCategory === category.id
                        ? "border-[#444CE7] bg-[#EEF0FF]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <Text className="text-base text-[#646B76]">
                      {category.emoji} {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <CustomButton
              title="Create Budget"
              className="mt-16 rounded-3xl bg-[#444CE7]"
              textStyles="text-white font-medium"
            />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default CreateBudget;
