import icons from "@/constants/icons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { FormFieldProps } from "@/types/type";

const FormField = ({
  title,
  secureTextEntry,
  placeholder,
  otherStyles,
  control,
  name,
  rules,
  keyboardType,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          formState: { errors },
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className={`space-y-2 ${otherStyles}`}>
                <Text className="text-lg text-[#232429] font-light mb-2">
                  {title}
                </Text>

                <View className="w-full h-16 px-4 bg-black-100 rounded-xl border border-[#E4E6E9] flex flex-row items-center">
                  <TextInput
                    className="flex-1 text-[#2C3B46] font-poppins-semibold text-base"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    keyboardType={keyboardType}
                    secureTextEntry={
                      (title === "Password" || title === "Confirm Password") &&
                      !showPassword
                    }
                    {...props}
                  />

                  {(title === "Password" || title === "Confirm Password") && (
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {errors[name]?.message && (
                  <Text className="text-red-500">
                    {String(errors[name]?.message)}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )}
        name={name}
      />
    </>
  );
};

export default FormField;
