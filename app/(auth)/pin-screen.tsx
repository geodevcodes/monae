import images from "@/constants/images";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PinScreen = () => {
  const router = useRouter();
  const [pin, setPin] = useState("");

  const handlePress = (value: any) => {
    if (pin.length < 6) {
      const newPin = pin + value;
      setPin(newPin);

      if (newPin.length === 6) {
        // router.replace("/(private)/(tabs)/home");
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "<"],
  ];

  return (
    <SafeAreaView className="flex items-center justify-between h-full bg-[#ECEEF2] pt-20">
      <View className="flex items-center">
        {/* User Icon */}
        <View className="w-20 h-20 rounded-full bg-white items-center justify-center mb-6">
          <Image
            source={images.brandLogo}
            resizeMode="contain"
            className="w-[115px]"
          />
        </View>
        {/* Enter Password */}
        <Text className="text-gray-600 text-base mb-5">Enter password</Text>
        {/* Dots */}
        <View className="flex-row gap-6 mb-16">
          {[...Array(6)].map((_, i) => (
            <View
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < pin.length ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          ))}
        </View>
      </View>

      {/* Keypad */}
      <View className="w-full h-fit -mt-40 px-8 borde border-blue-50">
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between mb-12">
            {row.map((item, index) => (
              <TouchableOpacity
                key={index}
                disabled={item === ""}
                onPress={() =>
                  item === "<" ? handleDelete() : handlePress(item as any)
                }
                className="flex-1 items-center"
              >
                {item === "<" ? (
                  <Feather name="delete" size={24} color="#374151" />
                ) : (
                  <Text className="text-3xl text-gray-700">{item}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Forgot Password */}
      <View className="mb-10">
        <Link href="/forgot-password">
          <Text className="text-orange-600 mt-10">Forgot password?</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default PinScreen;
