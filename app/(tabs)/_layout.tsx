import images from "@/constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  focused,
  Icon,
  title,
  isCenter,
}: {
  focused: boolean;
  Icon: React.ReactNode;
  title: string;
  isCenter?: boolean;
}) => (
  <View
    className={`items-center justify-center ${
      isCenter ? "-mt-8" : "pt-4"
    }`}
  >
    <View className={`${isCenter ? "" : "mb-1"}`}>{Icon}</View>

    {!isCenter && (
      <Text
        className={`${
          focused ? "text-[#5B5FED] font-medium" : "text-gray-400 font-rubik"
        } text-xs w-full text-center`}
      >
        {title}
      </Text>
    )}
  </View>
);


const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            minHeight: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Home"
                Icon={
                  <Octicons
                    name="home-fill"
                    size={24}
                    color={focused ? "#5B5FED" : "#9CA3AF"}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="budgets"
          options={{
            title: "budgets",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Budgets"
                Icon={
                  <MaterialCommunityIcons
                    name="calendar-check-outline"
                    size={24}
                    color={focused ? "#5B5FED" : "#9CA3AF"}
                  />
                }
              />
            ),
          }}
        />

        <Tabs.Screen
          name="sparkles"
          options={{
            title: "sparkles",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title=""
                isCenter={true}
                Icon={
                  <View className="w-16 h-16 rounded-full bg-[#5B5FED] items-center justify-center shadow-xl">
                    <Ionicons name="sparkles" size={26} color="white" />
                  </View>
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "analytics",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Analytics"
                Icon={
                  <Ionicons
                    name="stats-chart-outline"
                    size={24}
                    color={focused ? "#5B5FED" : "#9CA3AF"}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: "accounts",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Accounts"
                Icon={
                  <View className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      source={images.avatar}
                      resizeMode="cover"
                      className="w-full h-full"
                    />
                  </View>
                }
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" animated backgroundColor="#ff6600" />
    </>
  );
};

export default TabsLayout;
