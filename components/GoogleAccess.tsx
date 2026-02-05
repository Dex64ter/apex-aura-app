import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

export default function GoogleAccess() {
  return (
    <Pressable style={styles.container}>
      <FontAwesome name="google" size={20} color="#fff" />
      <Text style={styles.text}>Google</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#31363b",
    padding: 12,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderRadius: 10,
    gap: 8
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold'
  },
})