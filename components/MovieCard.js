import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import { colors } from "./Colors";

const MovieCard = ({ id, image, rating }) => {
  const navigation = useNavigation();

  console.log(`https://image.tmdb.org/t/p/w500${image}`);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Movie", { id: id, rating: rating });
      }}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.text}>{id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

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
    fontSize: 16,
    textAlign: "center",
  },
});
