import images from "@/constants/images";
import { budgetData } from "@/lib/data/budgetData";
import { spendingData } from "@/lib/data/spendingData";
import { EvilIcons, Feather } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [hiddenBalance, setHiddenBalance] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView className="px-5 pt-6 bg-[#F9F9F9] h-full">
      <View className="flex flex-row items-center justify-between pb-4">
        <View className="flex flex-row justify-center items-center gap-2">
          <View className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              source={images.avatar}
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>
          <View>
            <Text className="text-base text-[#232429] font-semibold">
              Hello, Christiana!
            </Text>
            <Text className="text-xs text-[#535862]">
              Let's check in on your money today.
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <ImageBackground
          source={images.walletBg}
          resizeMode="cover"
          style={{ borderRadius: 12, overflow: "hidden", marginTop: 20 }}
        >
          <View className="border border-slate-200 p-6 rounded-lg">
            <View className="flex flex-row gap-3">
              <Text className="text-[#F5F6F6]">My Account Balance</Text>
              <TouchableOpacity
                className="mt-0.5"
                onPress={() => setHiddenBalance((prev) => !prev)}
              >
                <Octicons
                  name={hiddenBalance ? "eye-closed" : "eye"}
                  size={14}
                  color="#F5F6F6"
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row gap-3 items-center mt-3">
              {hiddenBalance ? (
                <Entypo
                  name="dots-three-horizontal"
                  size={32}
                  color="#FFFFFF"
                />
              ) : (
                <Text className="text-[#FFFFFF] text-2xl font-bold">
                  ₦503,000
                </Text>
              )}
              <TouchableOpacity
                onPress={() => router.push("/(others)/connected-banks")}
              >
                <EvilIcons name="chevron-right" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View className="mt-10">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-[#232429] font-bold text-lg">My Budget</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/budgets")}>
              <View className="flex flex-row items-center gap-3">
                <Text className="text-[#5F61F5] text-sm">Manage Budgets</Text>
                <Feather name="arrow-right" size={14} color="#5F61F5" />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {budgetData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(item.href as any)}
                style={{
                  backgroundColor: item.bg,
                }}
                className="mr-3 px-7 py-3.5 rounded-lg gap-3"
              >
                <Text className="text-[#535862] font-medium text-sm">
                  {item.name}
                </Text>
                <View className="flex flex-row justify-between">
                  <View className="bg-[#F7FAFE] justify-center h-4 rounded-xl w-64">
                    <View
                      style={{
                        backgroundColor: item.borderColor,
                        width: `${item.progress}%`,
                      }}
                      className="bg-[#E26F5F] h-2 rounded-xl"
                    />
                  </View>
                  <Text className="text-sm ml-3">{item.progress}%</Text>
                </View>
                <Text className="text-[#535862] text-sm">
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="flex flex-col mt-4 p-3 border border-[#FFECB6] bg-[#FFFCF2] rounded-lg">
          <TouchableOpacity className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <View className="p-3 rounded-full bg-[#FEF0C7]">
                <Ionicons name="warning-outline" size={24} color="#DC6803" />
              </View>
              <Text className="text-base font-rubik-medium text-gray-600">
                Uncategorized Spending
              </Text>
            </View>
            <View className="bg-[#DC6803] rounded-full w-6 h-6 justify-center items-center">
              <Text className="h-6 w-6 text-sm text-white justify-center items-center text-center">
                3
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="my-10">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-[#232429] font-bold text-lg">
              My Spendings
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/budgets")}>
              <View className="flex flex-row items-center gap-3">
                <Text className="text-[#5F61F5] text-sm">This Month</Text>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color="#5F61F5"
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <View className="flex flex-col mt-3">
              {spendingData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(item.href as any)}
                  className="flex flex-row items-center justify-between py-3"
                >
                  <View className="flex flex-row items-center gap-3">
                    <View
                      style={{
                        backgroundColor: item.bg,
                        borderColor: item.borderColor,
                        borderWidth: 1,
                      }}
                      className="p-3 rounded-full"
                    >
                      <Text>{item.icon}</Text>
                    </View>
                    <Text className="text-base text-gray-600">{item.name}</Text>
                  </View>
                  <Text className="text-base text-gray-600">
                    {item.spendAmount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
