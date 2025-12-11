import images from "@/constants/images";
import { EMAIL_REGEX } from "@/lib/lib";
import { useFilesUploadRequest } from "@/services/file-upload/files-upload.request";
import {
  useUpdateUserProfile,
  useUserProfile,
} from "@/services/settings/settingsService";
import { UserAvatar } from "@/types/settingsType";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import Toast from "react-native-toast-message";
import CustomButton from "../CustomButton";
import FormField from "../FormField";

const PersonalInformation = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [userAvatar, setUserAvatar] = useState<UserAvatar | null>(null);

  const { data: profileData } = useUserProfile();
  const { mutate: updateUserProfile, isPending } = useUpdateUserProfile();
  const { mutateAsync: filesUploadRequest } = useFilesUploadRequest();

  const userProfile =
    (profileData && (profileData.data ?? profileData)) || null;

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      email: userProfile?.email || "",
      gender: userProfile?.gender || "",
      phoneNumber: userProfile?.phoneNumber || "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: userProfile.email || "",
        gender: userProfile.gender || "",
        phoneNumber: userProfile.phoneNumber || "",
      });
    }
  }, [userProfile]);

  const openPicker = async (selectType: "image" | "video") => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: selectType === "image" ? ["image/*"] : ["video/*"],
        copyToCacheDirectory: true,
      });

      // If user cancels
      if (result.canceled) {
        Toast.show({
          type: "error",
          text1: "Cancelled",
          text2: "You cancelled the file picker",
        });
        return;
      }

      // Success result
      if (result.assets.length > 0) {
        const asset = result.assets[0];
        const pickedFile: UserAvatar = {
          uri: asset.uri,
          name: asset.name,
          type:
            asset.mimeType ??
            (selectType === "image" ? "image/jpeg" : "video/mp4"),
          size: asset.size,
        };
        setUserAvatar(pickedFile);
        Toast.show({
          type: "success",
          text1: "Document picked",
          text2: "Document picked successfully",
        });
        await fileUploadHandler(pickedFile);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to pick document",
      });
    }
  };

  const fileUploadHandler = async (file: UserAvatar) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);

    try {
      const uploadResponse = await filesUploadRequest({ formData });
      if (uploadResponse?.success) {
        const payload = { avatarImage: uploadResponse.data.filesUrl };
        updateUserProfile({ payload }, { onSuccess: () => setShowEdit(false) });
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to upload file, please try again!",
      });
    }
  };

  const onSavePress = async () => {
    const { firstName, lastName, phoneNumber, email, gender } = getValues();
    const payload = { firstName, lastName, phoneNumber, email, gender };
    updateUserProfile({ payload }, { onSuccess: () => setShowEdit(false) });
  };

  return (
    <View>
      {!showEdit ? (
        <>
          <View className="flex-row justify-center flex mt-5">
            <View className="flex flex-col items-center relative mt-5">
              <Image
                source={userAvatar ? { uri: userAvatar.uri } : images.avatar}
                className="size-40 relative rounded-full"
              />
              <TouchableOpacity
                onPress={() => openPicker("image")}
                className="absolute bottom-20 -right-1 shadow-md bg-[#FFFFFF] p-2 rounded-full"
              >
                <SimpleLineIcons name="pencil" size={16} color="#4E43EA" />
              </TouchableOpacity>
              <Text className="text-2xl text-[#00011B] mt-2">
                {!userProfile?.firstName && !userProfile?.lastName
                  ? "Franklin James"
                  : `${userProfile?.firstName}  ${userProfile?.lastName}`}
              </Text>
              <Text className="text-sm mt-1 text-[#535862]">
                {userProfile?.email ?? "joeDoe@gmail.com"}
              </Text>
            </View>
          </View>
          <View className="border-b border-[#F5F6F6] pt-4 pb-3">
            <TouchableOpacity
              onPress={() => setShowEdit(true)}
              className="flex-row items-center justify-between py-3 rounded-xl"
            >
              <View className="flex-row items-center gap-3">
                <View className="gap-1">
                  <Text className="text-base font-medium text-gray-600">
                    Name
                  </Text>
                  <Text className="text-xs text-gray-600">
                    {!userProfile?.firstName && !userProfile?.lastName
                      ? "Franklin James"
                      : `${userProfile?.firstName}  ${userProfile?.lastName}`}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View className="border-b border-[#F5F6F6] pt-4 pb-3">
            <TouchableOpacity
              onPress={() => setShowEdit(true)}
              className="flex-row items-center justify-between py-3 rounded-xl"
            >
              <View className="flex-row items-center gap-3">
                <View className="gap-1">
                  <Text className="text-base font-medium text-gray-600">
                    Phone Number
                  </Text>
                  <Text className="text-xs text-gray-600">
                    {userProfile?.phoneNumber ?? "+23481*****890"}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View className="border-b border-[#F5F6F6] pt-4 pb-3">
            <TouchableOpacity
              onPress={() => setShowEdit(true)}
              className="flex-row items-center justify-between py-3 rounded-xl"
            >
              <View className="flex-row items-center gap-3">
                <View className="gap-1">
                  <Text className="text-base font-medium text-gray-600">
                    Email
                  </Text>
                  <Text className="text-xs text-gray-600">
                    {userProfile?.email ?? "joedoe@gmail.com"}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View className="border-b border-[#F5F6F6] pt-4 pb-3">
            <TouchableOpacity
              onPress={() => setShowEdit(true)}
              className="flex-row items-center justify-between py-3 rounded-xl"
            >
              <View className="flex-row items-center gap-3">
                <View className="gap-1">
                  <Text className="text-base font-medium text-gray-600">
                    Gender
                  </Text>
                  <Text className="text-xs text-gray-600">
                    {userProfile?.gender ?? "Add your gender"}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: 32 }}
        >
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
                name="firstName"
                rules={{
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "First name should be minimum 3 characters long",
                  },
                }}
                placeholder="Christiana |"
                keyboardType="default"
                otherStyles="mt-7"
              />
              <FormField
                title="Last Name"
                control={control}
                name="lastName"
                rules={{
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "Last name should be minimum 3 characters long",
                  },
                }}
                placeholder="Perry"
                keyboardType="default"
                otherStyles="mt-7"
              />
              <FormField
                title="Email Address"
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email address",
                  },
                }}
                placeholder="Enter Email Address"
                keyboardType="email-address"
                otherStyles="mt-7"
              />
              <FormField
                title="Phone Number"
                control={control}
                name="phoneNumber"
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits",
                  },
                  maxLength: {
                    value: 15,
                    message: "Phone number cannot exceed 15 digits",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must contain only digits",
                  },
                }}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                otherStyles="mt-7"
              />
              <FormField
                title="Gender"
                control={control}
                name="gender"
                rules={{
                  required: "Gender is required",
                  minLength: {
                    value: 3,
                    message: "Gender must be Male or Female",
                  },
                }}
                placeholder="Male | Female"
                keyboardType="default"
                otherStyles="mt-7"
              />
            </View>
          </View>
          <CustomButton
            title={isPending ? "Saving..." : "Save Changes"}
            handlePress={handleSubmit(onSavePress)}
            className="mb-32 mt-16 rounded-3xl bg-[#444CE7]"
            textStyles="text-white font-medium"
          />
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default PersonalInformation;
