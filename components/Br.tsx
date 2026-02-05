import { StyleSheet, Text, View } from "react-native";

type Props = {
  label?: string;
}

export default function Br({ label }: Props) {
  return (
    <>
      {
        label ?
        <View style={styles.container}>
          <View style={{ height: 1, flex: 1, borderTopWidth: 1, borderColor: "#a1a1a1" }}/>
            <Text style={{ color: "#a1a1a1" }}>{label}</Text>
          <View style={{ height: 1, flex: 1, borderTopWidth: 1, borderColor: "#a1a1a1" }}/>
        </View>
        :
        <View style={{ height: 1, flex: 1, borderTopWidth: 1, borderColor: "#a1a1a1" }}/>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    width: "100%",
    gap: 8
  }
})