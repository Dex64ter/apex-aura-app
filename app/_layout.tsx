// import { Session } from "@supabase/supabase-js";
import { apiClient } from "@/services/http/api";
import { storage } from "@/storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const token = storage.getString("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      await apiClient.get("/auth/me");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const listener = storage.addOnValueChangedListener((key) => {
      if (key === "token") checkAuth();
    });

    return () => listener.remove();
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    }

  }, [segments, isAuthenticated, router]);

  if (isAuthenticated === null) return null;
  

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
