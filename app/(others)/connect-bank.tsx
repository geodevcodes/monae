import CustomButton from "@/components/CustomButton";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ConnectBank = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white h-full">
      <View className="flex-1 px-8 justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="max-w-[30px] border border-[#A9AEB7] rounded-lg p-1.5 mt-16"
        >
          <View className="flex flex-row items-center justify-between gap-3">
            <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
          </View>
        </TouchableOpacity>
        <View className="mt-6">
          <Text className="text-black font-semibold text-xl">
            Connect Your Bank
          </Text>
          <Text className="text-lg text-[#535862] mt-3">
            Let’s connect your bank to track your spending in real time
          </Text>
        </View>

        {/* Middle Content */}
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

        {/* Bottom Button */}
        <CustomButton
          title="Connect my Bank"
          className="mb-32 rounded-3xl bg-[#444CE7]"
          textStyles="text-white font-medium"
        />
      </View>
    </SafeAreaView>
  );
};

export default ConnectBank;
