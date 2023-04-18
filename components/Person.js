import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { colors } from "./Colors";

const Person = ({ image, name, role }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.role}>as: {role}</Text>
      </View>
    </View>
  );
};

export default Person;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 250,
    marginHorizontal: 15,
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 250,
    resizeMode: "cover",
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    height: "25%",
    backgroundColor: colors.dark_transparent,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: colors.light,
    fontSize: 18,
    textAlign: "center",
  },
  role: {
    color: colors.light,
    fontSize: 12,
    textAlign: "center",
  },
});