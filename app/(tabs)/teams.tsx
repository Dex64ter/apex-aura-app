import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Mock: times do usuário (como líder ou membro)
const TEAMS_MOCK = [
  {
    id: "1",
    nome: "Squad Apex",
    role: "Líder" as const,
    membros: 5,
    auraNoTime: 120,
  },
  {
    id: "2",
    nome: "Farming Brasil",
    role: "Membro" as const,
    membros: 12,
    auraNoTime: 45,
  },
];

export default function TeamsScreen() {
  const [teams] = useState(TEAMS_MOCK);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Meus times</Text>
        <Text style={styles.subtitle}>
          Gerencie seus times e atividades
        </Text>
      </View>

      <Pressable
        style={styles.createButton}
        onPress={() => {}}
        android_ripple={{ color: "rgba(37,41,46,0.3)" }}
      >
        <Ionicons name="add-circle" size={22} color="#25292e" />
        <Text style={styles.createButtonText}>Criar time</Text>
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Times</Text>
        {teams.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="people-outline" size={48} color="#5b5b5b" />
            <Text style={styles.emptyTitle}>Nenhum time ainda</Text>
            <Text style={styles.emptySubtitle}>
              Crie um time ou peça convite a um líder
            </Text>
          </View>
        ) : (
          teams.map((team) => (
            <Pressable
              key={team.id}
              style={styles.teamCard}
              onPress={() => {}}
              android_ripple={{ color: "rgba(255,211,61,0.1)" }}
            >
              <View style={styles.teamCardHeader}>
                <View style={styles.teamIconWrap}>
                  <Ionicons name="rocket" size={24} color="#ffd33d" />
                </View>
                <View style={styles.teamInfo}>
                  <Text style={styles.teamNome}>{team.nome}</Text>
                  <View style={styles.teamMeta}>
                    <View
                      style={[
                        styles.roleBadge,
                        team.role === "Líder" && styles.roleBadgeLeader,
                      ]}
                    >
                      <Text
                        style={[
                          styles.roleText,
                          team.role === "Líder" && styles.roleTextLeader,
                        ]}
                      >
                        {team.role}
                      </Text>
                    </View>
                    <Text style={styles.metaText}>{team.membros} membros</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#5b5b5b" />
              </View>
              <View style={styles.teamFooter}>
                <Ionicons name="sunny" size={16} color="#ffd33d" />
                <Text style={styles.auraText}>{team.auraNoTime} Aura neste time</Text>
              </View>
            </Pressable>
          ))
        )}
      </View>

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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#a1a1a1",
    marginTop: 4,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ffd33d",
    height: 48,
    borderRadius: 16,
    marginBottom: 24,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25292e",
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
  emptyCard: {
    backgroundColor: "#2d3339",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3d4349",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#a1a1a1",
    marginTop: 8,
  },
  teamCard: {
    backgroundColor: "#2d3339",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3d4349",
  },
  teamCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  teamIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#3d4349",
    alignItems: "center",
    justifyContent: "center",
  },
  teamInfo: {
    flex: 1,
  },
  teamNome: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  teamMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "#3d4349",
  },
  roleBadgeLeader: {
    backgroundColor: "rgba(255,211,61,0.2)",
  },
  roleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#a1a1a1",
  },
  roleTextLeader: {
    color: "#ffd33d",
  },
  metaText: {
    fontSize: 12,
    color: "#a1a1a1",
  },
  teamFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#3d4349",
  },
  auraText: {
    fontSize: 13,
    color: "#a1a1a1",
  },
  footer: {
    height: 24,
  },
});
