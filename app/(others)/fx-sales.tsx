import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FXSales = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="px-8 pt-4 pb-2">
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
        className="max-w-[50px] flex items-start justify-start mb-4"
      >
        <View className="flex flex-row items-center justify-between gap-3">
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-between gap-3 mb-32">
        <Text className="text-black font-bold text-2xl">FX Sales</Text>
      </View>
    </SafeAreaView>
  );
};

export default FXSales;
