import { StyleSheet, View, Image, ScrollView, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TMDB_API_KEY } from "@env";

import Header from "../components/Header";
import RatingBar from "../components/RatingBar";
import TextBox from "../components/TextBox";
import Person from "../components/Person";

import { colors } from "../components/Colors";

const Media = ({ route }) => {
  const [json, setJson] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    handleFetch();
    handleFetchCredits();
  }, []);

  const handleFetch = () => {
    let url;
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "person":
        url = `https://api.themoviedb.org/3/person/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      default:
        console.log("(Media.js) Invalid category: " + route.params.type);
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

  const handleFetchCredits = () => {
    let url;
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "person":
        url = `https://api.themoviedb.org/3/person/${route.params.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      default:
        console.log(
          "(Media.js - credits) Invalid category: " + route.params.type
        );
        break;
    }
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setCredits(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (json == null || credits == null) {
    return;
  }

  return (
    <>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Header title={json.original_title} back={true} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${json.backdrop_path}`,
            }}
            style={styles.image}
          />
          <View style={styles.ratingContainer}>
            <Text style={styles.subTitle}>Your Rating:</Text>
            <View style={styles.center}>
              <RatingBar
                styles={styles.userRating}
                progress={route.params.rating}
              />
            </View>
            <Text style={styles.subTitle}>Average Rating:</Text>
            <View style={styles.center}>
              <RatingBar
                styles={styles.userRating}
                progress={Math.floor(json.vote_average + 0.5)}
              />
            </View>
          </View>
          <TextBox title="Overview:" text={json.overview} />
        </View>
        <View style={styles.castContainer}>
          <Text style={styles.subTitle}>Cast:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontal}>
              {credits.cast.map((person) => {
                return (
                  <Person
                    key={person.id}
                    image={person.profile_path}
                    name={person.name}
                    role={person.character}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  image: {
    width: "90%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 20,
  },
  ratingContainer: {
    width: "90%",
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.light_transparent,
    justifyContent: "center",
    borderRadius: 20,
  },
  userRating: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  castContainer: {
    width: "90%",
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 25,
    backgroundColor: colors.light_transparent,
    borderRadius: 20,
  },
  horizontal: {
    width: "90%",
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.light,
    marginTop: 10,
    marginLeft: 20,
  },
});
