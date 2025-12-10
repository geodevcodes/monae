import React from "react";
import { Image, Text, View } from "react-native";

interface EmptyStateProps {
  title?: string;
  imageUrl: any;
}
const EmptyState = ({ title, imageUrl }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4 mt-32">
      <Image
        source={imageUrl}
        resizeMode="contain"
        className="w-[200px] h-[150px]"
      />
      <Text className="text-center font-medium text-xl">{title}</Text>
    </View>
  );
};

export default EmptyState;
