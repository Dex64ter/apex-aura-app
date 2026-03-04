import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log("Checking auth session...");
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitialized(true);
    });

    console.log("Setting up auth listener...");
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    console.log("Auth listener set up:", authListener);
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      router.replace("/(tabs)");
    }

  }, [segments, session, isInitialized, router]);

  if (!isInitialized) {
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
