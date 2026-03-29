import Br from "@/components/Br";
import GithubAccess from "@/components/GithubAccess";
import InputLogin from "@/components/InputLogin";
import { AuthService } from "@/services";
import { apiClient } from "@/services/http/api";
import { storage } from "@/storage";
import { supabase } from "@/utils/supabase";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function LoginScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await AuthService.signIn(emailAddress, password);
      console.log(JSON.stringify(data, null, 2))
      storage.set("token", data.access_token);
      storage.set("type_token", 'Bearer');
      storage.set("user", JSON.stringify(data.user));
      if (data) router.replace("/(tabs)")
    } catch (error) {
      setError("E-mail ou senha inválidos. Por favor verifique suas credenciais ou cadastre-se");
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  const signInWithOAuthGithub = async () => {
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: "github",
    // })

    const data = await apiClient.get(`/auth/oauth/github`);

    if (error) {
      console.log("OAuth login error:", error);
      setError("Erro ao tentar logar com GitHub. Por favor tente novamente.");
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
        <Image source={require('../../assets/images/mainIcon.png')} style={styles.image}/>
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

      <View style={styles.sectionLogin}>
        {/* Espaço para informações de login */}
        <InputLogin
          error={error !== ""}
          icon="at"
          label="Email"
          placeholder="exemple@mail.com"
          value={emailAddress}
          onChangeText={handleEmailChange}
        />
        <InputLogin
          error={error !== ""}
          icon="lock"
          label="Senha"
          placeholder="******"
          value={password}
          onChangeText={handlePasswordChange}
          password
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable style={styles.loginButton} onPress={handleLogin /* signInWithEmail */} disabled={loading}>
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

        <View style={styles.footer}>
          <Text style={{ fontSize: 14, color: "#a1a1a1" }}>
            Ainda nao possui uma conta?
            <Link href="/signup" style={{ color: "#ffd33d" }}> Clique aqui</Link>
          </Text>
        </View>

        <View style={styles.section3}>
          <Br label="ou entre com" />
        </View>

        <View style={styles.section3}>
          <GithubAccess onPress={signInWithOAuthGithub} />
        </View>
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
    gap: 12
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center"
  },
  titleApp: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff"
  },
  span: {
    fontSize: 16,
    color: "#a1a1a1"
  },
  sectionLogin: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center"
  },
  loginButton: {
    marginTop: 24,
    backgroundColor: "#ffd33d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: 32,
    gap: 16
  },
  section3: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16
  },
  br: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  }
});