import { storage } from "@/storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

// Mock: níveis de título por faixa de aura
const TITULOS_POR_AURA = [
  { min: 0, titulo: "Iniciante", icon: "leaf" },
  { min: 100, titulo: "Explorador", icon: "compass" },
  { min: 500, titulo: "Guerreiro", icon: "shield" },
  { min: 1500, titulo: "Veterano", icon: "medal" },
  { min: 5000, titulo: "Lenda", icon: "trophy" },
];

// Mock: badges de exemplo
const BADGES_MOCK = [
  { id: "1", nome: "Primeira missão", icon: "star", desbloqueado: true },
  { id: "2", nome: "10 atividades", icon: "flash", desbloqueado: true },
  { id: "3", nome: "Líder de time", icon: "people", desbloqueado: false },
  { id: "4", nome: "100 Aura", icon: "sunny", desbloqueado: true },
];

function getTituloPorAura(aura: number) {
  let current = TITULOS_POR_AURA[0];
  for (const t of TITULOS_POR_AURA) {
    if (aura >= t.min) {
      current = t;
      storage.set("titulo_atual", t.titulo);
      storage.set("icon_titulo_atual", t.icon);
    };
  }
  return current;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [atividadesConcluidas] = useState(12);
  const [atividadesPendentes] = useState(2);
  const [timesInscritos] = useState(1);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const { name, email, avatarUrl, aura } = useMemo(() => JSON.parse(storage.getString("user") ?? ""), []);

  const tituloAtual = useMemo(() => getTituloPorAura(aura), [aura]);

  const handleSair = useCallback(async () => {
    setLoadingLogout(true);
    try {
      storage.clearAll();
      router.replace("/(auth)/login");
    } catch (error) {
      console.log("Logout error:", error);
      return; 
    } finally {
      setLoadingLogout(false);
    }
  }, [router]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho: avatar + nome + email */}
      <View style={styles.header}>
        {
          avatarUrl
            ? (
              <View style={styles.avatarImageContainer}>
                <Image
                  source={{ uri: avatarUrl }}
                  style={styles.avatarImage}
                />
              </View>
            ) : (
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{name.charAt(0)}</Text>
              </View>
            )
        }
        <Text style={styles.nome}>{name}</Text>
        <Text style={styles.email}>{email || "—"}</Text>
      </View>

      {/* Card Aura + Título */}
      <View style={styles.auraCard}>
        <View style={styles.auraRow}>
          <Ionicons name="sunny" size={28} color="#ffd33d" />
          <Text style={styles.auraValor}>{aura}</Text>
          <Text style={styles.auraLabel}>Aura</Text>
        </View>
        <View style={styles.tituloRow}>
          <Ionicons
            name={tituloAtual.icon as keyof typeof Ionicons.glyphMap}
            size={20}
            color="#ffd33d"
          />
          <Text style={styles.tituloTexto}>{tituloAtual.titulo}</Text>
        </View>
      </View>

      {/* Resumo: atividades e times */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
            <Text style={styles.statValor}>{atividadesConcluidas}</Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="time" size={24} color="#fbbf24" />
            <Text style={styles.statValor}>{atividadesPendentes}</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="people" size={24} color="#a78bfa" />
            <Text style={styles.statValor}>{timesInscritos}</Text>
            <Text style={styles.statLabel}>Times</Text>
          </View>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conquistas</Text>
        <View style={styles.badgesGrid}>
          {BADGES_MOCK.map((b) => (
            <View
              key={b.id}
              style={[
                styles.badgeItem,
                !b.desbloqueado && styles.badgeItemLocked,
              ]}
            >
              <Ionicons
                name={b.icon as keyof typeof Ionicons.glyphMap}
                size={28}
                color={b.desbloqueado ? "#ffd33d" : "#5b5b5b"}
              />
              <Text
                style={[
                  styles.badgeNome,
                  !b.desbloqueado && styles.badgeNomeLocked,
                ]}
                numberOfLines={2}
              >
                {b.nome}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Ações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <View style={styles.menu}>
          <Pressable
            style={styles.menuItem}
            onPress={() => {}}
            android_ripple={{ color: "rgba(255,211,61,0.15)" }}
          >
            <Ionicons name="person-outline" size={22} color="#a1a1a1" />
            <Text style={styles.menuLabel}>Editar perfil</Text>
            <Ionicons name="chevron-forward" size={20} color="#5b5b5b" />
          </Pressable>
          <Pressable
            style={styles.menuItem}
            onPress={() => router.push("/(tabs)/teams")}
            android_ripple={{ color: "rgba(255,211,61,0.15)" }}
          >
            <Ionicons name="people-outline" size={22} color="#a1a1a1" />
            <Text style={styles.menuLabel}>Meus times</Text>
            <Ionicons name="chevron-forward" size={20} color="#5b5b5b" />
          </Pressable>
          <Pressable
            style={[styles.menuItem, styles.menuItemLast]}
            onPress={() => {}}
            android_ripple={{ color: "rgba(255,211,61,0.15)" }}
          >
            <Ionicons name="settings-outline" size={22} color="#a1a1a1" />
            <Text style={styles.menuLabel}>Configurações</Text>
            <Ionicons name="chevron-forward" size={20} color="#5b5b5b" />
          </Pressable>
        </View>
      </View>

      {/* Botão Sair */}
      <Pressable
        style={styles.sairButton}
        onPress={handleSair}
        android_ripple={{ color: "rgba(255,255,255,0.1)" }}
      >
        {
          loadingLogout ?
            <ActivityIndicator size="small" color="#ff6b6b" />
            :
          <>
            <Ionicons name="log-out-outline" size={20} color="#ff6b6b" />
            <Text style={styles.sairLabel}>Sair da conta</Text>
          </>
        }
      </Pressable>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: 10,
    backgroundColor: "#3d4349",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ffd33d",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffd33d",
  },
  avatarImageContainer: {
    width: 88,
    height: 88,
    borderRadius: 10,
    backgroundColor: "#3a3f46",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ffd33d",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    color: "#a1a1a1",
    marginTop: 4,
  },
  auraCard: {
    backgroundColor: "#2d3339",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#3d4349",
  },
  auraRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  auraValor: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffd33d",
  },
  auraLabel: {
    fontSize: 18,
    color: "#a1a1a1",
  },
  tituloRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#3d4349",
  },
  tituloTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#a1a1a1",
    marginBottom: 12,
    paddingLeft: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#2d3339",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3d4349",
  },
  statValor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#a1a1a1",
    marginTop: 4,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  badgeItem: {
    width: "47%",
    backgroundColor: "#2d3339",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#3d4349",
  },
  badgeItemLocked: {
    opacity: 0.6,
  },
  badgeNome: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
  },
  badgeNomeLocked: {
    color: "#5b5b5b",
  },
  menu: {
    backgroundColor: "#2d3339",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3d4349",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3d4349",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  sairButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#5b5b5b",
  },
  sairLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff6b6b",
  },
  footer: {
    height: 24,
  },
});
