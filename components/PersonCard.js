import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import { colors } from "./Colors";

const PersonCard = ({ id, image, name, role }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Person", { id: id });
      }}
    >
      <View style={[styles.container, { width: width * 0.4 }]}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.role}>
            {role == undefined ? "" : `as: ${role}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonCard;

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginHorizontal: 15,
    marginTop: 20,
  },
  image: {
    height: 250,
    resizeMode: "cover",
    borderRadius: 15,
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    color: colors.light,
    fontSize: 16,
    textAlign: "center",
  },
  role: {
    color: colors.light,
    fontSize: 12,
    textAlign: "center",
  },
});
