import CustomButton from "@/components/CustomButton";
import { useConnectBank } from "@/services/connect-bank/connect-bank";
import { useUserProfile } from "@/services/settings/settingsService";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { MonoProvider, useMonoConnect } from "@mono.co/connect-react-native";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ConnectBankContent() {
  const router = useRouter();
  const { init } = useMonoConnect();

  const handleConnect = useCallback(async () => {
    try {
      await init();
    } catch (err) {
      console.error("Failed to open Mono Connect:", err);
    }
  }, [init]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-16 border border-[#A9AEB7] rounded-lg p-1.5 w-[30px]"
        >
          <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
        </TouchableOpacity>

        {/* Header */}
        <View className="mt-6">
          <Text className="text-black font-semibold text-xl">
            Connect Your Bank
          </Text>
          <Text className="text-lg text-[#535862] mt-3">
            Let's connect your bank to track your spending
          </Text>
        </View>

        {/* Icons */}
        <View className="flex-1 justify-center items-center">
          <View className="flex-row items-center gap-3">
            <AntDesign name="medium" size={24} color="#CDD1D4" />
            <Feather name="arrow-right" size={24} color="#CDD1D4" />
            <FontAwesome name="institution" size={24} color="#CDD1D4" />
          </View>
          <Text className="mt-6 text-lg px-10 text-[#646B76] text-center">
            Monae only sees your data. We never move or touch your money.
          </Text>
        </View>

        {/* Custom Button */}
        <CustomButton
          title="Connect my Bank"
          className="mb-32 rounded-3xl bg-[#444CE7]"
          textStyles="text-white font-medium"
          handlePress={handleConnect}
        />
      </View>
    </SafeAreaView>
  );
}

// Main component that provides MonoProvider
export default function ConnectBank() {
  const [connecting, setConnecting] = useState(false);
  const { mutate: connectBank } = useConnectBank();
  const { data: profileData } = useUserProfile();
  const userProfile =
    (profileData && (profileData.data ?? profileData)) || null;
  const fullName =
    `${userProfile?.lastName ?? ""} ${userProfile?.firstName ?? ""}`.trim() ||
    "Monae";

  const handleSuccess = useCallback(
    (data: any) => {
      if (connecting) return;
      setConnecting(true);
      const code = data.getAuthCode();
      if (!code) {
        setConnecting(false);
        return;
      }
      connectBank(code, {
        onSettled: () => setConnecting(false),
      });
    },
    [connectBank, connecting]
  );

  const monoConfig = useMemo(
    () => ({
      publicKey: process.env.EXPO_PUBLIC_MONO_PUBLIC_KEY!,
      scope: "auth",
      data: {
        customer: {
          name: fullName,
          email: `${userProfile?.email}`,
        },
      },
      onClose: () => console.log("Widget closed"),
      onEvent: (eventName: string, data: any) =>
        console.log("Mono Event:", eventName, data),
      onSuccess: handleSuccess,
    }),
    [handleSuccess]
  );

  return (
    <MonoProvider {...monoConfig}>
      <ConnectBankContent />
    </MonoProvider>
  );
}
