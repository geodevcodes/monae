import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import OAuth from "@/components/OAuth";
import { EMAIL_REGEX } from "@/lib/lib";
import { useSignUp } from "@/services/auth/authService";
import { Link, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AuthScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, getValues } = useForm();
  const { mutate: createUser, isPending } = useSignUp();

  // Register user Handler
  const onSignUpPress = async () => {
    const { email, password, confirmPassword } = getValues();

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
      });
      return;
    }

    const payload = {
      email,
      password,
    };
    createUser(
      { payload },
      {
        onSuccess: () => {
          router.push("/(auth)/verify-email");
        },
      }
    );
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full px-8 mt-4">
          <Text className="text-2xl font-semibold text-[#232429] mt-16">
            Let’s get Started
          </Text>
          <Text className="text-base text-[#535862]">
            Sign up to start tracking your money with AI.
          </Text>

          <FormField
            title="Email Address"
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address",
              },
            }}
            placeholder="Enter Email Address"
            keyboardType="email-address"
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be minimum 6 characters long",
              },
            }}
            placeholder="Your Password"
            otherStyles="mt-7"
          />

          <FormField
            title="Confirm Password"
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Confirm Password should be minimum 6 characters long",
              },
            }}
            placeholder="Confirm Password"
            otherStyles="mt-7"
          />

          <Text className="text-sm text-[#808080] pt-5">
            By clicking ‘Continue’, you agree to our Terms of Service and
            Privacy Policy.
          </Text>

          <CustomButton
            title={isPending ? "Creating..." : "Sign Up"}
            handlePress={handleSubmit(onSignUpPress)}
            className="mt-7 bg-[#444CE7] rounded-3xl"
            textStyles="text-white"
          />

          <OAuth />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-[#414242] font-poppins-regular">
              Already have an account?
            </Text>
            <Link
              href="/(auth)/auth-screen"
              className="text-lg font-semibold text-[#4E43EA]"
            >
              Log in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
