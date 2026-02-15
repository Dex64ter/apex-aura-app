import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TeamCard({ team }: any) {
  return (
    <TouchableOpacity style={styles.teamCard}>
      <View style={styles.teamIconContainer}>
        <MaterialIcons
          name={team.icon}
          size={24}
          color={team.highlight ? "#ffd33d" : "#b0b0b0"}
        />
      </View>

      <Text style={styles.teamName}>{team.name}</Text>

      <Text
        style={[
          styles.teamActivity,
          team.highlight && { color: "#00bfff" }
        ]}
      >
        {team.activity}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  teamCard: {
    flex: 1,
    backgroundColor: "#2e3238",
    padding: 16,
    borderRadius: 16,
    gap: 12
  },

  teamIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#3a3f46",
    justifyContent: "center",
    alignItems: "center"
  },

  teamName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },

  teamActivity: {
    fontSize: 13,
    color: "#a1a1a1"
  },
});