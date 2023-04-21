import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TMDB_API_KEY } from "@env";
import React from "react";

import { colors } from "./Colors";

const MediaCard = ({ id, image, rating, type }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const [json, setJson] = useState(null);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    let url;
    switch (type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "person":
        url = `https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      default:
        console.log("(MediaCard.js) Invalid category: " + type);
        break;
    }

    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setJson(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRuntime = () => {
    if (type == "movie") {
      return (
        <View style={styles.horizontal}>
          <Text style={styles.text}>
            {Math.floor(json.runtime / 60) +
              ":" +
              (json.runtime % 60 < 10 ? "0" : "") +
              (json.runtime % 60)}
            {"  "}
          </Text>
          <MaterialCommunityIcons
            name="clock-outline"
            size={14}
            color={colors.light}
            style={{ marginTop: 5 }}
          />
        </View>
      );
    } else {
      return (
        <Text style={styles.text}>
          {`${json.number_of_seasons} S ${json.number_of_episodes} E`}
        </Text>
      );
    }
  };

  if (json == null) {
    return;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Media", {
          id: id,
          rating: rating,
          type: type,
        });
      }}
    >
      <View style={[styles.container, { width: width * 0.45 }]}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.text}>{json != null ? json.title : ""}</Text>
          {getRuntime()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MediaCard;

const styles = StyleSheet.create({
  container: {
    height: 320,
    marginHorizontal: 5,
    marginTop: 20,
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
  horizontal: {
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: colors.light,
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});
