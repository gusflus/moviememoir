import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { auth, firestore } from "../Firebase";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

import MediaCard from "../components/MediaCard";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";

import { TMDB_API_KEY } from "@env";
import { colors } from "../components/Colors";

const WatchHistory = () => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [json, setJson] = useState([]);
  const [filteredJson, setFilteredJson] = useState([]);

  useEffect(() => {
    handleRefresh();
  }, [isFocused]);

  useEffect(() => {
    setFilteredJson(json);
  }, [json]);

  const handleFetch = (id, type, rating) => {
    let url;
    switch (type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      default:
        console.log("(Watchlist.js - details) Invalid category: " + type);
        break;
    }

    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const media = { jsonData, media_type: type, rating: rating };
        if (!json.some((item) => item.jsonData.id === media.jsonData.id)) {
          setJson((json) => [...json, media]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRefresh = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((watchedMedia) => {
          handleFetch(
            watchedMedia.data().id,
            watchedMedia.data().type,
            watchedMedia.data().rating
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setRefreshing(false);
  };

  const handleSearch = (text) => {
    const filtered = json.filter((media) => {
      if (text.length === 0) {
        return true;
      } else {
        return media.jsonData.title.toLowerCase().includes(text.toLowerCase());
      }
    });

    setFilteredJson(filtered);
  };

  const mediaCardsByRating = filteredJson.reduce((acc, curr) => {
    const rating = curr.rating;
    if (!acc[rating]) {
      acc[rating] = [curr];
    } else {
      acc[rating].push(curr);
    }
    return acc;
  }, {});

  const getColorFromRating = (rating) => {
    const value = rating / 10;

    const stops = [
      { stop: 0, color: [207, 32, 39] },
      { stop: 0.5, color: [255, 217, 0] },
      { stop: 1, color: [69, 173, 70] },
    ];

    let lowerStop, upperStop;
    for (let i = 0; i < stops.length - 1; i++) {
      if (value >= stops[i].stop && value <= stops[i + 1].stop) {
        lowerStop = stops[i];
        upperStop = stops[i + 1];
        break;
      }
    }

    const lowerWeight =
      (upperStop.stop - value) / (upperStop.stop - lowerStop.stop);
    const upperWeight = 1 - lowerWeight;
    const color = [
      Math.round(
        lowerWeight * lowerStop.color[0] + upperWeight * upperStop.color[0]
      ),
      Math.round(
        lowerWeight * lowerStop.color[1] + upperWeight * upperStop.color[1]
      ),
      Math.round(
        lowerWeight * lowerStop.color[2] + upperWeight * upperStop.color[2]
      ),
    ];

    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.33)`;
  };

  if (json == null) {
    return;
  }

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
          <Header title="Your Watch History" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 90,
              paddingTop: 10,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <Searchbar onChangeText={handleSearch} />
            <View style={styles.wrapper}>
              <Text style={styles.subtitle}>Your Ratings:</Text>
              {Object.keys(mediaCardsByRating)
                .sort((a, b) => b - a)
                .map((rating) => (
                  <View
                    style={[
                      styles.ratingContainer,
                      { backgroundColor: getColorFromRating(rating) },
                    ]}
                    key={rating}
                  >
                    <Text style={styles.ratingTitle}>Rated {rating}:</Text>
                    <View style={styles.horizontal}>
                      {mediaCardsByRating[rating].map((json) => (
                        <MediaCard
                          id={json.jsonData.id}
                          image={json.jsonData.poster_path}
                          type={json.media_type}
                          key={json.jsonData.id}
                        />
                      ))}
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </>
  );
};

export default WatchHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark,
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
    marginLeft: 40,
    marginTop: 10,
  },
  ratingContainer: {
    width: "96%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 25,
    paddingBottom: 5,
    borderRadius: 20,
  },
  ratingTitle: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: colors.light,
  },
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 1.79,
  },
});
