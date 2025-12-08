import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";
import { MonoProvider, useMonoConnect } from "@mono.co/connect-react-native";
import CustomButton from "@/components/CustomButton";
import {
  FontAwesome6,
  AntDesign,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";

const BACKEND_URL = "https://api-monae-server.vercel.app";

export default function ConnectBank({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const router = useRouter();
  const { init } = useMonoConnect();
  const [loading, setLoading] = useState(false);

  // Required onSuccess handler for MonoProvider
  const handleSuccess = async (data: any) => {
    try {
      setLoading(true);
      const code = data.getAuthCode();
      console.log("Mono code:", code);

      const res = await axios.post(`${BACKEND_URL}/api/v1/mono/exchange`, {
        code,
        userId: currentUserId,
      });

      console.log("Bank connected:", res.data.account);
      alert("Bank connected successfully!");
    } catch (err: any) {
      console.error(
        "Failed to connect bank:",
        err.response?.data || err.message
      );
      alert("Failed to connect bank. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const monoConfig = {
    publicKey:
      process.env.EXPO_PUBLIC_MONO_PUBLIC_KEY || "test_pk_gj3snmxuihzvplt8vuf0",
    scope: "auth",
    data: {}, // no customer ID needed
    onClose: () => console.log("Mono widget closed"),
    onEvent: (eventName: string, data: any) =>
      console.log("Mono Event:", eventName, data),
    onSuccess: handleSuccess,
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      await init(); // opens Mono Connect widget
    } catch (err) {
      console.error("Error opening Mono:", err);
      alert("Failed to open Mono Connect widget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MonoProvider {...monoConfig}>
      <SafeAreaView className="flex-1 bg-white h-full">
        <View className="flex-1 px-8 justify-between">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="max-w-[30px] border border-[#A9AEB7] rounded-lg p-1.5 mt-16"
          >
            <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
          </TouchableOpacity>

          {/* Header */}
          <View className="mt-6">
            <Text className="text-black font-semibold text-xl">
              Connect Your Bank
            </Text>
            <Text className="text-lg text-[#535862] mt-3">
              Let’s connect your bank to track your spending in real time
            </Text>
          </View>

          {/* Middle Icons */}
          <View className="flex-1 justify-center items-center">
            <View className="mt-10 flex flex-row justify-center items-center gap-3">
              <AntDesign name="medium" size={24} color="#CDD1D4" />
              <Feather name="arrow-right" size={24} color="#CDD1D4" />
              <FontAwesome name="institution" size={24} color="#CDD1D4" />
            </View>
            <Text className="text-lg px-10 text-[#646B76] mt-6 text-center">
              Monae only sees your data. We never move or touch your money
            </Text>
          </View>

          {/* Connect Button */}
          <CustomButton
            title="Connect my Bank"
            className="mb-32 rounded-3xl bg-[#444CE7]"
            textStyles="text-white font-medium"
            handlePress={handleConnect}
            isLoading={loading}
          />
        </View>
      </SafeAreaView>
    </MonoProvider>
  );
}
