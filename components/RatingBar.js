import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { colors } from "./Colors";

const RatingBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress * 10}%`,
              backgroundColor: `rgb(${Math.round(
                ((10 - progress) * 255) / 10
              )}, ${Math.round((progress * 255) / 10)}, 0)`,
            },
          ]}
        />
      </View>

      <Text style={styles.text}>{progress} / 10</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "75%",
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  barContainer: {
    width: "100%",
    height: 15,
    backgroundColor: colors.light_transparent,
    borderRadius: 13,
    marginLeft: 10,
  },
  progress: {
    height: "100%",
    borderRadius: 13,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.light,
    marginHorizontal: 10,
  },
});

export default RatingBar;
