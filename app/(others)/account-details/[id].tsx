import PersonalInformation from "@/components/accounts/PersonalInformation";
import Personalisation from "@/components/accounts/Personalisation";
import Security from "@/components/accounts/Security";
import Subscription from "@/components/accounts/Subscription";
import { settingsData } from "@/lib/data/accountData";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings", id],
    queryFn: () => {
      const allItems = settingsData.flatMap((section) => section.items);
      return allItems.find((item) => item.id === id);
    },
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#ff6600" />;
  }

  return (
    <SafeAreaView className="px-8 pt-4 pb-2 bg-white h-full">
      <View className="flex flex-row items-center mt-4 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="max-w-[50px] flex items-start justify-start border border-[#A9AEB7] rounded-lg p-1.5"
        >
          <View className="flex flex-row items-center justify-between gap-3">
            <FontAwesome6 name="arrow-left-long" size={16} color="#414349" />
          </View>
        </TouchableOpacity>
        <Text className="text-black font-semibold text-xl ml-24">
          {settings?.name}
        </Text>
      </View>

      <View>
        {settings?.name === "Personal Information" && <PersonalInformation />}
        {settings?.name === "Security Settings" && <Security />}
        {settings?.name === "Personalisation" && <Personalisation />}
        {settings?.name === "Manage Subscription" && <Subscription />}
      </View>
    </SafeAreaView>
  );
};

export default AccountDetails;
