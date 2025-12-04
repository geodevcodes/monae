import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const FXTransfer = () => {
  const router = useRouter();
  const [showFXTabs, setShowFXTabs] = useState("Beneficiaries");
  return (
    <SafeAreaView className="px-5 pt-4 pb-2">
      <View className="mb-4 flex flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("You create new!")}
          activeOpacity={0.7}
        >
          <Text className="text-[#ff6600] font-semibold">Create new</Text>
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex gap-3 pb-3">
          <Text className="text-black font-bold text-2xl">
            FX transfer to other banks
          </Text>
          <Text className="text-gray-500 text-sm pr-10">
            Here is the list of your saved beneficiaries and international
            payments drafts.
          </Text>
        </View>

        {/* ======= TABS ===== */}
        <View className="mt-4 mb-1.5 p-0.5 bg-white rounded-xl flex flex-row items-center justify-between">
          <Pressable
            onPress={() => setShowFXTabs("Beneficiaries")}
            className="w-1/2"
          >
            <Text
              className={`${
                showFXTabs === "Beneficiaries"
                  ? "bg-gray-200 text-[#808080]"
                  : "text-[#808080]"
              } text-base text-center p-2 rounded-xl`}
            >
              Beneficiaries
            </Text>
          </Pressable>
          <Pressable onPress={() => setShowFXTabs("Drafts")} className="w-1/2">
            <Text
              className={`${
                showFXTabs === "Drafts"
                  ? "bg-gray-200 text-[#808080]"
                  : "text-[#808080]"
              } text-base text-center p-2 rounded-xl`}
            >
              Drafts
            </Text>
          </Pressable>
        </View>

        <View className="mt-4 mb-2 gap-3">
          {/* Beneficiaries */}
          {showFXTabs === "Beneficiaries" && (
            <View className="border border-slate-200 p-5 rounded-lg">
              <View className="flex flex-col gap-3 items-center">
                <MaterialIcons
                  name="error-outline"
                  size={32}
                  color="#6b7280"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <Text className="text-black/90 text-sm">
                  You currently have no saved beneficiaries
                </Text>
              </View>
            </View>
          )}

          {/* Drafts */}
          {showFXTabs === "Drafts" && (
            <View className="border border-slate-200 p-5 rounded-lg">
              <View className="flex flex-col gap-3 items-center">
                <MaterialIcons
                  name="error-outline"
                  size={32}
                  color="#6b7280"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <Text className="text-black/90 text-sm">
                  You currently have no profiles in your draft.
                </Text>
              </View>
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default FXTransfer;
