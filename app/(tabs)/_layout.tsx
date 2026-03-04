import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fdf038",
        tabBarStyle: { backgroundColor: "#25292e" },
        headerTintColor: "#fff",
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#25292e"
        },
        tabBarHideOnKeyboard: true,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: "Teams",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "rocket" : "rocket-outline"}
              size={24} 
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "notifications" : "notifications-outline"}
              size={24} 
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"}
              size={24} 
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}