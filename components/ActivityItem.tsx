import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function ActivityItem({ item }: any) {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons
          name={item.icon}
          size={20}
          color={item.positive ? "#ffd33d" : "#ff5c5c"}
        />
      </View>

      <View style={styles.activityTextContainer}>
        <Text style={styles.activityTitle}>
          {item.title}{" "}
          {item.value && (
            <Text
              style={{
                color: item.positive ? "#ffd33d" : "#ff5c5c"
              }}
            >
              ({item.value})
            </Text>
          )}
        </Text>
        <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },

  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2e3238",
    justifyContent: "center",
    alignItems: "center"
  },

  activityTextContainer: {
    flex: 1
  },

  activityTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500"
  },

  activitySubtitle: {
    color: "#7a7f87",
    fontSize: 12,
    marginTop: 4
  }
});