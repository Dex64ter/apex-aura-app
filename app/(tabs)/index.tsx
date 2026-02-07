import InFocus from "@/components/InFocus";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { storage } from "../(auth)/login";

const ACTIVITIES = [
  {id: 0, type: 'leader', aprovals_pending: 3, tasks_pending: null, team: null},
  {id: 1, type: 'member', aprovals_pending: null, tasks_pending: 1, team: "Elite Vanguard"},
]

export default function Index() {
  const iconTituloAtual = useMemo(() => storage.getString("icon_titulo_atual") as keyof typeof Ionicons.glyphMap, []);
  const tituloAtual = useMemo(() => storage.getString("titulo_atual") ?? "", []);

  const email = useMemo(() => storage.getString("email") ?? "", []);
  const nomeExibicao = useMemo(() => {
    if (email) {
      const parte = email.split("@")[0];
      return parte ? parte.charAt(0).toUpperCase() + parte.slice(1) : "Membro";
    }
    return "Membro";
  }, [email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.salutation}>
          <Text style={styles.salutationText}>
            Olá,{" "}
            <Text style={styles.salutationName}>
              {nomeExibicao}
            </Text>
          </Text>

          <View style={styles.tituloAtual}>
            <Ionicons
              name={iconTituloAtual}
              size={24}
              color="#ffd33d"
            />
            <Text style={styles.tituloAtualText}>
              {tituloAtual}
            </Text>
          </View>
        </View>
        <View style={styles.auraContainer}>
          <View style={styles.box}>
            <Text style={styles.aura}>
              1,250
            </Text>
            <Text style={styles.textAura}>AURA</Text>
          </View>
        </View>
      </View>
      <InFocus activities={ACTIVITIES}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  salutation: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },
  salutationText: {
    fontSize: 28,
    color: "#fff",
  },
  salutationName: {
    fontSize: 28,
    color: "#ffd33d",
  },
  tituloAtual: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    
    backgroundColor: "#25292e",

    padding: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ffd33d",

    boxSizing: "border-box",
    shadowColor: '#ffd33d',
    shadowOffset: { width: 100, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5.45,

    elevation: 8
  },
  tituloAtualText: {
    fontSize: 16,
    marginHorizontal: 4,
    textTransform: "uppercase",
    color: "#ffd33d",
  },
  auraContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  aura: {
    fontSize: 28,
    color: "#ffd33d",
  },
  textAura: {
    letterSpacing: 2,
    color: "#a1a1a1"
  }
})