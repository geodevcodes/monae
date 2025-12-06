import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="pin-screen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cta-screen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth-screen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verify-email"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" animated backgroundColor="#ff6600" />
    </>
  );
}
