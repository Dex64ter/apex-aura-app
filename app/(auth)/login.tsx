import Br from "@/components/Br";
import GithubAccess from "@/components/GithubAccess";
import GoogleAccess from "@/components/GoogleAccess";
import InputLogin from "@/components/InputLogin";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({
  id: "app-storage",
  encryptionKey: "1234567890"
});

export default function LoginScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onLogin = () => {
    if (emailAddress === "davi@mail.com" && password === "123") {
      setLoading(true);
      setError("");
      storage.set('email', emailAddress);
      storage.set('senha', password);
      
      router.replace("/(tabs)");
    } else {
      setError("E-mail ou senha inválidos. Por favor verifique suas credenciais ou cadastre-se");
    }
  }

  const handleEmailChange = (text: string) => {
    setEmailAddress(text);
    if (error) setError("");
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (error) setError("");
  }

  return (
    // KeyboardAwareScrollView evita que o teclado fique por cima do conteudo
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Símbolo, Título e Subtítulo do aplicativo */}
      <View style={styles.headerContainer} >
        <Image source={require('../../assets/images/emj04.png')} style={styles.image}/>
        <View style={styles.headerText} >
          <Text style={styles.titleApp}>
            Apex{` `}
            <Text style={{ color: "#ffd33d" }}>Aura</Text>
          </Text>
          <Text style={styles.span}>
            Faça tarefas. Domine os ranques
          </Text>
        </View>
      </View>

      {/* Espaço para informações de login */}
      <View style={styles.dataContainer} >
        <InputLogin
          icon="at"
          label="Email"
          placeholder="exemple@mail.com"
          value={emailAddress}
          onChangeText={handleEmailChange}
        />
        <InputLogin
          icon="lock"
          label="Senha"
          placeholder="******"
          value={password}
          onChangeText={handlePasswordChange}
          password
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={styles.section2}>
        <Pressable style={styles.loginButton} onPress={onLogin}>
          {loading ?
            <ActivityIndicator size="small" color="#25292e" />
            :
            <>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#25292e" }}>
                Entrar na Arena
              </Text>
              <FontAwesome6 name="arrow-right-to-bracket" size={18} color="#25292e" />
            </>
          }
        </Pressable>

        <Br label="Ou conecte-se"/>
      </View>

      <View style={styles.section3}>
        <GoogleAccess />
        <GithubAccess />
      </View>

      <View style={styles.footer}>
        <Text style={{ color: "#a1a1a1" }}>
          Ainda nao possui uma conta?
          <Link href="/signup" style={{ color: "#ffd33d" }}> Clique aqui</Link>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    gap: 16
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 100,
    height: 100
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center"
  },
  titleApp: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff"
  },
  span: {
    fontSize: 16,
    color: "#a1a1a1"
  },
  dataContainer: {
    width: "80%"
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center"
  },
  loginButton: {
    backgroundColor: "#ffd33d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: 16,
    marginBottom: 16,
    gap: 16
  },
  section2: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  section3: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16
  },
  footer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  }
});