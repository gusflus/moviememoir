import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { auth, firestore } from "../Firebase";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

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
  const [displayMethod, setDisplayMethod] = useState("by rating");

  useEffect(() => {
    handleRefresh(true);
  }, [isFocused]);

  useEffect(() => {
    setFilteredJson(json);
  }, [json]);

  const handleFetch = async (id, type, rating, date) => {
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

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      const media = {
        jsonData,
        media_type: type,
        rating: rating,
        date: date,
      };
      return media;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = async (auto = false) => {
    if (!auto) {
      setRefreshing(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
    }

    try {
      const querySnapshot = await firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("watched")
        .get();
      const mediaPromises = [];
      querySnapshot.forEach((watchedMedia) => {
        const mediaPromise = handleFetch(
          watchedMedia.data().id,
          watchedMedia.data().type,
          watchedMedia.data().rating,
          watchedMedia.data().date
        );
        mediaPromises.push(mediaPromise);
      });
      const mediaArray = await Promise.all(mediaPromises);
      const uniqueMedia = mediaArray.filter((media, index, self) => {
        return (
          index === self.findIndex((m) => m.jsonData.id === media.jsonData.id)
        );
      });
      setJson(uniqueMedia);
      setFilteredJson(uniqueMedia);
    } catch (error) {
      console.log(error);
    }

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

  const readableDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

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

  const byRatingView = () => {
    return Object.keys(mediaCardsByRating)
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
      ));
  };

  const byDateView = () => {
    const sortedJson = filteredJson.sort((a, b) => {
      console.log(a.date);
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return sortedJson.map((json) => (
      <View key={json.jsonData.id}>
        <MediaCard
          id={json.jsonData.id}
          image={json.jsonData.poster_path}
          type={json.media_type}
          key={json.jsonData.id}
        />
        <Text style={styles.date}>{readableDate(json.date)}</Text>
      </View>
    ));
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
              <View style={styles.horizontal}>
                <Text style={styles.subtitle}>Your Ratings:</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Light
                    );
                    if (displayMethod === "by rating") {
                      setDisplayMethod("by timeline");
                    } else {
                      setDisplayMethod("by rating");
                    }
                  }}
                >
                  <Text style={styles.buttonText}>{displayMethod}</Text>
                </TouchableOpacity>
              </View>
              {displayMethod === "by rating" ? byRatingView() : byDateView()}
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
    fontSize: 35,
    fontWeight: "bold",
    color: colors.dark,
    marginLeft: 0,
    marginTop: 10,
  },
  button: {
    width: "35%",
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 5,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  ratingContainer: {
    width: "97%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 25,
    paddingBottom: 5,
    borderRadius: 20,
  },
  date: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.light,
    marginTop: 10,
  },
  ratingTitle: {
    alignSelf: "center",
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
