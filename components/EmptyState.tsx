import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface EmptyStateProps {
  title: string;
  subTitle: string;
  imageUrl: any;
  buttonName: string;
  onPress?: () => void;
}
const EmptyState = ({
  title,
  subTitle,
  imageUrl,
  buttonName,
  onPress,
}: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image
        source={imageUrl}
        resizeMode="contain"
        className="w-[240px] h-[185px]"
      />
      <Text className="text-center font-semibold text-2xl mt-6">{title}</Text>
      <Text className="text-center text-sm text-slate-500 mt-3 mb-2">
        {subTitle}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="bg-[#ff6600] rounded-lg flex flex-row justify-center items-center min-w-[160px] my-5"
      >
        <Text className="text-white p-2 py-3 text-center font-semibold text-xl ">
          {buttonName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
