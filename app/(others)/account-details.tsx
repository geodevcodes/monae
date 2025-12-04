import { activitiesData } from "@/lib/data/activitiesData";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountDetails = () => {
  const [hiddenBalance, setHiddenBalance] = useState(true);
  const router = useRouter();

  return (
    <SafeAreaView className="px-5 pt-4 pb-2">
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
        className="max-w-[50px] flex items-start justify-start mb-4"
      >
        <View className="flex flex-row items-center justify-between gap-3">
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="flex flex-row items-center justify-between mt-4">
          <View className="flex flex-row justify-center gap-2">
            <View className="border-[0.5px] border-gray-300 p-1 px-2 rounded-md flex items-center justify-center">
              <Text className="text-sm font-semibold text-slate-500">
                Savings
              </Text>
            </View>
          </View>
          <View className="border-[0.5px] border-gray-300 flex flex-row items-center justify-center gap-2 p-1 px-2 rounded-md">
            <Text className="text-sm font-semibold text-slate-500">
              0198872766
            </Text>
            <MaterialIcons name="content-copy" size={16} color="#ff6600" />
          </View>
        </View>

        <View className="mt-6 flex flex-row items-center rounded-lg">
          {hiddenBalance ? (
            <>
              <Entypo name="dots-three-horizontal" size={32} color="#000000" />
            </>
          ) : (
            <>
              <Text className="font-bold text-sm mr-1">₦</Text>
              <Text className="font-bold text-3xl">250,000</Text>
              <Text className="font-bold text-xs mb-[1px] ml-0.5">.46</Text>
            </>
          )}
          <TouchableOpacity onPress={() => setHiddenBalance((prev) => !prev)}>
            <Octicons
              name={hiddenBalance ? "eye-closed" : "eye"}
              size={18}
              color="#64748b"
              className="ml-3"
            />
          </TouchableOpacity>
        </View>

        <View className="pt-3 flex flex-row gap-2 rounded-lg">
          <Text className="font-bold text-xs text-slate-500">Book balance</Text>
          {hiddenBalance ? (
            <>
              <Entypo name="dots-three-horizontal" size={18} color="#64748b" />
            </>
          ) : (
            <Text className="font-bold text-xs text-slate-500">
              ₦250,000.46
            </Text>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {activitiesData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.href as any)}
              className="mt-6 mr-3 px-7 py-3.5  bg-[#f1dcce] border-[0.3px] border-[#ff6600] rounded-3xl flex flex-row items-center justify-center gap-3"
            >
              {item.icon}
              <Text className="text-[#ff6600] font-bold text-center">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Account Credentials */}
        <View className="mt-10 gap-3">
          <Text className="text-black font-bold text-xl">
            Account credentials
          </Text>
          <View className="bg-white border border-slate-200 p-4 gap-4 rounded-lg">
            <View className="flex flex-row items-center justify-between">
              <View className="gap-2">
                <Text className="text-sm text-gray-500">Beneficiary</Text>
                <Text className="text-sm text-gray-600">
                  Rasheed Taiwo Olatunde
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("You clicked share!")}
                className=""
              >
                <Entypo name="share" size={20} color="#ff6600" />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center justify-between">
              <View className="gap-2">
                <Text className="text-sm text-gray-500">Account number</Text>
                <Text className="text-sm text-gray-600">0198872763</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account History */}
        <View className="mt-10">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-black font-bold text-xl">
              Account history
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(others)/transactions")}
            >
              <View className="flex flex-row items-center gap-3">
                <Text className="text-gray-500 text-sm">See more</Text>
                <Ionicons name="chevron-forward" size={14} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="bg-white border border-slate-200 p-3 pt-4 pl-4 rounded-lg">
            <Text className="text-gray-400">Latest transactions</Text>
            <View className="flex flex-row gap-3 items-center">
              <View className="border border-gray-200 my-4 rounded-full flex items-center justify-center w-12 h-12">
                <FontAwesome name="clock-o" size={24} color="#6b7280" />
              </View>
              <Text className="text-gray-400">No past transactions</Text>
            </View>
          </View>
        </View>

        <View className="my-10">
          <Text className="text-black font-bold text-xl mb-3">Cards</Text>
          <TouchableOpacity className="flex flex-row items-center justify-between border border-gray-200 bg-white p-4 rounded-lg">
            <View className="flex flex-row items-center gap-3">
              <FontAwesome5 name="credit-card" size={34} color="#ff6600" />
              <View>
                <Text className="text-base text-gray-700">Card</Text>
                <View className="flex flex-row gap-2">
                  <Text className="text-xs text-gray-600">Debit card</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountDetails;
