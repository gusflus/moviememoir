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
  const [tempWatched, setTempWatched] = useState([]);
  const [images, setImages] = useState({});
  const navigation = useNavigation();

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
        querySnapshot.forEach((watchedMovie) => {
          setTempWatched((tempWatched) => [
            ...tempWatched,
            { ...watchedMovie.data(), fbid: watchedMovie.id },
          ]);
        });
      });
  };

  const handleSignOut = () => {
    auth.signOut();
    navigation.replace("Login");
  };

  const handlePushToFirestore = () => {
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

  const getImage = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    setImages((prevImages) => {
      return {
        ...prevImages,
        [id]: data.poster_path,
      };
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.wrapper}>
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
          </View>
          <View
            style={{
              width: "100%",
              alignContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {tempWatched.map((movie) => {
              const image = images[movie.id];
              if (!image) {
                getImage(movie.id);
              }
              return (
                <MovieCard
                  id={movie.id}
                  rating={movie.rating}
                  image={image}
                  key={movie.id}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
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
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 150,
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
