import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  return (
    <>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Hello World!</ThemedText>
        <HelloWave />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
