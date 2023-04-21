import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors } from "./Colors";

const CONTENT_RADIUS = 220;
const CONTENT_SIZE = 30;

const Rater = ({ onRate }) => {
  const [rating, setRating] = React.useState(0);

  const renderContent = (index) => {
    const section = 100;
    const angle = (section / 10) * index - 90 - section / 2;
    const x = CONTENT_RADIUS * Math.cos(angle * (Math.PI / 180));
    const y = CONTENT_RADIUS * Math.sin(angle * (Math.PI / 180));
    return (
      <TouchableOpacity
        onPress={() => setRating(index)}
        style={[
          styles.content,
          {
            position: "absolute",
            left: CONTENT_RADIUS - CONTENT_SIZE / 0.8,
            bottom: -35,
            left: 160,
            transform: [{ translateX: x }, { translateY: y }],
          },
        ]}
        key={index}
      >
        {index == 0 || index == 10 ? (
          <MaterialCommunityIcons
            name={index == 0 ? "star-outline" : "star-face"}
            size={index == 0 || index == 10 ? 45 : 34}
            color={index == 0 ? "#000" : "#12D600"}
            style={{ margin: index == 0 || index == 10 ? -10 : 0 }}
          />
        ) : (
          <FontAwesome
            name="star"
            size={34}
            color={index <= rating ? colors.primary : colors.secondary}
            style={{ margin: 0 }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const contents = Array.from(Array(11).keys()).map((i) => renderContent(i));

  return (
    <View style={styles.container}>
      {contents}
      <TouchableOpacity
        onPress={() => onRate(rating)}
        style={[
          styles.button,
          {
            backgroundColor: `rgb(${Math.round(
              ((10 - rating) * 255) / 10
            )}, ${Math.round((rating * 255) / 10)}, 0)`,
          },
        ]}
      >
        <Text style={styles.contentText}>{`Rate ${rating}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onRate(null)}
        style={[
          styles.button,
          {
            width: 60,
            height: 40,
            marginTop: 5,
            backgroundColor: "#FF0000",
          },
        ]}
      >
        <Text style={styles.contentText}>Unrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  content: {
    width: CONTENT_SIZE,
    height: CONTENT_SIZE,
    borderRadius: CONTENT_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 110,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Rater;
