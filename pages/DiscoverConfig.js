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
import { useNavigation } from "@react-navigation/native";

import { colors } from "../components/Colors";
import { TMDB_API_KEY } from "@env";

import Header from "../components/Header";
import DiscoverButton from "../components/DiscoverButton";

const Discover = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [type, setType] = useState("movie");
  const [genres, setGenres] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [avaliableOn, setAvaliableOn] = useState([]);
  const [ratingAtLeast, setRatingAtLeast] = useState(0);
  const [releasedAfter, setReleasedAfter] = useState(null);

  useEffect(() => {}, [isFocused]);

  const handleTypeToggle = (type) => {
    setType(type);
  };

  const handleGenreToggle = (genre) => {
    genres.includes(genre)
      ? setGenres(genres.filter((g) => g !== genre))
      : setGenres([...genres, genre]);
  };

  const handleSortByToggle = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleAvaliableOn = (service) => {
    avaliableOn.includes(service)
      ? setAvaliableOn(avaliableOn.filter((s) => s !== service))
      : setAvaliableOn([...avaliableOn, service]);
  };

  const handleRatingAtLeast = (rating) => {
    ratingAtLeast == rating ? setRatingAtLeast(0) : setRatingAtLeast(rating);
  };

  const handleReleasedAfter = (date) => {
    releasedAfter == date ? setReleasedAfter(null) : setReleasedAfter(date);
  };

  const buildURL = () => {
    let url = "";
    if (type == "movie") {
      url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_API_KEY}&language=en-US&vote_count.gte=250&sort_by=${sortBy}&include_adult=false&include_video=false&${
        releasedAfter ? `release_date.gte=${releasedAfter}` : ""
      }&page=1&with_genres=${genres.join(
        "|"
      )}&with_watch_providers=${avaliableOn.join(
        "|"
      )}&watch_region=US&with_watch_monetization_types=flatrate&vote_average.gte=${ratingAtLeast}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_API_KEY}&language=en-US&vote_count.gte=250&sort_by=${sortBy}&include_adult=false&include_video=false&${
        releasedAfter ? `first_air_date.gte=${releasedAfter}` : ""
      }&page=1&with_genres=${
        (genres.includes(28) || genres.includes(12) ? "10759|" : "") +
        genres.join("|")
      }&with_watch_providers=${avaliableOn.join(
        "|"
      )}&watch_region=US&with_watch_monetization_types=flatrate&vote_average.gte=${ratingAtLeast}`;
    }

    return url;
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
          <Header title="Discover" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 90,
              paddingTop: 10,
            }}
          >
            <View style={styles.wrapper}>
              <Text style={styles.subtitle}>Discover:</Text>
              <View style={styles.buttonWrapper}>
                <Text style={styles.label}>Sort by:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row" }}
                >
                  <DiscoverButton
                    onPress={() => handleSortByToggle("popularity.desc")}
                    title="Popularity"
                    selected={sortBy == "popularity.desc"}
                  />
                  <DiscoverButton
                    onPress={() => handleSortByToggle("release_date.desc")}
                    title="Release Date"
                    selected={sortBy == "release_date.desc"}
                  />
                  <DiscoverButton
                    onPress={() => handleSortByToggle("original_title.asc")}
                    title="Alphebetical"
                    selected={sortBy == "original_title.asc"}
                  />
                  <DiscoverButton
                    onPress={() => handleSortByToggle("vote_average.desc")}
                    title="Rating"
                    selected={sortBy == "vote_average.desc"}
                  />
                </ScrollView>
              </View>
              <View style={styles.buttonWrapper}>
                <Text style={styles.label}>Media Type:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row" }}
                >
                  <DiscoverButton
                    onPress={() => handleTypeToggle("movie")}
                    title="Movies"
                    selected={type == "movie"}
                  />
                  <DiscoverButton
                    onPress={() => handleTypeToggle("tv")}
                    title="TV Shows"
                    selected={type == "tv"}
                  />
                </ScrollView>
              </View>
              <View style={styles.buttonWrapper}>
                <Text style={styles.label}>Genres:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row" }}
                >
                  <DiscoverButton
                    onPress={() => handleGenreToggle(28)}
                    title="Action"
                    selected={genres.includes(28)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(12)}
                    title="Adventure"
                    selected={genres.includes(12)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(16)}
                    title="Animation"
                    selected={genres.includes(16)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(35)}
                    title="Comedy"
                    selected={genres.includes(35)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(80)}
                    title="Crime"
                    selected={genres.includes(80)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(99)}
                    title="Documentary"
                    selected={genres.includes(99)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(18)}
                    title="Drama"
                    selected={genres.includes(18)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(10751)}
                    title="Family"
                    selected={genres.includes(10751)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(14)}
                    title="Fantasy"
                    selected={genres.includes(14)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(27)}
                    title="Horror"
                    selected={genres.includes(27)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(9648)}
                    title="Mystery"
                    selected={genres.includes(9648)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(10749)}
                    title="Romance"
                    selected={genres.includes(10749)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(878)}
                    title="Science Fiction"
                    selected={genres.includes(878)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(53)}
                    title="Thriller"
                    selected={genres.includes(53)}
                  />
                  <DiscoverButton
                    onPress={() => handleGenreToggle(37)}
                    title="Western"
                    selected={genres.includes(37)}
                  />
                </ScrollView>
              </View>
              <View style={styles.buttonWrapper}>
                <Text style={styles.label}>Avaliable on:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row" }}
                >
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(8)}
                    title="Netflix"
                    selected={avaliableOn.includes(8)}
                    logo_path={"/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(119)}
                    title="Amazon Prime Video"
                    selected={avaliableOn.includes(119)}
                    logo_path={"/68MNrwlkpF7WnmNPXLah69CR5cb.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(337)}
                    title="Disney+"
                    selected={avaliableOn.includes(337)}
                    logo_path={"/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(15)}
                    title="Hulu"
                    selected={avaliableOn.includes(15)}
                    logo_path={"/giwM8XX4V2AQb9vsoN7yti82tKK.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(384)}
                    title="HBO Max"
                    selected={avaliableOn.includes(384)}
                    logo_path={"/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(350)}
                    title="Apple TV+"
                    selected={avaliableOn.includes(350)}
                    logo_path={"/A3WLxoSkmuxwaQkpfwL6H8WwWwM.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(386)}
                    title="Peacock"
                    selected={avaliableOn.includes(386)}
                    logo_path={"/d9cPwjnMYUEdjsfPuX96akc807z.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(387)}
                    title="Peacock Premium"
                    selected={avaliableOn.includes(387)}
                    logo_path={"/7cOEzL1ogV1hQV9a65qAeG7dK6c.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(531)}
                    title="Paramount+"
                    selected={avaliableOn.includes(531)}
                    logo_path={"/pkAHkRhIq3Iu0ZlEhDzbguSlyZF.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(43)}
                    title="STARZ"
                    selected={avaliableOn.includes(43)}
                    logo_path={"/pDcaPupcS7YxKce2sQePrq8k1gK.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(37)}
                    title="Showtime"
                    selected={avaliableOn.includes(37)}
                    logo_path={"/bo7FM7ha4iEnOEAvhhwg0RuVGid.jpg"}
                  />
                  <DiscoverButton
                    onPress={() => handleAvaliableOn(300)}
                    title="Pluto TV"
                    selected={avaliableOn.includes(300)}
                    logo_path={"/swzSWpmT1zA25vsIrf20d3CTjZD.jpg"}
                  />
                </ScrollView>
              </View>
              <View style={styles.buttonWrapper}>
                <Text style={styles.label}>Rating at least:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row" }}
                >
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(10)}
                    title="10"
                    selected={ratingAtLeast == 10}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(9)}
                    title="9"
                    selected={ratingAtLeast == 9}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(8)}
                    title="8"
                    selected={ratingAtLeast == 8}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(7)}
                    title="7"
                    selected={ratingAtLeast == 7}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(6)}
                    title="6"
                    selected={ratingAtLeast == 6}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(5)}
                    title="5"
                    selected={ratingAtLeast == 5}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(4)}
                    title="4"
                    selected={ratingAtLeast == 4}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(3)}
                    title="3"
                    selected={ratingAtLeast == 3}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(2)}
                    title="2"
                    selected={ratingAtLeast == 2}
                  />
                  <DiscoverButton
                    onPress={() => handleRatingAtLeast(1)}
                    title="1"
                    selected={ratingAtLeast == 1}
                  />
                </ScrollView>
              </View>
              <View style={styles.buttonWrapper}>
                <Text style={styles.label}>Released after:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row" }}
                >
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("2020-01-01")}
                    title="2020"
                    selected={releasedAfter == "2020-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("2015-01-01")}
                    title="2015"
                    selected={releasedAfter == "2015-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("2010-01-01")}
                    title="2010"
                    selected={releasedAfter == "2010-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("2005-01-01")}
                    title="2005"
                    selected={releasedAfter == "2005-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("2000-01-01")}
                    title="2000"
                    selected={releasedAfter == "2000-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1995-01-01")}
                    title="1995"
                    selected={releasedAfter == "1995-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1990-01-01")}
                    title="1990"
                    selected={releasedAfter == "1990-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1985-01-01")}
                    title="1985"
                    selected={releasedAfter == "1985-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1980-01-01")}
                    title="1980"
                    selected={releasedAfter == "1980-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1975-01-01")}
                    title="1975"
                    selected={releasedAfter == "1975-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1970-01-01")}
                    title="1970"
                    selected={releasedAfter == "1970-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1965-01-01")}
                    title="1965"
                    selected={releasedAfter == "1965-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1960-01-01")}
                    title="1960"
                    selected={releasedAfter == "1960-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1955-01-01")}
                    title="1955"
                    selected={releasedAfter == "1955-01-01"}
                  />
                  <DiscoverButton
                    onPress={() => handleReleasedAfter("1950-01-01")}
                    title="1950"
                    selected={releasedAfter == "1950-01-01"}
                  />
                </ScrollView>
              </View>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                  navigation.navigate("Discover", {
                    url: buildURL(),
                    type: type,
                  });
                }}
              >
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Discover;

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
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
    marginLeft: 15,
    marginTop: 15,
  },
  buttonWrapper: {
    width: "90%",
    marginTop: 10,
    backgroundColor: colors.light_transparent,
    borderRadius: 20,
  },
  searchButton: {
    width: "75%",
    marginTop: 10,
    backgroundColor: colors.dark,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
});
