import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style={"light"} />
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="login"
        />
        <Stack.Screen
          name="authentication"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="verify-code"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}