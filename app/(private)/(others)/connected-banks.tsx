import { useGetConnectedBanks } from "@/services/connect-bank/connect-bank";
import { Feather } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ConnectedBanks = () => {
  const { data: banks, isLoading } = useGetConnectedBanks();
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator size="small" color="#5F61F5" className="mt-40" />;
  }
  return (
    <SafeAreaView className="px-8 pt-6 pb-2 bg-white h-full">
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
        <Text className="text-[#0E0E0E] font-semibold text-xl ml-28">
          Connected Banks
        </Text>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-col mt-10">
          <Text className="text-gray-500 text-base mb-8">
            Monae syncs with your bank to track spending and give you insights
            securely and privately.
          </Text>

          <View className="flex flex-col mt-3">
            {banks?.map((item: any, index: any) => (
              <TouchableOpacity
                key={index}
                className="flex flex-row items-center justify-between py-3"
              >
                <View className="flex flex-row items-center gap-3">
                  <View className="p-0.5 w-14 h-14 border border-gray-300 rounded-full overflow-hidden">
                    <Image
                      source={{ uri: item?.logoUrl }}
                      resizeMode="cover"
                      className="w-full h-full rounded-full"
                    />
                  </View>
                  <View className="gap-2">
                    <Text className="text-base font-semibold text-gray-600">
                      {item?.institution}
                    </Text>
                    <Text className="text-xs text-gray-600">
                      {item?.accountNumber
                        ? `******${item?.accountNumber.slice(-3)}`
                        : "******"}
                    </Text>
                  </View>
                </View>
                <Text className="text-base text-gray-600">
                  {item?.balance.toLocaleString("en-NG", {
                    style: "currency",
                    currency: item?.currency ?? "NGN",
                  })}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      <TouchableOpacity
        onPress={() => router.push("/(private)/(others)/connect-bank")}
        className="absolute bottom-40 right-6 bg-[#5F61F5] w-16 h-16 rounded-full items-center justify-center shadow-lg"
        style={{
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConnectedBanks;
