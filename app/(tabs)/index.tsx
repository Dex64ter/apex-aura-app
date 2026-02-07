import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function Index() {

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.footerContainer}>
        
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  imageContainer: {
    flex: 1
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center"
  },
  optionsContainer: {
    bottom: 80,
    position: 'absolute'
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
  }
})