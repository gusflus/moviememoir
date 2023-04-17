import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../Firebase";

import { colors } from "../components/Colors";

const MovieMemoir = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
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
            { ...watchedMovie.data(), id: watchedMovie.id },
          ]);
        });
      });
  };

  handlePushToFirestore = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .add({
        title: title,
        rating: rating,
      })
      .then(() => {
        console.log("added to firestore");
      });

    refresh();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          placeholder="title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="rating"
          value={rating}
          onChangeText={(text) => setRating(text)}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handlePushToFirestore} style={styles.button}>
          <Text>push to firestore</Text>
        </TouchableOpacity>

        {tempWatched.map((movie) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Movie", {
                  fbid: movie.id,
                  id: "22582",
                });
              }}
              key={movie.title}
            >
              <View style={styles.watchedContainer}>
                <Text>{movie.title}</Text>
                <Text>{movie.rating}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
