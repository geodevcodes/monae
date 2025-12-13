import { AuthContext, AuthProvider } from "@/providers/AuthProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import "./global.css";

SplashScreen.preventAutoHideAsync();

// Set the animation options. This is Optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

function RootNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext)!;

  if (loading) {
    return null; // splash screen still showing
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(private)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <AuthProvider>
      <TanstackProvider>
        <RootNavigator />
        <StatusBar style="auto" animated backgroundColor="#EDF2FF" />
        <Toast />
      </TanstackProvider>
    </AuthProvider>
  );
}
