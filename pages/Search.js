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
import { useIsFocused } from "@react-navigation/native";

import { colors } from "../components/Colors";
import { TMDB_API_KEY } from "@env";

import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import MediaCard from "../components/MediaCard";
import PersonCard from "../components/PersonCard";
import BottomSheet from "../components/BottomSheet";

const Search = () => {
  const isFocused = useIsFocused();
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [sheet, setSheet] = useState(false);
  const [filter, setFilter] = useState("popularity");

  useEffect(() => {
    setSheet(false);
    getTrending();
  }, [isFocused]);

  useEffect(() => {
    handleFilter();
  }, [filter]);

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

  const handleFilter = () => {
    getResults();
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
          image={
            media.media_type == "person"
              ? media.profile_path
              : media.poster_path
          }
          type={media.media_type}
          key={media.id}
        />
      ));
    } else {
      const sortedResults = searchResults.sort((a, b) => b[filter] - a[filter]);
      return sortedResults.map((media) =>
        media.media_type == "person" ? (
          <PersonCard
            id={media.id}
            rating={media.rating}
            image={media.profile_path}
            type={media.media_type}
            key={media.id}
          />
        ) : (
          <MediaCard
            id={media.id}
            rating={media.rating}
            image={media.poster_path}
            type={media.media_type}
            key={media.id}
          />
        )
      );
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
      <TouchableWithoutFeedback onPress={() => setSheet(false)}>
        <>
          <Header title="Explore" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 90,
              paddingTop: 10,
            }}
          >
            <Searchbar
              onChangeText={handleSearch}
              filterButton
              filterFunc={() => setSheet(true)}
            />
            <View style={styles.wrapper}>
              <Text style={styles.subtitle}>
                {searchResults.length == 0 ? "Trending:" : "Search Results:"}
              </Text>
              {getResults()}
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
      <BottomSheet
        isOpen={sheet}
        style={styles.sheet}
        close={() => setSheet(false)}
        children={
          <>
            <Text style={styles.filterTitle}>Sort:</Text>
            <View style={styles.horizontal}>
              <TouchableOpacity
                onPress={() => {
                  setFilter("popularity");
                  setSheet(false);
                }}
                style={styles.filterButtonContainer}
              >
                <Text>Popularity</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFilter("vote_average");
                  setSheet(false);
                }}
                style={styles.filterButtonContainer}
              >
                <Text>Rating</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
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
  subtitle: {
    width: "100%",
    fontSize: 35,
    fontWeight: "bold",
    color: colors.dark,
    marginLeft: 45,
    marginTop: 10,
  },
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  filterTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 20,
  },
  filterButtonContainer: {
    width: 100,
    padding: 10,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 5,
  },
});
