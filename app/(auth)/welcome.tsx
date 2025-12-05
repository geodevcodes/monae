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
    <SafeAreaView
      style={{
        backgroundColor: currentItem?.bgColor ?? "#FFFFFF",
      }}
      className="flex h-full items-center justify-between px-7"
    >
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[10px] h-[10px] rounded-full mx-1 bg-[#E2E8F0]" />
        }
        activeDot={
          <View className="w-[10px] h-[10px] mx-1 bg-[#444CE7] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              resizeMode="contain"
              className="w-[419px] h-[300px] mt-8"
            />

            <View className="mt-16">
              <Text
                style={{ color: item.color }}
                className="text-4xl text-center font-semibold"
              >
                {item.title}
              </Text>
              <Text
                style={{ color: item.color }}
                className="text-center mt-4 text-lg"
              >
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Continue"}
        handlePress={() =>
          isLastSlide
            ? router.replace("/(tabs)/home")
            : swiperRef.current?.scrollBy(1)
        }
        textStyles="text-[#ffffff] font-medium"
        className="w-11/12 mt-10 mb-5 mx-auto bg-[#4E43EA]"
      />
    </SafeAreaView>
  );
}
