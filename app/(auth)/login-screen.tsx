import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import OAuth from "@/components/OAuth";
import { EMAIL_REGEX } from "@/lib/lib";
import { AuthContext } from "@/providers/AuthProvider";
import { useLogin } from "@/services/auth/authService";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { control, handleSubmit, getValues } = useForm();
  const { mutateAsync: loginUser, isPending } = useLogin();
  const auth = useContext(AuthContext)!;
  const router = useRouter();

  // Login user Handler
  const onSignInPress = async () => {
    const { email, password } = getValues();
    await loginUser(
      { payload: { email, password } },
      {
        onSuccess: () => {
          router.push("/(private)/(tabs)/home");
        },
      }
    );
    await auth.refreshAuthState();
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full px-8 mt-4">
          <Text className="text-2xl font-semibold text-[#232429] mt-16">
            Welcome Back
          </Text>
          <Text className="text-base text-[#535862]">
            Sign in to start tracking your money with AI.
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

          <Link
            href="/(auth)/forgot-password"
            className="text-sm text-[#5F61F5] mt-4 w-32 ml-auto"
          >
            Forgot Password?
          </Link>
          <CustomButton
            title={isPending ? "Authenticating..." : "Continue"}
            handlePress={handleSubmit(onSignInPress)}
            className="mt-7 bg-[#444CE7] rounded-3xl"
            textStyles="text-white"
          />
          <OAuth title="Sign In with Google" />
          <View className="flex justify-center pt-5 flex-row gap-2 absolute -bottom-72 left-0 right-0">
            <Text className="text-lg text-[#414242] font-poppins-regular">
              Don’t have an account?
            </Text>
            <Link
              href="/(auth)/signup-screen"
              className="text-lg font-semibold text-[#4E43EA]"
            >
              Create Account
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
