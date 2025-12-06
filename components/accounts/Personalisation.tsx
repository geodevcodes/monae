import { FontAwesome5, Fontisto, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Personalisation = () => {
  return (
    <View className="pt-8 pb-3">
      <View className="flex flex-row items-center justify-between py-3 rounded-xl">
        <View className="flex flex-row items-center gap-3">
          <View className="p-3 rounded-full bg-[#5F61F5]">
            <Fontisto name="world-o" size={20} color="#FFFFFF" />
          </View>
          <View className="gap-1">
            <Text className="text-base font-medium text-gray-600">
              Language
            </Text>
            <Text className="text-xs text-gray-600">
              Choose your preferred language
            </Text>
          </View>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-[#232429]">English</Text>
          <Ionicons name="chevron-forward" size={18} color="#181D27" />
        </View>
      </View>

      <View className="flex flex-row items-center justify-between py-3 rounded-xl">
        <View className="flex flex-row items-center gap-3">
          <View className="p-3 rounded-full bg-[#5F61F5]">
            <Fontisto name="world-o" size={20} color="#FFFFFF" />
          </View>
          <View className="gap-1 ">
            <Text className="text-base font-medium text-gray-600">
              Enable Dark Mode
            </Text>
            <Text className="text-xs text-gray-600">
              Secure your account for faster, safer access.
            </Text>
          </View>
        </View>
        <FontAwesome5 name="toggle-on" size={32} color="#F2F4F7" />
      </View>
    </View>
  );
};

export default Personalisation;
