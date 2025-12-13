import icons from "@/constants/icons";
import { avatarPlaceholderUrl } from "@/lib/lib";
import { useUserProfile } from "@/services/settings/settingsService";
import { Ionicons } from "@expo/vector-icons";
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
        focused ? "text-[#5B5FED] " : "text-[#666876] font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const { data: profileData } = useUserProfile();
  const userProfile =
    (profileData && (profileData.data ?? profileData)) || null;

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
                  <Image
                    source={focused ? icons.homeBold : icons.home}
                    resizeMode="contain"
                    tintColor={focused ? "#5B5FED" : "#666876"}
                    className={focused ? "size-7 mt-2" : "size-7 mt-2"}
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
                  <Image
                    source={icons.budget}
                    resizeMode="contain"
                    tintColor={focused ? "#5B5FED" : "#666876"}
                    className={focused ? "size-7 mt-2" : "size-7 mt-2"}
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
                  <Image
                    source={icons.analytics}
                    resizeMode="contain"
                    tintColor={focused ? "#5B5FED" : "#666876"}
                    className={focused ? "size-7 mt-2" : "size-7 mt-2"}
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
                      source={
                        userProfile?.avatarImage
                          ? { uri: userProfile.avatarImage }
                          : { uri: avatarPlaceholderUrl }
                      }
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
