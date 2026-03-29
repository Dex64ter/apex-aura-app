import ActivityItem from "@/components/ActivityItem";
import InFocus from "@/components/InFocus";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import { storage } from "@/storage";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const ACTIVITIES = [
  {id: 0, type: 'leader', aprovals_pending: 3, tasks_pending: null, team: null},
  {id: 1, type: 'member', aprovals_pending: null, tasks_pending: 1, team: "Elite Vanguard"},
]

const TEAMS = [
  {
    id: 1,
    name: "Elite Vanguard",
    activity: "1 activity available",
    highlight: true,
    icon: "flash-on"
  },
  {
    id: 2,
    name: "Nebula Knights",
    activity: "All caught up",
    highlight: false,
    icon: "star"
  },
  {
    id: 3,
    name: "Vasco da Gama FC",
    activity: "All caught up",
    highlight: true,
    icon: "shield"
  }
];

const RECENT_ACTIVITIES = [
  {
    id: 1,
    title: "Task Approved",
    subtitle: "2H AGO • ELITE VANGUARD",
    value: "+15 Aura",
    positive: true,
    icon: "checkmark-circle"
  },
  {
    id: 2,
    title: "Earned 'Explorer' Badge",
    subtitle: "5H AGO • GLOBAL",
    value: null,
    positive: true,
    icon: "ribbon"
  },
  {
    id: 3,
    title: "Aura Decay",
    subtitle: "YESTERDAY • INACTIVITY",
    value: "-5 Aura",
    positive: false,
    icon: "trending-down"
  }
];

export default function Index() {
  const iconTituloAtual = useMemo(() => storage.getString("icon_titulo_atual") as keyof typeof Ionicons.glyphMap, []);
  const tituloAtual = useMemo(() => storage.getString("titulo_atual") ?? "", []);
  const { name, aura } = useMemo(() => JSON.parse(storage.getString("user") ?? ""), []);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.salutationText}>
            Olá, <Text style={styles.salutationName}>{name.split(" ")[0]}</Text>
          </Text>

          <View style={styles.tituloAtual}>
            <Ionicons name={iconTituloAtual} size={20} color="#ffd33d" />
            <Text style={styles.tituloAtualText}>{tituloAtual}</Text>
          </View>
        </View>

        <View style={styles.auraContainer}>
          <View style={styles.box}>
            <Text style={styles.aura}>{aura}</Text>
            <Text style={styles.textAura}>AURA</Text>
          </View>
        </View>
      </View>

      <InFocus activities={ACTIVITIES} />

      {/* MY TEAMS */}
      <SectionHeader title="MY TEAMS" action="SEE ALL" />

      <FlatList
        horizontal
        contentContainerStyle={styles.teamsRow}
        data={TEAMS}
        renderItem={({ item }) => <TeamCard team={item} />}
        keyExtractor={item => item.id.toString()}
      />

      {/* RECENT ACTIVITY */}
      <SectionHeader title="RECENT ACTIVITY" />

      <View style={styles.activityContainer}>
        {RECENT_ACTIVITIES.map(item => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 24
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  salutationText: {
    fontSize: 28,
    marginBottom: 6,
    color: "#fff"
  },

  salutationName: {
    color: "#ffd33d"
  },

  tituloAtual: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#ffd33d",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20
  },

  tituloAtualText: {
    color: "#ffd33d",
    textTransform: "uppercase",
    fontSize: 14
  },

  auraContainer: {
    justifyContent: "flex-start"
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  aura: {
    fontSize: 28,
    color: "#ffd33d"
  },

  textAura: {
    color: "#a1a1a1",
    letterSpacing: 2
  },
  
  teamsRow: {
    flexDirection: "row",
    gap: 16
  },

  activityContainer: {
    gap: 20
  },

});