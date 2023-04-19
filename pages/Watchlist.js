import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { auth, firestore } from "../Firebase";
import { LinearGradient } from "expo-linear-gradient";

import MediaCard from "../components/MediaCard";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";

import { TMDB_API_KEY } from "@env";
import { colors } from "../components/Colors";

const Home = () => {
  const { width } = Dimensions.get("window");
  const [id, setId] = useState("");
  const [rating, setRating] = useState("");
  const [tempWatched, setTempWatched] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setTempWatched([]);
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((watchedMedia) => {
          setTempWatched((tempWatched) => [
            ...tempWatched,
            { ...watchedMedia.data(), fbid: watchedMedia.id },
          ]);
        });
      });
  };

  const handlePushToFirestore = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .doc(id)
      .set({
        rating: rating,
        type: "movie",
        id: id,
      })
      .then(() => {
        console.log("added to firestore");
      });

    refresh();
  };

  const handleSearch = (text) => {};

  const getResults = () => {};

  const getImage = async (type, id) => {
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
    }

    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const data = jsonData;
        setImages((prevImages) => {
          return {
            ...prevImages,
            [id]: data.poster_path,
          };
        });
      });
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
          <Header title="Your Watchlist" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 90,
              paddingTop: 10,
            }}
          >
            <Searchbar onChangeText={handleSearch} />
            <View style={styles.wrapper}>
              <Text style={styles.subtitle}>What to Watch:</Text>
              {tempWatched.map((media) => {
                const image = images[media.id];
                if (!image) {
                  getImage(media.type, media.id);
                }
                return (
                  <MediaCard
                    id={media.id}
                    rating={media.rating}
                    image={image}
                    type={media.type}
                    key={media.id}
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

export default Home;

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
