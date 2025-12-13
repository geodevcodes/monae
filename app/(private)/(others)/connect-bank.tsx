import CustomButton from "@/components/CustomButton";
import { useConnectBank } from "@/services/connect-bank/connect-bank";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import {
  MonoConnectButton,
  MonoProvider,
  useMonoConnect,
} from "@mono.co/connect-react-native";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConnectBank() {
  const router = useRouter();
  const { init } = useMonoConnect();
  const { mutate: connectBank } = useConnectBank();

  const handleSuccess = useCallback(
    (data: any) => {
      const code = data.getAuthCode();
      console.log("Mono code:", code);
      connectBank({ payload: { code } });
    },
    [connectBank]
  );

  const monoConfig = {
    publicKey: process.env.EXPO_PUBLIC_MONO_PUBLIC_KEY!,
    scope: "auth",
    data: {
      customer: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
    },
    onClose: () => console.log("Widget closed"),
    onEvent: (eventName: string, data: any) =>
      console.log("Mono Event:", eventName, data),
    onSuccess: handleSuccess,
  };

  const handleConnect = useCallback(async () => {
    try {
      await init(); // This should open the Mono widget
    } catch (err) {
      console.error("Failed to open Mono Connect:", err);
    }
  }, [init]);

  return (
    <MonoProvider {...monoConfig}>
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

          {/* Only use CustomButton - remove MonoConnectButton */}
          <CustomButton
            title="Connect my Bank"
            className="mb-32 rounded-3xl bg-[#444CE7]"
            textStyles="text-white font-medium"
            handlePress={handleConnect} // opens Mono modal olatunde336@gmail.com
          />
        </View>
      </SafeAreaView>
    </MonoProvider>
  );
}
