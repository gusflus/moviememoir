import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import { colors } from "./Colors";

const Icon = ({ iconName, focused }) => {
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View
        style={[focused ? styles.front : styles.back, { width: width * 0.5 }]}
      >
        <MaterialCommunityIcons name={iconName} size={24} color="black" />
      </View>
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  front: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    top: 20,
    backgroundColor: colors.dark,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
});
