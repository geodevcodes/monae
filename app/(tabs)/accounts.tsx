import { settingsData } from "@/lib/data/accountData";
import { useLogout } from "@/services/auth/authService";
import { FontAwesome } from "@expo/vector-icons";
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

const Accounts = () => {
  const { mutate: logout } = useLogout();
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
      fontSize: withTiming(isCentered ? 20 : 24, { duration: 300 }),
      marginLeft: withTiming(isCentered ? -20 : 0, { duration: 300 }),
    };
  });

  return (
    <SafeAreaView className="px-5 pt-4 pb-4 bg-white h-full">
      <View className="flex flex-row items-center justify-between mb-4 h-12">
        <Animated.Text className="text-black font-bold" style={titleStyle}>
          Account Settings
        </Animated.Text>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Unified Rendering  */}
        {settingsData.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mt-6 mb-2 gap-3">
            <Text className="text-sm text-gray-600">{section.section}</Text>
            {section.items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (item.name === "Sign Out") {
                    logout();
                    router.push("/(auth)/login-screen");
                    return;
                  }
                  router.push(`/(others)/account-details/${item.id}`);
                }}
                className="flex flex-row items-center justify-between py-3 rounded-xl"
              >
                <View className="flex flex-row items-center gap-3">
                  <View
                    style={{ backgroundColor: item.bg }}
                    className="p-3 rounded-full"
                  >
                    {item.icon}
                  </View>
                  <View className="gap-1">
                    <Text className="text-base font-medium text-gray-600">
                      {item.name}
                    </Text>
                    <Text className="text-xs text-gray-600">
                      {item.description}
                    </Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={18} color="black" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Danger Zone */}
        <View className="mt-10 mb-2 gap-3">
          <View className="flex-row items-center my-6 w-full">
            <View className="flex-1 border-t border-dashed border-gray-300" />
            <View className="flex-row items-center mx-3">
              <Text className="text-orange-500 text-lg mr-1">⚠️</Text>
              <Text className="text-gray-600 font-medium">Danger Zone</Text>
            </View>
            <View className="flex-1 border-t border-dashed border-gray-300" />
          </View>

          <TouchableOpacity className="flex flex-row items-center justify-between py-3 rounded-xl">
            <View className="flex flex-row items-center gap-3">
              <View className="p-3 rounded-full bg-[#D92D20]">
                <FontAwesome name="trash-o" size={20} color="#FFFFFF" />
              </View>
              <View className="gap-1">
                <Text className="text-base font-medium text-gray-600">
                  Delete Account
                </Text>
                <Text className="text-xs text-gray-600">
                  We don't love to see you leave our platform
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;
