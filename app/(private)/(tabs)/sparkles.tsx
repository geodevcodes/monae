import { quickActions } from "@/lib/data/sparklesData";
import { avatarPlaceholderUrl } from "@/lib/lib";
import { useUserProfile } from "@/services/settings/settingsService";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Sparkles = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { data: profileData } = useUserProfile();
  const userProfile =
    (profileData && (profileData.data ?? profileData)) || null;

  return (
    <SafeAreaView className="px-5 pt-4 pb-2 bg-white h-full">
      <View className="flex flex-row mt-6 items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="max-w-[50px] flex items-start justify-start border border-[#A9AEB7] rounded-lg p-1.5"
        >
          <View className="flex flex-row items-center justify-between gap-3">
            <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
          </View>
        </TouchableOpacity>
        <Text className="text-black font-semibold text-xl flex-1 text-center mr-12">
          MONAE
        </Text>
      </View>
      <View className="flex-row justify-center flex mt-5">
        <View className="flex flex-col items-center relative mt-5">
          <Image
            source={avatarPlaceholderUrl && { uri: avatarPlaceholderUrl }}
            className="size-24 relative rounded-full"
          />
          <Text className="text-lg text-[#00011B] mt-3">
            Hi,{" "}
            {userProfile?.lastName ? `${userProfile?.lastName}` : "Franklin!"}{" "}
            👋
          </Text>
        </View>
      </View>
      <Text className="text-xl text-[#00011B] font-medium mt-6 text-center">
        How can Monae help you
      </Text>

      {/* Quick Action Buttons */}
      <View className="mt-12 gap-3 flex-1">
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center"
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: action.color }}
            >
              <Text className="text-xl">{action.icon}</Text>
            </View>
            <Text className="text-[#00011B] text-base flex-1">
              {action.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat Input */}
      <View className="mb-10">
        <View className="flex-row items-center border border-gray-200 rounded-t-xl px-4 py-6">
          <TouchableOpacity className="mr-3">
            <FontAwesome6 name="paperclip" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Chat with Monae"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-base text-[#00011B]"
          />
          <TouchableOpacity className="ml-3">
            <FontAwesome6 name="microphone" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Sparkles;
