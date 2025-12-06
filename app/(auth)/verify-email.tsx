import CustomButton from "@/components/CustomButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleChange = (value: any, index: any) => {
    if (/^\d$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
      if (index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      const updated = [...otp];
      updated[index] = "";
      setOtp(updated);
    }
  };

  return (
    <SafeAreaView className="pt-4 pb-4 bg-white h-full">
      <ScrollView>
        <View className="w-full px-8">
          <TouchableOpacity
            onPress={() => router.push("/(auth)/auth-screen")}
            activeOpacity={0.7}
            className="max-w-[30px] border border-[#A9AEB7] rounded-lg p-1.5 mt-16"
          >
            <View className="flex flex-row items-center justify-between gap-3">
              <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
            </View>
          </TouchableOpacity>
          <View className="mt-6">
            <Text className="text-black font-semibold text-xl">
              Check your email
            </Text>
            <Text className="text-base text-[#535862] mt-6">
              We’ve sent a 5-digit code to christianabella@email.com. Kindly go
              to your email and enter the code below to verify your email.
            </Text>
            <Text className="text-base text-[#4E43EA] mt-3">Wrong email?</Text>
          </View>
          {/* OTP Input */}
          <View className="flex-row justify-between mt-10">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                placeholder="-"
                placeholderTextColor="#A9AEB7"
                className="w-14 h-14 border border-[#D0D5DD] rounded-xl text-center text-2xl text-[#1D2939] font-semibold"
              />
            ))}
          </View>

          <CustomButton
            title="Verify"
            handlePress={() => router.push("/(tabs)/home")}
            className="mt-16 rounded-3xl bg-[#444CE7]"
            textStyles="text-white font-medium"
          />
          <View className="pt-5 flex-row gap-2">
            <Text className="text-base text-[#414242] font-poppins-regular">
              Didn’t get the code? Resend in 20s
            </Text>
            {/* <Link href="/" className="text-lg font-semibold text-[#4E43EA]">
            Resend
          </Link> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyEmail;
