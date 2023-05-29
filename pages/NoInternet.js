import { StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";

import { colors } from "../components/Colors";

const NoInternet = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/title.png")}
        style={styles.imageContainer}
      />
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.spinner}
      />
    </SafeAreaView>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.dark,
    justifyContent: "center",
  },
  imageContainer: {
    position: "absolute",
    top: "20%",
    alignItems: "center",
    width: "75%",
    resizeMode: "contain",
  },
  spinner: {
    position: "absolute",
    top: "75%",
  },
});
