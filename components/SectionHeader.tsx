import { StyleSheet, Text, View } from "react-native";

export default function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <Text style={styles.sectionAction}>{action}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  sectionTitle: {
    color: "#7a7f87",
    letterSpacing: 2,
    fontSize: 12
  },

  sectionAction: {
    color: "#ffd33d",
    fontWeight: "600"
  },
});