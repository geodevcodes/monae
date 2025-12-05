import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress?: () => void;
  className?: string;
  textStyles?: string;
  style?: any;
  isLoading?: boolean;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
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
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] flex flex-row justify-center items-center text-center ${className} ${
        isLoading ? "opacity-50" : ""
      }`}
      style={style}
      disabled={isLoading}
    >
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
