import CustomButton from "@/components/CustomButton";
import { uncategorizedData } from "@/lib/data/spendingData";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UncategorizedSpending = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="px-8 pt-4 pb-2 bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
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
          <Text className="text-black font-semibold text-xl ml-20">
            Uncategorized Spending
          </Text>
        </View>

        <Text className="text-lg text-[#535862] mt-6">
          Help Monae learn where these belong so your finances stay organized
        </Text>

        <View className="flex flex-row gap-3 items-center mt-4">
          <Text className="text-[#535862] font-semibold text-lg">
            Transactions
          </Text>
          <View className="bg-[#EDF2FF] rounded-full w-6 h-6 justify-center items-center">
            <Text className="text-sm text-[#5F61F5] text-center">3</Text>
          </View>
        </View>
        {uncategorizedData.map((item, index) => (
          <View key={index} className="border-b border-[#F5F6F6] pb-8">
            <View>
              <View className="flex flex-row justify-between  py-3.5 rounded-lg gap-3 mt-4">
                <Text className="text-[#535862] text-sm">{item.name}</Text>
                <Text className="text-[#535862] text-sm">{item.createdAt}</Text>
              </View>
              <Text className="text-[#535862] font-semibold text-sm mt-2">
                {item.spendAmount}
              </Text>
            </View>
            <CustomButton
              title="Categorize"
              // handlePress={handleSubmit(onSignInPress)}
              className="mt-6 rounded-3xl bg-[#EDF2FF]"
              textStyles="font-medium text-[#5F61F5]"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UncategorizedSpending;
