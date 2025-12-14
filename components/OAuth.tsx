import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { Image, View } from "react-native";

interface OAuthProps {
  title: string;
}

const OAuth = ({ title }: OAuthProps) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "621054984778-13up9fca031st6qbsnki516a8ioa8b5f.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      accountName: "Monae",
      iosClientId:
        "621054984778-j2ashj7ghg9em8hq28l6bev1f9np6vca.apps.googleusercontent.com",
      profileImageSize: 120,
    });
  }, []);

  // Somewhere in your code
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        // setState({ userInfo: response.data });
        console.log({ userInfo: response.data }, "this is the data");
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <View>
      <CustomButton
        title={title}
        className="mt-5 w-full flex items-center justify-center shadow-none rounded-3xl border-[1px] border-[#94969B]"
        textStyles="text-[#414651] font-semibold"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        handlePress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
