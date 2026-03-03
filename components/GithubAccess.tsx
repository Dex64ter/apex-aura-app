import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface GithubAccessProps {
  onPress?: () => void;
}

export default function GithubAccess({ onPress }: GithubAccessProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <Pressable
      style={[styles.container, isPressed && styles.containerPressed]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <FontAwesome name="github" size={20} color="#fff" />
      <Text style={styles.text}>Github</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31363b',
    padding: 12,
    borderWidth: 1,
    borderColor: '#a1a1a1',
    borderRadius: 10,
    gap: 8
  },
  containerPressed: {
    backgroundColor: '#1a1d20',
    borderColor: '#fff'
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
})
