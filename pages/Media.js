import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, firestore } from "../Firebase";
import { TMDB_API_KEY } from "@env";

import Header from "../components/Header";
import RatingBar from "../components/RatingBar";
import TextBox from "../components/TextBox";
import PersonCard from "../components/PersonCard";

import { colors } from "../components/Colors";

const Media = ({ route }) => {
  const { width } = Dimensions.get("window");
  const [json, setJson] = useState(null);
  const [service, setService] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    handleFetch();
    handleFetchCredits();
    handleService();
  }, []);

  const handleFetch = () => {
    let url;
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "person":
        url = `https://api.themoviedb.org/3/person/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      default:
        console.log("(Media.js) Invalid category: " + route.params.type);
        break;
    }

    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setJson(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleService = () => {
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}/watch/providers?api_key=${TMDB_API_KEY}`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}/watch/providers?api_key=${TMDB_API_KEY}`;
        break;
      default:
        console.log("(Media.js) Invalid category: " + route.params.type);
        break;
    }

    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setService(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFetchCredits = () => {
    let url;
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "person":
        url = `https://api.themoviedb.org/3/person/${route.params.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      default:
        console.log(
          "(Media.js - credits) Invalid category: " + route.params.type
        );
        break;
    }
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setCredits(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePushToFirestore = () => {
    console.log("pushing to firestore " + json.id);
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .doc(String(json.id))
      .set({
        rating: 5,
        type: route.params.type,
        id: String(json.id),
      })
      .then(() => {
        console.log("added to firestore");
      })
      .catch((error) => {
        console.log("fbtest" + error);
      });
  };

  const showStreaming = () => {
    let platform;
    try {
      platform = service.results.US.flatrate[0];
    } catch (error) {
      console.log(error);
      return;
    }

    return (
      <View style={styles.horizontal}>
        <Text style={styles.info}>Avaliable on: {platform.provider_name}</Text>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w200${platform.logo_path}`,
          }}
          style={styles.logo}
        />
      </View>
    );
  };

  if (json == null || credits == null || service == null) {
    return;
  }

  return (
    <>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Header
        title={json.title == undefined ? json.name : json.title}
        back={true}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${json.backdrop_path}`,
            }}
            style={styles.image}
          />
          <View style={styles.infoWrapper}>
            <View style={styles.horizontal}>
              <Text style={styles.info}>
                {Math.floor(json.runtime / 60) +
                  ":" +
                  (json.runtime % 60 < 10 ? "0" : "") +
                  (json.runtime % 60)}
              </Text>
              <MaterialCommunityIcons
                name="clock-outline"
                size={22}
                color={colors.light}
              />
            </View>
            {showStreaming()}
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.subtitle}>Your Rating:</Text>
            <View style={styles.center}>
              <RatingBar
                styles={styles.userRating}
                progress={route.params.rating}
              />
            </View>
            <Text style={styles.subtitle}>Average Rating:</Text>
            <View style={styles.center}>
              <RatingBar
                styles={styles.userRating}
                progress={Math.floor(json.vote_average + 0.5)}
              />
            </View>
          </View>
          <TextBox title="Overview:" text={json.overview} />
        </View>
        <View style={styles.castContainer}>
          <Text style={styles.subtitle}>Cast:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View style={styles.horizontal}>
              {credits.cast.map((person) => {
                return (
                  <PersonCard
                    id={person.id}
                    image={person.profile_path}
                    name={person.name}
                    role={person.character}
                    key={person.id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={handlePushToFirestore}
          style={[styles.button, { marginLeft: width * 0.1 }]}
        >
          <Text>Add to Watchlist</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  image: {
    width: "90%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 20,
  },
  infoWrapper: {
    width: "90%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.light_transparent,
    justifyContent: "center",
    borderRadius: 20,
  },
  info: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.light,
    marginHorizontal: 10,
  },
  logo: {
    height: 45,
    width: 45,
    resizeMode: "cover",
    borderRadius: 0,
    overflow: "hidden",
    marginVertical: 20,
    borderRadius: 10,
  },
  horizontal: {
    justifyContent: "center",
    flexDirection: "row",
  },
  ratingContainer: {
    width: "90%",
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.light_transparent,
    justifyContent: "center",
    borderRadius: 20,
  },
  userRating: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  castContainer: {
    width: "90%",
    paddingTop: 10,
    paddingBottom: 25,
    marginHorizontal: 20,
    marginVertical: 25,
    backgroundColor: colors.light_transparent,
    borderRadius: 20,
  },
  horizontal: {
    width: "90%",
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.light,
    marginTop: 10,
    marginLeft: 20,
  },
  button: {
    width: "80%",
    marginBottom: 35,
    backgroundColor: colors.secondary,
    alignItems: "center",
    padding: 20,
    margin: 5,
    borderRadius: 25,
  },
});
