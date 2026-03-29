import { AuthService } from "@/services";
import { storage } from "@/storage";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STYLE = "avataaars-neutral";
const DICEBEAR_URL = (seed: string) => `https://api.dicebear.com/9.x/${STYLE}/png?seed=${seed}`;

const randomSeed = () => Math.random().toString(36).substring(2, 10);

export default function SignupAvatarScreen() {
  const router = useRouter();
  const { name, email, password } = useLocalSearchParams<{
    name: string;
    email: string;
    password: string;
  }>();
  const [seed, setSeed] = useState(randomSeed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const avatarUrl = DICEBEAR_URL(seed);

  const handleShuffle = useCallback(() => {
    setSeed(randomSeed());
    setError("");
  }, []);

  const handleConfirm = async (skipAvatar = false) => {
    setLoading(true);
    setError("");

    try {
      const data = await AuthService.signUp({
        name,
        email,
        password,
        avatarUrl: skipAvatar ? undefined : avatarUrl,
      });

      storage.set("token", data.access_token);
      storage.set("type_token", "Bearer");
      storage.set("user", JSON.stringify(data.user));
      router.replace("/(tabs)");
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "";
      setError(
        typeof message === "string" && message.toLowerCase().includes("already")
          ? "Este e-mail já está cadastrado."
          : "Erro ao criar conta. Tente novamente."
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Voltar */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </Pressable>

      {/* Indicador de etapa */}
      <View style={styles.stepIndicator}>
        <View style={styles.stepDone} />
        <View style={styles.stepActive} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Escolha seu avatar</Text>
        <Text style={styles.subtitle}>
          Randomize até encontrar um que te represente
        </Text>

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
            key={seed}
          />
        </View>

        {/* Botão randomizar */}
        <Pressable
          style={({ pressed }) => [
            styles.shuffleButton,
            pressed && { opacity: 0.75 },
          ]}
          onPress={handleShuffle}
          disabled={loading}
        >
          <Ionicons name="shuffle" size={20} color="#ffd33d" />
          <Text style={styles.shuffleText}>Randomizar</Text>
        </Pressable>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.confirmButton} onPress={() => handleConfirm(false)} disabled={loading}>
          {
            loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.confirmText}>Entrar na Arena</Text>
                <FontAwesome6 name="arrow-right-to-bracket" size={18} color="#25292e" />
              </>
            )
          }
        </Pressable>

        <Pressable style={styles.skipButton} onPress={() => handleConfirm(true)} disabled={loading}>
          <Text style={styles.skipText}>Pular por agora</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  backButton: {
    marginTop: 8,
    marginLeft: 16,
    padding: 8,
    alignSelf: "flex-start",
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  stepDone: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffd33d",
    opacity: 0.4,
  },
  stepActive: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffd33d",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#a1a1a1",
    textAlign: "center",
    marginTop: -8,
  },
  avatarWrapper: {
    width: 160,
    height: 160,
    borderRadius: 10,
    backgroundColor: "#3a3f46",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ffd33d",
  },
  avatar: {
    width: 160,
    height: 160,
  },
  shuffleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: "#ffd33d",
  },
  shuffleText: {
    color: "#ffd33d",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 13,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#ffd33d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    borderRadius: 32,
    gap: 12,
    marginTop: 8,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#25292e",
  },
  skipButton: {
    marginTop: 4,
    padding: 10,
  },
  skipText: {
    color: "#a1a1a1",
    fontSize: 14,
    textAlign: "center",
  },
});