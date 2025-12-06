import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CtaScreen() {
  return (
    <SafeAreaView className="flex h-full items-center justify-between px-7 bg-[#070933]">
      <View className="flex items-center justify-center p-5">
        <View>
          <MaskedView
            style={{ width: 420, height: 420, zIndex: 1, marginTop: 32 }}
            maskElement={
              <LinearGradient
                colors={[
                  "rgba(255,255,255,1)",
                  "rgba(255,255,255,1)",
                  "rgba(255,255,255,0)",
                ]}
                locations={[0, 0.75, 1]}
                style={{ flex: 1, width: "100%", height: "100%" }}
                start={[0.5, 0]}
                end={[0.5, 1]}
              />
            }
          >
            <Image
              source={images.onboarding1}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                opacity: 0.98,
              }}
            />
          </MaskedView>
        </View>

        <View className="mt-12 px-2">
          <Text className="text-4xl text-center font-semibold text-[#FFFFFF]">
            Hi, I’m Monae 👋
          </Text>
          <Text className="text-center mt-4 text-lg text-[#FFFFFF]">
            Your smart personal finance assistant here to help you stay in
            control of your money.
          </Text>
        </View>
      </View>

      <CustomButton
        title={"Get Started"}
        handlePress={() => router.push("/(auth)/welcome")}
        textStyles="text-[#ffffff] font-medium"
        className="w-11/12 mt-10 mb-5 mx-auto bg-[#4E43EA]"
      />
    </SafeAreaView>
  );
}
