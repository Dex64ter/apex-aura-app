import InputLogin from "@/components/InputLogin";
import { FontAwesome6 } from "@expo/vector-icons";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function VerifyCode() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/mainIcon.png")}
          style={styles.image}
        />

        <View style={styles.headerText}>
          <Text style={styles.titleApp}>
            Apex <Text style={{ color: "#ffd33d" }}>Aura</Text>
          </Text>

          <Text style={styles.span}>
            Entre na arena. Comece sua jornada
          </Text>
        </View>
      </View>

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 20,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleApp: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  span: {
    fontSize: 16,
    color: "#a1a1a1",
  },
  dataContainer: {
    width: "80%",
  },
});