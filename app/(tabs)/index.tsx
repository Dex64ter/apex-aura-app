import Button from "@/components/Button";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function Index() {
  const [showOptionsButtons, setShowOptionsButtons] = useState<boolean>(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={() => setShowOptionsButtons(true)} />
        <Button
          label="Use this photo"
          onPress={() => setShowOptionsButtons(true)}
        />
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