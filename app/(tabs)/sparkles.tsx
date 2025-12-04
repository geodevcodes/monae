import { paymentData } from "@/lib/data/paymentData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Sparkles = () => {
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const titleStyle = useAnimatedStyle(() => {
    const isCentered = scrollY.value > 10;
    return {
      transform: [
        {
          translateX: withTiming(isCentered ? width / 2 - 80 : 0, {
            duration: 300,
          }),
        },
      ],
      opacity: withTiming(isCentered ? 0.85 : 1, { duration: 300 }),
      fontSize: withTiming(isCentered ? 20 : 30, { duration: 300 }),
    };
  });

  return (
    <SafeAreaView className="px-5 pt-6 pb-8">
      <View className="flex flex-row items-center justify-between gap-3 h-14">
        <Animated.Text
          style={[
            titleStyle,
            {
              fontWeight: "bold",
              color: "black",
            },
          ]}
        >
          Payments
        </Animated.Text>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-col mt-4">
          {paymentData.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/(others)/payments-details/${item.id}`)
              }
              key={index}
              className="flex flex-row items-center justify-between py-3"
            >
              <View className="flex flex-row items-center gap-3">
                <View
                  style={{
                    backgroundColor: item.bg,
                    borderColor: item.borderColor,
                    borderWidth: 1,
                  }}
                  className="p-3 rounded-full"
                >
                  {item.icon}
                </View>
                <Text className="text-base font-rubik-medium text-gray-600">
                  {item.name}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Sparkles;
