import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { usePreventScreenCapture } from "expo-screen-capture";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "./global.css";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is Optional.
SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  usePreventScreenCapture();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(others)/account-details" options={{ headerShown: false }} />
        <Stack.Screen name="(others)/account-details/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="(others)/budget-details/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="(others)/create-budget" options={{ headerShown: false }} />
        <Stack.Screen name="(others)/connected-banks" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" animated backgroundColor="#ff6600" />
    </QueryClientProvider>
  );
}
