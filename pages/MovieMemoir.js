import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../Firebase";

import MovieCard from "../components/MovieCard";

import { TMDB_API_KEY } from "@env";
import { colors } from "../components/Colors";

const MovieMemoir = () => {
  const [id, setId] = useState("");
  const [rating, setRating] = useState("");
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [movieUrls, setMovieUrls] = useState([]);
  const [tempWatched, setTempWatched] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    refresh();
  }, []);

  refresh = () => {
    setTempWatched([]);
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((watchedMovie) => {
          setTempWatched((tempWatched) => [
            ...tempWatched,
            { ...watchedMovie.data(), fbid: watchedMovie.id },
          ]);
        });
      });

    setMovieUrls([]);
    getMovieImages();
  };

  const handleSignOut = () => {
    auth.signOut();
    navigation.replace("Login");
  };

  handlePushToFirestore = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .add({
        id: id,
        rating: rating,
      })
      .then(() => {
        console.log("added to firestore");
      });

    refresh();
  };

  const getMovieImages = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            placeholder="id"
            value={id}
            onChangeText={(text) => setId(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="rating"
            value={rating}
            onChangeText={(text) => setRating(text)}
            style={styles.input}
            keyboardType="numeric"
          />

          <TouchableOpacity
            onPress={handlePushToFirestore}
            style={styles.button}
          >
            <Text>push to firestore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            style={[styles.button, { marginBottom: 15 }]}
          >
            <Text>sign out</Text>
          </TouchableOpacity>

          {tempWatched.map((movie) => {
            return (
              <MovieCard
                key={movie.fbid}
                id={movie.id}
                rating={movie.rating}
                image={movieUrls[movie.id]}
              />
            );
          })}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default MovieMemoir;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark,
  },
  input: {
    width: "80%",
    backgroundColor: colors.secondary,
    padding: 25,
    margin: 5,
    borderRadius: 25,
  },
  button: {
    width: "80%",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    alignItems: "center",
    padding: 20,
    margin: 5,
    borderRadius: 25,
  },
  watchedContainer: {
    width: "50%",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    alignItems: "center",
    padding: 10,
    marginTop: 15,
    borderRadius: 15,
  },
});
