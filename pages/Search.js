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
import { useState } from "react";

import { TMDB_API_KEY } from "@env";

import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import MovieCard from "../components/MovieCard";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [images, setImages] = useState({});

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
    if (searchResults === undefined) {
      return;
    }

    return searchResults.map((movie) => (
      <MovieCard
        id={movie.id}
        rating={movie.rating}
        image={movie.poster_path}
        key={movie.id}
      />
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.layout}>
        <Header title="Search" />
        <Searchbar onChangeText={handleSearch} />
        <View
          style={{
            width: "100%",
            alignContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {getResults()}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  layout: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
