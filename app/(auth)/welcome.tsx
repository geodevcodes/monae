import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/lib/data/onboardingData";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = onboarding[activeIndex];
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-[#E8ECF9]">
      <View className="flex-[0.55] items-center justify-center">
        <Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={false}
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} className="items-center justify-center pt-10">
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: 0.98,
                }}
              />
            </View>
          ))}
        </Swiper>
      </View>
      <View className="flex-[0.45] bg-white px-7 pt-10 pb-6 flex-col">
        <View className="flex-1">
          <View className="flex-row justify-center mb-6">
            {onboarding.map((_, index) => (
              <View
                key={index}
                className={`w-[10px] h-[10px] rounded-full mx-1 ${
                  activeIndex === index ? "bg-[#444CE7]" : "bg-[#CBD5E1]"
                }`}
              />
            ))}
          </View>

          <Text className="text-2xl text-center font-semibold text-[#181D27]">
            {currentItem.title}
          </Text>
          <Text
            style={{ color: currentItem.color }}
            className="text-center mt-4 font-light text-xl px-6"
          >
            {currentItem.description}
          </Text>
        </View>
        <CustomButton
          title={isLastSlide ? "Get Started" : "Continue"}
          handlePress={() =>
            isLastSlide
              ? router.replace("/(auth)/signup-screen")
              : swiperRef.current?.scrollBy(1)
          }
          textStyles="text-white font-medium"
          className="w-full bg-[#444CE7] mb-32"
        />
      </View>
    </SafeAreaView>
  );
}
