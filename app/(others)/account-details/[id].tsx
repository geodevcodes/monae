import images from "@/constants/images";
import { settingsData } from "@/lib/data/accountData";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
    <SafeAreaView className="px-5 pt-4 pb-2 bg-white h-full">
      <View className="flex flex-row mt-6">
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

      <View className="flex-row justify-center flex mt-5">
        <View className="flex flex-col items-center relative mt-5">
          <Image
            source={images.avatar}
            className="size-40 relative rounded-full"
          />
          <TouchableOpacity className="absolute bottom-20 -right-1 shadow-md bg-[#FFFFFF] p-2 rounded-full">
            <SimpleLineIcons name="pencil" size={16} color="#4E43EA" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#00011B] mt-2">
            Christiana Perrty
          </Text>
          <Text className="text-sm mt-1 text-[#535862]">
            christianaperry@gmail.com
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountDetails;
