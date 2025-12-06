import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress?: () => void;
  className?: string;
  textStyles?: string;
  style?: any;
  isLoading?: boolean;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  withInnerBorder?: boolean;
}
const CustomButton = ({
  title,
  handlePress,
  className,
  textStyles,
  style,
  IconLeft,
  IconRight,
  isLoading,
  withInnerBorder = true,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[56px] flex flex-row justify-center items-center text-center ${className} ${
        isLoading ? "opacity-50" : ""
      }`}
      style={style}
      disabled={isLoading}
    >
      {withInnerBorder && (
        <View className="absolute inset-[1px] rounded-xl border-2 border-white/20" />
      )}

      {IconLeft && <IconLeft />}
      <Text className={`font-poppins-semibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
