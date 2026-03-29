import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type NotificationType = "approved" | "rejected" | "invite" | "new_activity";

const NOTIFICATIONS_MOCK = [
  {
    id: "1",
    type: "approved" as NotificationType,
    title: "Atividade aprovada",
    body: "Squad Apex: sua entrega \"Revisar PR\" foi aprovada. +15 Aura.",
    time: "Há 2 min",
    read: false,
  },
  {
    id: "2",
    type: "new_activity" as NotificationType,
    title: "Nova atividade no time",
    body: "Farming Brasil: nova atividade \"Daily standup\" (10 Aura).",
    time: "Há 1 h",
    read: false,
  },
  {
    id: "3",
    type: "invite" as NotificationType,
    title: "Convite para time",
    body: "Você foi convidado para o time \"Dev Frontend\".",
    time: "Ontem",
    read: true,
  },
  {
    id: "4",
    type: "rejected" as NotificationType,
    title: "Atividade não aprovada",
    body: "Squad Apex: \"Documentar API\" precisa de ajustes.",
    time: "Ontem",
    read: true,
  },
];

function getIconForType(type: NotificationType): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case "approved":
      return "checkmark-circle";
    case "rejected":
      return "close-circle";
    case "invite":
      return "person-add";
    case "new_activity":
      return "flash";
    default:
      return "notifications";
  }
}

function getIconColor(type: NotificationType): string {
  switch (type) {
    case "approved":
      return "#4ade80";
    case "rejected":
      return "#f87171";
    case "invite":
      return "#a78bfa";
    case "new_activity":
      return "#ffd33d";
    default:
      return "#a1a1a1";
  }
}

export default function NotificationsScreen() {
  const [notifications] = useState(NOTIFICATIONS_MOCK);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
        <Text style={styles.subtitle}>
          {unreadCount > 0
            ? `${unreadCount} não lida${unreadCount > 1 ? "s" : ""}`
            : "Tudo lido"}
        </Text>
      </View>

      <View style={styles.section}>
        {notifications.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="notifications-outline" size={48} color="#5b5b5b" />
            <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
            <Text style={styles.emptySubtitle}>
              Aprovações, convites e novidades aparecem aqui
            </Text>
          </View>
        ) : (
          notifications.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.notifCard, !item.read && styles.notifCardUnread]}
              onPress={() => { }}
              android_ripple={{ color: "rgba(255,211,61,0.1)" }}
            >
              <View style={styles.notifIconWrap}>
                <Ionicons
                  name={getIconForType(item.type)}
                  size={24}
                  color={getIconColor(item.type)}
                />
              </View>
              <View style={styles.notifContent}>
                <Text style={styles.notifTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.notifBody} numberOfLines={2}>
                  {item.body}
                </Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
              {!item.read && <View style={styles.unreadDot} />}
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  section: {
    marginBottom: 24,
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
  notifCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#2d3339",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3d4349",
  },
  notifCardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: "#ffd33d",
  },
  notifIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#3d4349",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  notifBody: {
    fontSize: 14,
    color: "#a1a1a1",
    marginTop: 4,
  },
  notifTime: {
    fontSize: 12,
    color: "#5b5b5b",
    marginTop: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffd33d",
    marginLeft: 8,
    marginTop: 6,
  },
  footer: {
    height: 24,
  },
});
