import InputLogin from "@/components/InputLogin";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupScreen() {
  const router = useRouter();

  // Dados pessoais (obrigatórios)
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Localização
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => {
    if (error) setError("");
  };

  const validate = (): string | null => {
    if (!nome.trim()) return "Nome é obrigatório.";
    if (!sobrenome.trim()) return "Sobrenome é obrigatório.";
    if (!email.trim()) return "E-mail é obrigatório.";
    if (!EMAIL_REGEX.test(email)) return "Informe um e-mail válido.";
    if (!senha) return "Senha é obrigatória.";
    if (senha.length < 6) return "Senha deve ter no mínimo 6 caracteres.";
    if (senha !== confirmarSenha) return "As senhas não coincidem.";
    if (!pais.trim()) return "País é obrigatório.";
    if (!cidade.trim()) return "Cidade é obrigatória.";
    if (!endereco.trim()) return "Endereço é obrigatório.";
    if (!numero.trim()) return "Número é obrigatório.";
    return null;
  };

  const onSignup = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    // TODO: integrar com API de cadastro
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/emj04.png")}
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
        {/* Seção: Dados pessoais */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="user" size={18} color="#ffd33d" />
            <Text style={styles.sectionTitle}>Dados pessoais</Text>
          </View>
          <InputLogin
            icon="user"
            label="Nome"
            placeholder="Seu nome"
            value={nome}
            onChangeText={(t) => {
              setNome(t);
              clearError();
            }}
          />
          <InputLogin
            icon="user"
            label="Sobrenome"
            placeholder="Seu sobrenome"
            value={sobrenome}
            onChangeText={(t) => {
              setSobrenome(t);
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
            value={senha}
            onChangeText={(t) => {
              setSenha(t);
              clearError();
            }}
            password
          />
          <InputLogin
            icon="lock"
            label="Confirmar senha"
            placeholder="Repita a senha"
            value={confirmarSenha}
            onChangeText={(t) => {
              setConfirmarSenha(t);
              clearError();
            }}
            password
          />
        </View>

        {/* Seção: Localização */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome6 name="location-dot" size={18} color="#ffd33d" />
            <Text style={styles.sectionTitle}>Localização</Text>
          </View>
          <InputLogin
            icon="globe"
            label="País"
            placeholder="Ex: Brasil"
            value={pais}
            onChangeText={(t) => {
              setPais(t);
              clearError();
            }}
          />
          <InputLogin
            icon="map-marker"
            label="Estado (opcional)"
            placeholder="Ex: SP"
            value={estado}
            onChangeText={setEstado}
          />
          <InputLogin
            icon="map-marker"
            label="Cidade"
            placeholder="Sua cidade"
            value={cidade}
            onChangeText={(t) => {
              setCidade(t);
              clearError();
            }}
          />
          <InputLogin
            icon="envelope"
            label="CEP (opcional)"
            placeholder="00000-000"
            value={cep}
            onChangeText={setCep}
          />
          <InputLogin
            icon="home"
            label="Endereço"
            placeholder="Rua, avenida..."
            value={endereco}
            onChangeText={(t) => {
              setEndereco(t);
              clearError();
            }}
          />
          <InputLogin
            icon="hashtag"
            label="Número"
            placeholder="Nº"
            value={numero}
            onChangeText={(t) => {
              setNumero(t);
              clearError();
            }}
          />
          <InputLogin
            icon="building"
            label="Complemento (opcional)"
            placeholder="Apto, bloco, referência..."
            value={complemento}
            onChangeText={setComplemento}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.submitButton} onPress={onSignup}>
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
    </KeyboardAwareScrollView>
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
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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
  section: {
    marginBottom: 24,
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
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#25292e",
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    color: "#a1a1a1",
    fontSize: 15,
  },
  footerLink: {
    color: "#ffd33d",
    fontWeight: "600",
  },
});
