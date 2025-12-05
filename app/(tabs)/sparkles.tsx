import images from "@/constants/images";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Sparkles = () => {
  const router = useRouter();

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
        <Text className="text-black font-semibold text-xl ml-40">MONAE</Text>
      </View>

      <View className="flex-row justify-center flex mt-5">
        <View className="flex flex-col items-center relative mt-5">
          <Image
            source={images.avatar}
            className="size-40 relative rounded-full"
          />
          <Text className="text-lg text-[#00011B] mt-2">Hi, Christiana 👋</Text>
        </View>
      </View>
      <Text className="text-xl text-[#00011B] font-medium mt-10 text-center">
        How can Monae help you
      </Text>
    </SafeAreaView>
  );
};

export default Sparkles;
