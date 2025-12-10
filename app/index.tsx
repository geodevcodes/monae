import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [tokenExists, setTokenExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setTokenExists(!!token);
      } catch (error) {
        console.error("Error reading token:", error);
        setTokenExists(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return tokenExists ? (
    <Redirect href="/(auth)/login-screen" />
  ) : (
    <Redirect href="/(auth)/cta-screen" />
  );
}
