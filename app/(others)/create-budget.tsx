import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { categoriesData, durationOptions } from "@/lib/data/budgetData";
import { formatDateForDisplay } from "@/lib/lib";
import { useCreateBudget } from "@/services/budget/budgetService";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateBudget = () => {
  const router = useRouter();
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      budgetName: "",
      budgetAmount: "",
      budgetDuration: "Monthly",
      budgetDate: "2025-10-01",
      budgetCategories: "",
    },
  });
  const { mutate: createBudget, isPending } = useCreateBudget();

  const onSubmit = (data: any) => {
    const payload = {
      budgetName: data.budgetName,
      budgetAmount: data.budgetAmount,
      budgetDuration: data.budgetDuration,
      budgetDate: data.budgetDate,
      budgetCategories: data.budgetCategories,
    };

    createBudget(
      { payload },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  return (
    <SafeAreaView className="px-5 pt-4 pb-2 bg-white h-full">
      <View className="flex flex-row items-center mt-4 pb-4">
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
            <FormField
              title="Budget Name"
              control={control}
              name="budgetName"
              rules={{
                required: "Budget name is required",
                minLength: {
                  value: 2,
                  message: "Budget name should be at least 2 characters",
                },
              }}
              placeholder="Enter Budget Name"
              otherStyles="mb-6"
            />

            {/* Budget Amount Field */}
            <FormField
              title="Budget Amount"
              control={control}
              name="budgetAmount"
              rules={{
                required: "Budget amount is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Please enter a valid amount",
                },
                validate: (value: any) =>
                  parseFloat(value) > 0 || "Amount must be greater than 0",
              }}
              placeholder="Enter Budget Amount"
              keyboardType="decimal-pad"
              otherStyles="mb-6"
            />

            {/* Duration Dropdown */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Duration
              </Text>
              <Controller
                control={control}
                name="budgetDuration"
                render={({ field: { value } }) => (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setShowDurationDropdown(!showDurationDropdown)
                      }
                      activeOpacity={0.7}
                      className="border border-gray-300 rounded-xl px-4 py-4 flex flex-row justify-between items-center"
                    >
                      <Text className="text-base text-black">{value}</Text>
                      <FontAwesome6
                        name={
                          showDurationDropdown ? "chevron-up" : "chevron-down"
                        }
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
                              setValue("budgetDuration", option);
                              setShowDurationDropdown(false);
                            }}
                            activeOpacity={0.7}
                            className={`px-4 py-3 ${
                              index !== durationOptions.length - 1
                                ? "border-b border-gray-200"
                                : ""
                            }`}
                          >
                            <Text className="text-base text-black">
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </>
                )}
              />
            </View>

            {/* Date Field */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Date
              </Text>
              <Controller
                control={control}
                name="budgetDate"
                render={({ field: { value } }) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="border border-gray-300 rounded-xl px-4 py-4 flex flex-row justify-between items-center"
                  >
                    <Text className="text-base text-[#232429]">
                      {formatDateForDisplay(value)}
                    </Text>
                    <FontAwesome6 name="calendar" size={20} color="#6B7280" />
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* Select Category */}
            <View className="mb-6">
              <Text className="text-[#232429] text-base font-normal mb-3">
                Select Category
              </Text>
              <Controller
                control={control}
                name="budgetCategories"
                rules={{
                  required: "Please select a category",
                }}
                render={({ field: { value } }) => (
                  <>
                    <View className="flex flex-row flex-wrap gap-3">
                      {categoriesData.map((category) => (
                        <TouchableOpacity
                          key={category.id}
                          onPress={() =>
                            setValue("budgetCategories", category.label)
                          }
                          activeOpacity={0.7}
                          className={`px-4 py-3 rounded-xl border ${
                            value === category.label
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
                    {errors.budgetCategories && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.budgetCategories.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>

            <CustomButton
              title={isPending ? "Creating..." : "Create Budget"}
              handlePress={handleSubmit(onSubmit)}
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
