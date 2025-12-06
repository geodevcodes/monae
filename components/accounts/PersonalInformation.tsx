import images from "@/constants/images";
import { professionalInfoData } from "@/lib/data/accountData";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../CustomButton";
import FormField from "../FormField";

const PersonalInformation = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [showEdit, setShowEdit] = useState(true);
  return (
    <View>
      {!showEdit ? (
        <>
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
          {professionalInfoData?.map((item, index) => (
            <View key={index} className="border-b border-[#F5F6F6] pt-4 pb-3">
              <TouchableOpacity
                onPress={() => setShowEdit(true)}
                className="flex flex-row items-center justify-between py-3 rounded-xl"
              >
                <View className="flex flex-row items-center gap-3">
                  <View className="gap-1">
                    <Text className="text-base font-medium text-gray-600">
                      {item.title}
                    </Text>
                    <Text className="text-xs text-gray-600">
                      {item.description}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </>
      ) : (
        <>
          {/* Edit Professional Information */}
          <SafeAreaView className="bg-white h-full">
            <View className="flex-1 justify-between">
              <View>
                <Text className="text-black font-semibold text-xl">Name</Text>
                <Text className="text-lg text-[#535862] mt-3">
                  Update your display name or legal name associated with your
                  account.
                </Text>

                <View>
                  <FormField
                    title="First Name"
                    control={control}
                    name="text"
                    rules={{
                      required: "first name is required",
                      minLength: {
                        value: 3,
                        message:
                          "first name should be minimum 6 characters long",
                      },
                    }}
                    placeholder="Christiana |"
                    keyboardType="email-address"
                    otherStyles="mt-7"
                  />

                  <FormField
                    title="Last Name"
                    control={control}
                    name="text"
                    rules={{
                      required: "last name is required",
                      minLength: {
                        value: 3,
                        message:
                          "last name should be minimum 6 characters long",
                      },
                    }}
                    placeholder="Perry"
                    keyboardType="email-address"
                    otherStyles="mt-7"
                  />
                </View>
              </View>
              <CustomButton
                title="Save Changes"
                handlePress={() => setShowEdit(false)}
                className="mb-32 rounded-3xl bg-[#444CE7]"
                textStyles="text-white font-medium"
              />
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default PersonalInformation;
