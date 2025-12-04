import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link } from "expo-router";

const ForgotPassword = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmitHandler = async (data: any) => {
    setSubmitting(true);
    console.log(data.email, "this is email here==");
    try {
      // router.replace("/pin-screen");
    } catch (error: any) {
      console.log(error, "error occurred here==");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full px-8 mt-20">
          <Text className="text-3xl font-semibold mt-16 font-poppins-semibold">
            Forgot Password
          </Text>
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-300 font-poppins-regular">
              Remember Password?
            </Text>
            <Link
              href="/pin-screen"
              className="text-lg font-poppins-semibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
