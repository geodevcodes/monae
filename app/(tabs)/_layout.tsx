import images from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
          ? "text-[#ff6600] font-rubik-medium"
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
          tabBarActiveTintColor: "#2664A1",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            borderTopColor: "#D1D1D6",
            borderTopWidth: 0.5,
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
                    color={focused ? "#ff6600" : "#666876"}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "products",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Budgets"
                Icon={
                  <AntDesign
                    name="code-sandbox"
                    size={24}
                    color={focused ? "#ff6600" : "#666876"}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="payments"
          options={{
            title: "payments",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Analytics"
                Icon={
                  <MaterialCommunityIcons
                    name="circle-box"
                    size={24}
                    color={focused ? "#ff6600" : "#666876"}
                  />
                }
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="transfers"
          options={{
            title: "transfers",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Accounts"
                Icon={
                  <MaterialCommunityIcons
                    name="chevron-double-right"
                    size={24}
                    color={focused ? "#ff6600" : "#666876"}
                  />
                }
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="transfers"
          options={{
            title: "transfers",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                title="Accounts"
                Icon={
                  <View className="w-9 h-9 rounded-full mt-4">
                    <Image
                      source={images.avatar}
                      resizeMode="contain"
                      className="w-10 h-10 rounded-full"
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
