import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { colors } from "./Colors";

const RatingBar = ({ progress }) => {
  const getColorFromRating = (rating) => {
    const value = rating / 10;

    const stops = [
      { stop: 0, color: [207, 32, 39] },
      { stop: 0.5, color: [255, 217, 0] },
      { stop: 1, color: [69, 173, 70] },
    ];

    let lowerStop, upperStop;
    for (let i = 0; i < stops.length - 1; i++) {
      if (value >= stops[i].stop && value <= stops[i + 1].stop) {
        lowerStop = stops[i];
        upperStop = stops[i + 1];
        break;
      }
    }

    const lowerWeight =
      (upperStop.stop - value) / (upperStop.stop - lowerStop.stop);
    const upperWeight = 1 - lowerWeight;
    const color = [
      Math.round(
        lowerWeight * lowerStop.color[0] + upperWeight * upperStop.color[0]
      ),
      Math.round(
        lowerWeight * lowerStop.color[1] + upperWeight * upperStop.color[1]
      ),
      Math.round(
        lowerWeight * lowerStop.color[2] + upperWeight * upperStop.color[2]
      ),
    ];

    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
  };
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress * 10}%`,
              backgroundColor: getColorFromRating(progress),
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
