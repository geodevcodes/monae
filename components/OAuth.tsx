import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";
import { GOOGLE_CONFIG } from "@/lib/lib";
import { showErrorToast } from "@/lib/toast/toast";
import { AuthContext } from "@/providers/AuthProvider";
import { useGoogleLogin } from "@/services/auth/authService";
import { GoogleLoginType, OAuthProps } from "@/types/authType";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, View } from "react-native";

const mapGoogleUserToPayload = (user: any): GoogleLoginType => ({
  firstName: user.givenName ?? "",
  lastName: user.familyName ?? "",
  email: user.email,
  avatarImage: user.photo ?? "",
  googleId: user.id,
  isVerified: true,
});

const OAuth = ({ title }: OAuthProps) => {
  const { mutateAsync: googleLoginUser, isPending } = useGoogleLogin();
  const auth = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure(GOOGLE_CONFIG);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google Sign In...");
     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
     console.log("Play Services available");
      const response = await GoogleSignin.signIn();
       console.log("Sign in response:", response);

       if (!isSuccessResponse(response)) {
         console.log("Sign in was not successful");
         return;
       }
      const payload = mapGoogleUserToPayload(response.data.user);
      await googleLoginUser(
        { payload },
        {
          onSuccess: () => router.push("/(private)/(tabs)/home"),
          onError: (error: any) =>
            showErrorToast(
              error.response?.data?.message ?? "Something went wrong"
            ),
        }
      );

      await auth.refreshAuthState();
    } catch (error) {
      console.error("Google Sign In Error:", error);

      if (!isErrorWithCode(error)) {
        console.error("Unknown error type:", error);
        return;
      }

      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          showErrorToast("Sign in cancelled");
          break;
        case statusCodes.IN_PROGRESS:
          showErrorToast("Sign in already in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showErrorToast("Google Play Services not available");
          break;
        default:
          showErrorToast(`Error: ${error.code} - ${error.message}`);
      }
    }
  };

  return (
    <View>
      <CustomButton
        title={isPending ? "Authenticating..." : title}
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
