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
import * as Haptics from "expo-haptics";

import MediaCard from "../components/MediaCard";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";

import { TMDB_API_KEY } from "@env";
import { colors } from "../components/Colors";

const Watchlist = () => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [json, setJson] = useState([]);
  const [filteredJson, setFilteredJson] = useState([]);

  useEffect(() => {
    handleRefresh(true);
  }, [isFocused]);

  useEffect(() => {
    setFilteredJson(json);
  }, [json]);

  const handleFetch = async (id, type) => {
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
      const media = { jsonData, media_type: type };
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
        .collection("watchlist")
        .get();
      const mediaPromises = [];
      querySnapshot.forEach((watchedMedia) => {
        const mediaPromise = handleFetch(
          watchedMedia.data().id,
          watchedMedia.data().type
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
          <Header title="Your Watchlist" />
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
              <Text style={styles.subtitle}>What to Watch:</Text>
              {filteredJson.map((json) => {
                return (
                  <MediaCard
                    id={json.jsonData.id}
                    image={json.jsonData.poster_path}
                    type={json.media_type}
                    key={json.jsonData.id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Watchlist;

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
});
