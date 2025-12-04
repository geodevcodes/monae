import { productsData } from "@/lib/data/productsData";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Products = () => {
  const { width } = Dimensions.get("window");
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
      opacity: withTiming(isCentered ? 0.8 : 1, { duration: 300 }),
      fontSize: withTiming(isCentered ? 20 : 30, { duration: 300 }),
    };
  });

  return (
    <SafeAreaView className="px-5 pt-6 pb-8">
      <View className="flex flex-row items-center justify-between mb-6 h-12">
        <Animated.Text className="text-black font-bold" style={titleStyle}>
          Products
        </Animated.Text>
      </View>

      {/* ScrollView with Reanimated Scroll Handler */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <FlatList
          data={productsData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="flex flex-col mb-4">
              <Text className="text-black font-bold text-xl my-3">
                {item.name}
              </Text>

              <View className="border border-slate-200 rounded-lg pb-5">
                <Image
                  source={item.imageUrl}
                  resizeMode="cover"
                  className="w-full h-[120px] rounded-t-lg mb-4"
                />

                <View className="px-4">
                  <View className="flex flex-row justify-between items-end mr-4">
                    <Text className="text-[#000000] text-base">
                      {item.description}
                    </Text>

                    {item.iconRight && (
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#ff6600"
                      />
                    )}
                  </View>

                  {item.buttonName && (
                    <View className="mt-4 bg-[#f1dcce] border-[0.3px] border-[#ff6600] rounded-lg py-5 px-6">
                      <Text className="text-[#ff6600] font-bold text-center">
                        {item.buttonName}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Products;
