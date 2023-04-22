import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./Colors";

const ImageUnavailable = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="camera-off-outline"
        size={60}
        color={colors.light}
      />
      <Text style={styles.text}>Image Unavailable</Text>
    </View>
  );
};

export default ImageUnavailable;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: 250,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.light,
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
});
