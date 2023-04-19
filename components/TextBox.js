import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { colors } from "./Colors";

const TextBox = ({ text, title }) => {
  return (
    <View style={styles.boxContainer}>
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.box}>{text}</Text>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  boxContainer: {
    width: "90%",
    borderRadius: 20,
    backgroundColor: colors.light_transparent,
    padding: 20,
  },
  boxTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.light,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  box: {
    fontSize: 18,
    color: colors.light,
    marginHorizontal: 10,
  },
});
