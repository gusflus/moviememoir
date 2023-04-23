import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, firestore } from "../Firebase";
import { TMDB_API_KEY } from "@env";

import {
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

import Header from "../components/Header";
import RatingBar from "../components/RatingBar";
import TextBox from "../components/TextBox";
import PersonCard from "../components/PersonCard";
import MediaCard from "../components/MediaCard";
import BottomSheet from "../components/BottomSheet";
import Rater from "../components/Rater";

import { colors } from "../components/Colors";

const Media = ({ route }) => {
  const { width } = Dimensions.get("window");
  const [sheet, setSheet] = useState(false);
  const [json, setJson] = useState(null);
  const [images, setImages] = useState(null);
  const [service, setService] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [isInWatched, setIsInWatched] = useState(false);
  const [hasBeenRated, setHasBeenRated] = useState(false);
  const [rating, setRating] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const adUnitId = __DEV__
    ? TestIds.APP_OPEN
    : "ca-app-pub-5570163992222450~5142722214";

  useEffect(() => {
    handleFetch();
    handleFetchImages();
    handleFetchCredits();
    handleService();
    handleFetchSimilar();
  }, []);

  useEffect(() => {
    if (json) {
      handleIsInWatched();
      handleHasBeenRated();
      handleFetchUserRating();
    }
  }, [json, isInWatched, hasBeenRated]);

  const handleFetch = () => {
    let url;
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        break;
      default:
        console.log(
          "(Media.js - details) Invalid category: " + route.params.type
        );
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

  const handleFetchImages = () => {
    let url;
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}/images?api_key=${TMDB_API_KEY}`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}/images?api_key=${TMDB_API_KEY}`;
        break;
      default:
        console.log(
          "(Media.js - images) Invalid category: " + route.params.type
        );
        break;
    }

    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setImages(jsonData);
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

  const handleFetchSimilar = () => {
    let url;
    switch (route.params.type) {
      case "movie":
        url = `https://api.themoviedb.org/3/movie/${route.params.id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/tv/${route.params.id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
        break;
      default:
        console.log(
          "(Media.js - similar) Invalid category: " + route.params.type
        );
        break;
    }

    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        setSimilar(
          jsonData.results.sort((a, b) => b.popularity - a.popularity)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFetchUserRating = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .doc(String(json.id))
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRating(doc.data().rating);
        } else {
          setRating(null);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
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
        console.log(
          "(Media.js - service) Invalid category: " + route.params.type
        );
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

  const handleIsInWatched = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watchlisted")
      .doc(String(json.id))
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsInWatched(true);
        } else {
          setIsInWatched(false);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const handleHasBeenRated = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .doc(String(json.id))
      .get()
      .then((doc) => {
        if (doc.exists) {
          setHasBeenRated(true);
        } else {
          setHasBeenRated(false);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const handlePushToWatchlist = () => {
    console.log("pushing to watchlist " + json.id);
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watchlist")
      .doc(String(json.id))
      .set({
        rating: 0,
        type: route.params.type,
        id: String(json.id),
      })
      .then(() => {
        console.log("added to watchlist");
        setIsInWatched(true);
      })
      .catch((error) => {
        console.log("pushToWatchlist" + error);
      });
  };

  const handleRemoveFromWatchlist = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watchlist")
      .doc(String(json.id))
      .delete()
      .then(() => {
        console.log("removed from watchlist");
        setIsInWatched(false);
      })
      .catch((error) => {
        console.log("error removing from Watchlist" + error);
      });
  };

  const handleRemoveFromWatched = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("watched")
      .doc(String(json.id))
      .delete()
      .then(() => {
        console.log("removed from watched");
        setIsInWatched(false);
      })
      .catch((error) => {
        console.log("error removing from Watched" + error);
      });
  };

  const handleRating = (rating) => {
    console.log("rating: " + rating);
    handleRemoveFromWatchlist();
    setSheet(false);
    setRating(rating);

    if (rating != null) {
      setIsInWatched(true);
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("watched")
        .doc(String(json.id))
        .set({
          rating: rating,
          type: route.params.type,
          id: String(json.id),
        })
        .then(() => {
          console.log("added to watched");
          setIsInWatched(true);
        })
        .catch((error) => {
          console.log("handleRating" + error);
        });
    } else {
      handleRemoveFromWatched();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    handleFetch();
    handleFetchCredits();
    handleFetchSimilar();
    handleFetchUserRating();
    handleService();
    handleIsInWatched();
    setRefreshing(false);
  };

  const showStreaming = () => {
    let platform;
    try {
      platform = service.results.US.flatrate;
      platform.provider_name;
    } catch (error) {
      return <Text style={styles.info}>{"\n"}Not avaliable for streaming</Text>;
    }

    return (
      <>
        <Text style={styles.info}>
          {"\n"}Stream on: {platform.provider_name}
        </Text>
        <ScrollView
          horizontal={true}
          style={{ paddingHorizontal: 20, marginTop: 5 }}
          showsHorizontalScrollIndicator={false}
        >
          {platform.map((item) => {
            return (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.logo_path}`,
                }}
                style={styles.logo}
                key={item.provider_id}
              />
            );
          })}
        </ScrollView>
      </>
    );
  };

  const getRuntime = () => {
    if (route.params.type == "movie") {
      return (
        <Text style={styles.info}>
          {`Duration: ${Math.floor(json.runtime / 60)} hr ${
            json.runtime % 60
          } min`}
        </Text>
      );
    } else {
      return (
        <Text style={styles.info}>{`${json.number_of_seasons} Seasons and ${
          json.number_of_episodes
        } Episodes${
          json.episode_run_time.length > 0
            ? `\n${json.episode_run_time[0]} minutes per episode`
            : ""
        }`}</Text>
      );
    }
  };

  const getReleaseDate = () => {
    const intToMonth = (int) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[int - 1];
    };

    if (route.params.type == "movie") {
      const date = json.release_date;
      return (
        <Text style={styles.info}>
          {`Released: ${intToMonth(date.substring(5, 7))} ${date.substring(
            8
          )}, ${date.substring(0, 4)}`}
        </Text>
      );
    } else {
      const date = json.first_air_date;
      return (
        <Text style={styles.info}>
          {`First Aired: ${intToMonth(date.substring(5, 7))} ${date.substring(
            8
          )}, ${date.substring(0, 4)}`}
        </Text>
      );
    }
  };

  getDirector = () => {
    if (route.params.type == "movie") {
      const director = credits.crew.find((item) => item.job == "Director");
      if (director == undefined) {
        return;
      }
      return (
        <PersonCard
          id={director.id}
          image={director.profile_path}
          name={director.name}
          role={"Director"}
          key={json.id + director.id}
        />
      );
    }
    return;
  };

  if (
    json == null ||
    images == null ||
    credits == null ||
    service == null ||
    similar == null
  ) {
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.container}>
          <FlatList
            data={images.backdrops}
            horizontal
            keyExtractor={(item) => item.file_path}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.file_path}`,
                }}
                style={[
                  styles.image,
                  {
                    marginHorizontal: 20,
                    height: 200,
                    width: width * 0.9,
                    resizeMode: "cover",
                  },
                ]}
              />
            )}
          />
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
          <View style={styles.infoWrapper}>
            <Text style={styles.subtitle}>Info:</Text>
            <View>
              {getRuntime()}
              {getReleaseDate()}
            </View>
            {showStreaming()}
          </View>
          <View style={styles.ratingContainer}>
            {rating != null ? (
              <>
                <Text style={styles.subtitle}>Your Rating:</Text>
                <View style={styles.center}>
                  <RatingBar styles={styles.userRating} progress={rating} />
                </View>
              </>
            ) : null}
            <Text style={styles.subtitle}>Average Rating:</Text>
            <View style={styles.center}>
              <RatingBar
                styles={styles.userRating}
                progress={Math.floor(json.vote_average + 0.5)}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.horizontal,
                { justifyContent: "space-between", alignItems: "center" },
              ]}
            >
              <TouchableOpacity
                onPress={
                  isInWatched
                    ? handleRemoveFromWatchlist
                    : handlePushToWatchlist
                }
                style={styles.button}
              >
                <Text>
                  {isInWatched ? "Remove from Watchlist" : "Add to Watchlist"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSheet(true)}
                style={styles.button}
              >
                <Text>{hasBeenRated ? "Rate again" : "Rate"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextBox title="Overview:" text={json.overview} />
        </View>
        <View style={[styles.cardContainer, { marginBottom: 0 }]}>
          <Text style={styles.subtitle}>Cast:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View style={styles.horizontal}>
              {getDirector()}
              {credits.cast.map((person) => {
                return (
                  <PersonCard
                    id={person.id}
                    image={person.profile_path}
                    name={person.name}
                    role={person.character}
                    key={json.id + person.id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.subtitle}>More like this:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View style={styles.horizontal}>
              {similar.map((media) => {
                return (
                  <MediaCard
                    id={media.id}
                    image={media.poster_path}
                    type={route.params.type}
                    key={json.id + media.id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <BottomSheet
        isOpen={sheet}
        close={() => setSheet(false)}
        height={250}
        children={<Rater onRate={handleRating} />}
      />
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
    paddingTop: 5,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.light_transparent,
    justifyContent: "center",
    borderRadius: 20,
    paddingBottom: 20,
  },
  info: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.light,
    marginHorizontal: 20,
  },
  logo: {
    height: 65,
    width: 65,
    resizeMode: "cover",
    borderRadius: 0,
    overflow: "hidden",
    borderRadius: 12,
    margin: 5,
    marginBottom: 0,
  },
  horizontal: {
    justifyContent: "center",
    flexDirection: "row",
  },
  ratingContainer: {
    width: "90%",
    paddingTop: 5,
    paddingBottom: 10,
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
  buttonContainer: {
    width: "90%",
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: colors.light_transparent,
  },
  button: {
    width: "52%",
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 5,
    borderRadius: 25,
  },
  cardContainer: {
    width: "90%",
    paddingTop: 10,
    paddingBottom: 25,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 25,
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
});
