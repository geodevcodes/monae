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
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) return;
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
      if (!isErrorWithCode(error)) return;

      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showErrorToast("Google Play Services not available");
          break;
        default:
          showErrorToast();
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
