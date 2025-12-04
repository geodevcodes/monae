import Search from "@/components/Search";
import { paymentData } from "@/lib/data/paymentData";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentsDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: payment, isLoading } = useQuery({
    queryKey: ["payment", id],
    queryFn: () => paymentData.find((item) => item.id === id),
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#ff6600" />;
  }

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
      <View className="flex gap-3 pb-3">
        <Text className="text-black font-bold text-2xl">{payment?.name}</Text>
        {payment?.description && (
          <Text className="text-gray-500 text-sm">{payment.description}</Text>
        )}
      </View>

      {/* Search */}
      <View className="mt-2 mb-2 gap-3">
        <View>
          <Search placeholder="Name, phone or account number..." />
        </View>
      </View>
      <View className="my-3">
        <Text className="text-sm text-gray-600 mb-2">Your phone number</Text>
        <TouchableOpacity className="flex flex-row items-center justify-between py-3 rounded-xl">
          <View className="flex flex-row items-center gap-3">
            <View className="p-3 rounded-full bg-purple-200 border border-purple-400">
              <SimpleLineIcons
                name="screen-smartphone"
                size={18}
                color="#9333ea"
              />
            </View>
            <View className="gap-2">
              <Text className="text-xs text-gray-600">Rasheed</Text>
              <Text className="text-xs text-gray-600">+234 ***** 2798</Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
      </View>
      {/* Allow Access */}
      <View className="mt-4">
        <Text className="text-sm text-gray-600 mb-2">Your Contacts</Text>
        <View className="border border-slate-200 p-3 pt-4 pl-4  rounded-lg">
          <View className="flex flex-col gap-3 items-center">
            <AntDesign name="user" size={24} color="#6b7280" />
            <Text className="text-black/90 text-sm">
              To use your contacts, allow the app to access your contacts.
            </Text>
          </View>
          <Text className="text-center text-[#ff6600] font-semibold mt-5 mb-1">
            Allow access
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentsDetails;
