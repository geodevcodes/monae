import images from "@/constants/images";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  focused,
  Icon,
  title,
}: {
  focused: boolean;
  Icon: React.ReactNode;
  title: string;
}) => (
  <View className="mt-3 items-center">
    {Icon}
    <Text
      className={`${
        focused
          ? "text-[#5B5FED] font-rubik-medium"
          : "text-[#666876] font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
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
                  <Entypo
                    name="home"
                    size={24}
                    color={focused ? "#5B5FED" : "#666876"}
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
                    color={focused ? "#5B5FED" : "#666876"}
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
                    color={focused ? "#5B5FED" : "#666876"}
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
                  <View className="w-8 h-8 mt-2 rounded-full overflow-hidden">
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
      <StatusBar style="auto" animated backgroundColor="#5B5FED" />
    </>
  );
};

export default TabsLayout;
