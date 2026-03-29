// import { Session } from "@supabase/supabase-js";
import { apiClient } from "@/services/http/api";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { storage } from "./(auth)/login";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      console.log("Checking auth session...");

      const token = storage.getString("token");
      console.log("[GLOBAL LAYOUT]: Token =>", token);
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await apiClient.get("/auth/me");
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Error checking auth session:", error);
        setIsAuthenticated(false);
      }
    };

    init();
  }, [router]);

  useEffect(() => {
    if (isAuthenticated === null) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      console.log("Redirecting to login...");
      router.replace("/(auth)/login");
    }

    if (isAuthenticated && inAuthGroup) {
      console.log("Redirecting to home...");
      router.replace("/(tabs)");
    }

  }, [segments, isAuthenticated, router]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <KeyboardProvider>
      <StatusBar style={"light"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </KeyboardProvider>
  );
}
