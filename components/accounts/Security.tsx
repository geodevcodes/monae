import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Security = () => {
  return (
    <View className="pt-8 pb-3">
      <View className="flex flex-row items-center justify-between py-3 rounded-xl">
        <View className="flex flex-row items-center gap-3">
          <View className="p-3 rounded-full bg-[#5F61F5]">
            <FontAwesome5 name="key" size={20} color="#FFFFFF" />
          </View>
          <View className="gap-1">
            <Text className="text-base font-medium text-gray-600">
              Change Password
            </Text>
            <Text className="text-xs text-gray-600">
              Update your password to keep your account secure
            </Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={18} color="#181D27" />
      </View>

      <View className="flex flex-row items-center justify-between my-6 py-3 rounded-xl">
        <View className="flex flex-row items-center gap-3">
          <View className="p-3 rounded-full bg-[#5F61F5]">
            <FontAwesome5 name="key" size={20} color="#FFFFFF" />
          </View>
          <View className="gap-1">
            <Text className="text-base font-medium text-gray-600">
              Change Passcode
            </Text>
            <Text className="text-xs text-gray-600">
              Secure your app with a new passcode in seconds.
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#181D27" />
      </View>

      <View className="flex flex-row items-center justify-between py-3 rounded-xl">
        <View className="flex flex-row items-center gap-3">
          <View className="p-3 rounded-full bg-[#5F61F5]">
            <MaterialIcons name="document-scanner" size={20} color="#FFFFFF" />
          </View>
          <View className="gap-1 ">
            <Text className="text-base font-medium text-gray-600">
              Enable Biometric
            </Text>
            <Text className="text-xs text-gray-600">
              Secure your account for faster, safer access.
            </Text>
          </View>
        </View>
        <FontAwesome5 name="toggle-on" size={32} color="#5F61F5" />
      </View>
    </View>
  );
};

export default Security;
