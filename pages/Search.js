import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../components/Colors";
import { TMDB_API_KEY } from "@env";

import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import MediaCard from "../components/MediaCard";

const Search = () => {
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = () => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setTrending(jsonData.results);
        getResults();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setSearchResults(jsonData.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getResults = () => {
    if (searchResults[0] == -1) {
      return (
        <View style={styles.container}>
          <Text>No results found</Text>
        </View>
      );
    } else if (searchResults.length == 0) {
      return trending.map((media) => (
        <MediaCard
          id={media.id}
          rating={media.rating}
          image={media.poster_path}
          key={media.id}
        />
      ));
    } else {
      return searchResults.map((media) => (
        <MediaCard
          id={media.id}
          rating={media.rating}
          image={media.poster_path}
          key={media.id}
        />
      ));
    }
  };

  return (
    <>
      <LinearGradient
        colors={[colors.secondary, colors.dark]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Header title="Explore" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 90,
            }}
          >
            <Searchbar onChangeText={handleSearch} />
            <View style={styles.wrapper}>
              <Text style={styles.subTitle}>Trending: </Text>
              {getResults()}
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  wrapper: {
    width: "100%",
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  subTitle: {
    width: "100%",
    fontSize: 35,
    fontWeight: "bold",
    color: colors.dark,
    marginLeft: 45,
    marginTop: 10,
  },
});
