import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Subscription = () => {
  return (
    <View className="pt-8 pb-3">
      <View className="mb-6 rounded-2xl overflow-hidden border border-gray-200">
        <TouchableOpacity className="bg-[#5B5FED] py-3 px-4">
          <Text className="text-white text-center font-semibold text-base">
            Upgrade to premium
          </Text>
        </TouchableOpacity>
        <View className="bg-white p-6 items-center">
          <Text className="text-[#0E0E0E] font-bold text-2xl mb-3">
            Free Plan
          </Text>
          <Text className="text-gray-500 text-base mb-4">
            You are using the free plan
          </Text>
          <TouchableOpacity>
            <Text className="text-[#5B5FED] font-semibold text-base underline">
              Upgrade to premium
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-[#535862] font-semibold text-lg my-6">
        Payment History
      </Text>

      <View className="flex flex-row items-center justify-between py-3 rounded-xl">
        <View className="flex flex-row items-center gap-3">
          <View className="gap-1">
            <Text className="text-lg font-medium text-[#0E0E0E]">
              ₦3,500.00
            </Text>
            <Text className="text-base text-gray-600">Monae Premium</Text>
          </View>
        </View>
        <View className="flex flex-row items-center gap-1 bg-[#ECFDF3] border border-[#ABEFC6] p-1.5 px-3 rounded-2xl">
          <Octicons name="dot-fill" size={16} color="#067647" />
          <Text className="text-[#067647]">Paid</Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between py-3 rounded-xl">
        <View className="flex flex-row items-center gap-3">
          <View className="gap-1">
            <Text className="text-lg font-medium text-[#0E0E0E]">
              ₦1,200.00
            </Text>
            <Text className="text-base text-gray-600">Monae Premium</Text>
          </View>
        </View>
        <View className="flex flex-row items-center gap-1 bg-[#FEF3F2] border border-[#FECDCA] p-1.5 px-3 rounded-2xl">
          <Octicons name="dot-fill" size={16} color="#B42318" />
          <Text className="text-[#B42318]">Failed</Text>
        </View>
      </View>
    </View>
  );
};

export default Subscription;
