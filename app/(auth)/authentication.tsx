import InputLogin from "@/components/InputLogin";
import { AuthService } from "@/services";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRequestCode = async () => {
    if (!email) {
      setError("Informe um email válido");
      return;
    }

    setLoading(true);
    try {
      await AuthService.requestCode(email);

      // 👉 navega pra tela de código (você cria depois)
      router.push({
        pathname: "/verify-code",
        params: { email },
      });
    } catch (err) {
      setError("Erro ao enviar código. Tente novamente.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

      {/* INPUT */}
      <View style={styles.dataContainer}>
        <InputLogin
          icon="at"
          label="Email"
          placeholder="seuemail@email.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError("");
          }}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {/* BUTTON */}
      <View style={styles.section2}>
        <Pressable
          style={styles.loginButton}
          onPress={handleRequestCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#25292e" />
          ) : (
            <>
              <Text style={styles.buttonText}>
                Receber código
              </Text>
              <FontAwesome6
                name="paper-plane"
                size={18}
                color="#25292e"
              />
            </>
          )}
        </Pressable>

        <Text style={styles.helperText}>
          Enviaremos um código de verificação para seu email
        </Text>
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
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  section2: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#ffd33d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#25292e",
  },
  helperText: {
    fontSize: 13,
    color: "#a1a1a1",
    textAlign: "center",
  },
});