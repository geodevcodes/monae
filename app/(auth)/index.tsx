import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const HAS_SEEN_CTA_KEY = "has_seen_cta";

export default function AuthIndex() {
  const [loading, setLoading] = useState(true);
  const [hasSeenCta, setHasSeenCta] = useState<boolean | null>(null);

  useEffect(() => {
    const checkCta = async () => {
      try {
        const seen = await AsyncStorage.getItem(HAS_SEEN_CTA_KEY);
        setHasSeenCta(seen === "true");
      } catch {
        setHasSeenCta(false);
      } finally {
        setLoading(false);
      }
    };

    checkCta();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return hasSeenCta ? (
    <Redirect href="/(auth)/login-screen" />
  ) : (
    <Redirect href="/(auth)/cta-screen" />
  );
}
