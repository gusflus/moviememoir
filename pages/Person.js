import { StyleSheet, View, Image, ScrollView, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TMDB_API_KEY } from "@env";

import Header from "../components/Header";
import RatingBar from "../components/RatingBar";
import TextBox from "../components/TextBox";
import MediaCard from "../components/MediaCard";

import { colors } from "../components/Colors";

const Person = ({ route }) => {
  const [json, setJson] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    handleFetch();
    handleFetchCredits();
  }, []);

  const handleFetch = () => {
    const url = `https://api.themoviedb.org/3/person/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;

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
    const url = `https://api.themoviedb.org/3/person/${route.params.id}/combined_credits?api_key=${TMDB_API_KEY}&language=en-US`;

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
      <Header title={json.name} back={true} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${json.profile_path}`,
            }}
            style={styles.image}
          />
          <View style={styles.castContainer}>
            <Text style={styles.subtitle}>Movies and TV:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            >
              <View style={styles.horizontal}>
                {credits.cast
                  .sort((a, b) => b.popularity - a.popularity)
                  .map((media) => {
                    return (
                      <MediaCard
                        id={media.id}
                        image={media.poster_path}
                        name={media.title}
                        type={media.media_type}
                        key={media.id}
                      />
                    );
                  })}
              </View>
            </ScrollView>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <TextBox title="Biography:" text={json.biography} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Person;

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
    paddingTop: 10,
    paddingBottom: 25,
    marginHorizontal: 20,
    marginBottom: 25,
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
  subtitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.light,
    marginTop: 10,
    marginLeft: 20,
  },
});
