import EmptyState from "@/components/EmptyState";
import images from "@/constants/images";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Transactions = () => {
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
        <Text className="text-black font-bold text-2xl">
          Transactions history
        </Text>
      </View>
      <EmptyState
        title="No transactions found"
        subTitle="Top up your account to start using the card."
        imageUrl={images.emptybox}
        buttonName="Fund account"
        onPress={() => router.push("/(others)/funding-source")}
      />
    </SafeAreaView>
  );
};

export default Transactions;
