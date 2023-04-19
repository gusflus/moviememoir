import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import { colors } from "./Colors";

const Icon = ({ iconName, focused }) => {
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View
        style={[focused ? styles.front : styles.back, { width: width * 0.333 }]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={focused ? colors.primary : colors.dark}
        />
      </View>
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  front: {
    backgroundColor: colors.dark,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    top: 10,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    height: 70,
    paddingBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
