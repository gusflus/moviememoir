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

import ImageUnavailable from "./ImageUnavailable";

const PersonCard = ({ id, image, name, role }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Person", { id: id });
      }}
    >
      <View style={[styles.container, { width: width * 0.45 }]}>
        {image ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
            style={styles.image}
          />
        ) : (
          <ImageUnavailable />
        )}
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
    height: 320,
    marginHorizontal: 5,
    marginTop: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 4,
  },
  image: {
    height: 250,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: colors.very_dark,
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
