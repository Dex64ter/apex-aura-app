import Br from "@/components/Br";
import Checkbox from "@/components/CheckBox";
import GithubAccess from "@/components/GithubAccess";
import InputLogin from "@/components/InputLogin";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const resetValues = () => {
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAcceptTerms(false);
      setLoading(false);
    };
    return () => {
      resetValues();
    }
  }, [router]);

  const clearError = () => {
    if (error) setError("");
  };

  const validate = (): string | null => {
    if (!fullName.trim()) return "Nome é obrigatório.";
    if (!email.trim()) return "E-mail é obrigatório.";
    if (!EMAIL_REGEX.test(email)) return "Informe um e-mail válido.";
    if (!password) return "Senha é obrigatória.";
    if (password.length < 6) return "Senha deve ter no mínimo 6 caracteres.";
    if (password !== confirmPassword) return "As senhas não coincidem.";
    return null;
  };

  const onSignup = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);
    
    router.push({
      pathname: "/signup-avatar",
      params: { name: fullName, email, password },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#25292e" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/mainIcon.png")}
            style={styles.image}
          />
          <View style={styles.headerText}>
            <Text style={styles.titleApp}>
              Apex{` `}
              <Text style={{ color: "#ffd33d" }}>Aura</Text>
            </Text>
            <Text style={styles.span}>Crie sua conta</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <View style={styles.sectionHeader}>
              <FontAwesome name="user" size={18} color="#ffd33d" />
              <Text style={styles.sectionTitle}>Dados pessoais</Text>
            </View>

            <InputLogin
              icon="user"
              label="Nome"
              placeholder="Seu nome"
              value={fullName}
              onChangeText={(t) => {
                setFullName(t);
                clearError();
              }}
            />
            <InputLogin
              icon="at"
              label="E-mail"
              placeholder="exemplo@mail.com"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                clearError();
              }}
            />
            <InputLogin
              icon="lock"
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                clearError();
              }}
              password
            />
            <InputLogin
              icon="lock"
              label="Confirmar senha"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                clearError();
              }}
              password
            />
          </View>
            
          <View style={styles.termsAndConditions}>
            <Checkbox value={acceptTerms} onValueChange={setAcceptTerms} size={18} />
            <Text style={styles.termsAndConditionsText}>
              Eu concordo com os{" "}
              <Text style={styles.termsAndConditionsLink}>Termos de uso</Text> e{" "}
              <Text style={styles.termsAndConditionsLink}>Política de privacidade</Text>.
            </Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            style={({ pressed }) => [
              acceptTerms ? styles.submitButton : styles.submitButtonDisabled,
              pressed && { opacity: 0.85 },
            ]}
            onPress={onSignup}
            disabled={loading || !acceptTerms}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#25292e" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>Criar conta</Text>
                <FontAwesome6 name="user-plus" size={18} color="#25292e" />
              </>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Já possui uma conta?{" "}
            <Link href="/login" style={styles.footerLink}>
              Entrar
            </Link>
          </Text>
        </View>

        <View style={{ width: "85%", marginTop: 18 }}>
          <Br label="ou cadastre-se com" />
        </View>

        <View style={{ width: "85%", marginTop: 18 }}>
          <GithubAccess />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    paddingVertical: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleApp: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  span: {
    fontSize: 16,
    color: "#a1a1a1",
  },
  form: {
    width: "85%",
    maxWidth: 400,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },

  submitButton: {
    backgroundColor: "#ffd33d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: 16,
    gap: 10,
    marginTop: 8,
  },

  submitButtonDisabled: {
    backgroundColor: "#a1a1a1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: 16,
    gap: 10,
    marginTop: 8,
  },

  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#25292e",
  },
  footer: {
    marginTop: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#a1a1a1",
    fontSize: 14,
  },
  footerLink: {
    color: "#ffd33d",
    fontWeight: "600",
  },

  termsAndConditions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },
  termsAndConditionsText: {
    color: "#a1a1a1",
    fontSize: 10,
  },
  termsAndConditionsLink: {
    color: "#ffd33d",
    fontWeight: "600",
  },
});
