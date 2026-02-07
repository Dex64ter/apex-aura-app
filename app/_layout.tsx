import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { storage as appStorage } from "./(auth)/login";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const email = appStorage.getString('email');
    const senha = appStorage.getString('senha');

    if (email && senha) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (!isAuthenticated && !inAuthGroup) {
      // Usuário não autenticado, redireciona para login
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Usuário autenticado, redireciona para tabs
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isReady, router]);

  return (
    <KeyboardProvider>
      <StatusBar style={"light"} />
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar style="light"/>
    </KeyboardProvider>
  );
}
