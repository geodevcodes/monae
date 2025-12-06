// import { useOAuth } from "@clerk/clerk-expo";
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";
// import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
  //   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    // const result = await googleOAuth(startOAuthFlow);

    // if (result.code === "session_exists") {
    //   Alert.alert("Success", "Session exists. Redirecting to home screen.");
    //   router.replace("/(tabs)/home");
    // }

    // Alert.alert(result.success ? "Success" : "Error", result.message);
    // Alert.alert("User signed in successfully");
    router.replace("/(auth)/verify-email");
  };

  return (
    <View>
      <CustomButton
        title="Sign In with Google"
        className="mt-5 w-full flex items-center justify-center shadow-none rounded-3xl border-[1px] border-[#94969B]"
        textStyles="text-[#414651] font-semibold"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        handlePress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
