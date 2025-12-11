import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { categoriesData, durationOptions } from "@/lib/data/budgetData";
import { formatDateForDisplay } from "@/lib/lib";
import { useCreateBudget } from "@/services/budget/budgetService";
import { EvilIcons, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";

const CreateBudget = () => {
  const router = useRouter();

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
      budgetDate: new Date(),
      budgetCategories: "",
    },
  });

  const { mutate: createBudget, isPending } = useCreateBudget();

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      budgetDate: data.budgetDate.toISOString().split("T")[0],
    };

    createBudget(
      { payload },
      {
        onSuccess: () => router.back(),
      }
    );
  };

  return (
    <SafeAreaView className="px-5 pt-4 pb-2 bg-white h-full">
      {/* HEADER */}
      <View className="flex flex-row items-center mt-4 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="max-w-[50px] flex items-start justify-start border border-[#A9AEB7] rounded-lg p-1.5"
        >
          <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
        </TouchableOpacity>

        <Text className="text-black font-semibold text-xl ml-32">
          Create Budget
        </Text>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-col mt-10">
          <Text className="text-gray-500 text-base mb-8">
            Set how much you want to spend and track it easily
          </Text>

          {/* Budget Name Field */}
          <FormField
            title="Budget Name"
            control={control}
            name="budgetName"
            rules={{
              required: "Budget name is required",
            }}
            placeholder="Enter Budget Name"
            otherStyles="mb-6"
          />

          {/* AMOUNT FIELD */}
          <FormField
            title="Budget Amount"
            control={control}
            name="budgetAmount"
            rules={{
              required: "Budget amount is required",
            }}
            placeholder="Enter Amount"
            keyboardType="decimal-pad"
            otherStyles="mb-6"
          />

          {/* DURATION - USING SELECT DROPDOWN */}
          <View className="mb-6">
            <Text className="text-[#232429] text-base font-normal mb-3">
              Duration
            </Text>

            <Controller
              control={control}
              name="budgetDuration"
              render={({ field: { value, onChange } }) => (
                <SelectDropdown
                  data={durationOptions.map((option) => ({ title: option }))}
                  defaultValue={{ title: value }}
                  onSelect={(selectedItem) => onChange(selectedItem.title)}
                  renderButton={(selectedItem, isOpened) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {selectedItem?.title || "Select Duration"}
                      </Text>
                      <EvilIcons
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  )}
                  renderItem={(item, isSelected) => (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(!isSelected && { backgroundColor: "#E4E6E9" }),
                      }}
                    >
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              )}
            />
          </View>

          {/* DATE PICKER (Modal) */}
          <View className="mb-6">
            <Text className="text-[#232429] text-base font-normal mb-3">
              Date
            </Text>
            <Controller
              control={control}
              name="budgetDate"
              render={({ field: { value } }) => {
                const [showPicker, setShowPicker] = useState(false);
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => setShowPicker(true)}
                      className="border border-[#E4E6E9] rounded-xl px-4 py-4 flex flex-row justify-between items-center"
                    >
                      <Text className="text-base text-[#232429]">
                        {formatDateForDisplay(value as any)}
                      </Text>
                      <FontAwesome6 name="calendar" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={showPicker}
                      mode="date"
                      date={value || new Date()}
                      onConfirm={(date) => {
                        setValue("budgetDate", date);
                        setShowPicker(false);
                      }}
                      onCancel={() => setShowPicker(false)}
                      confirmTextIOS="Confirm"
                      cancelTextIOS="Cancel"
                    />
                  </>
                );
              }}
            />
          </View>

          {/* CATEGORY SELECTION */}
          <View className="mb-6">
            <Text className="text-[#232429] text-base font-normal mb-3">
              Select Category
            </Text>

            <Controller
              control={control}
              name="budgetCategories"
              rules={{ required: "Please select a category" }}
              render={({ field: { value } }) => (
                <>
                  <View className="flex flex-row flex-wrap gap-3">
                    {categoriesData.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        onPress={() =>
                          setValue("budgetCategories", category.label)
                        }
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

          {/* BUTTON */}
          <CustomButton
            title={isPending ? "Creating..." : "Create Budget"}
            handlePress={handleSubmit(onSubmit)}
            className="mt-16 rounded-3xl bg-[#444CE7]"
            textStyles="text-white font-medium"
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default CreateBudget;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "transparent",
    elevation: 1,

    // iOS shadow
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
    borderColor: "#E4E6E9",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  dropdownButtonTxtStyle: {
    fontSize: 16,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: "#6B7280",
  },
  dropdownItemStyle: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
  },
  dropdownMenuStyle: {
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
});
