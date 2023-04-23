import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";

import MediaCard from "../components/MediaCard";
import Searchbar from "../components/Searchbar";
import Header from "../components/Header";

import { colors } from "../components/Colors";

const Discover = ({ route }) => {
  const [json, setJson] = useState([]);
  const [filteredJson, setFilteredJson] = useState([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = (event) => {
    fetch(route.params.url)
      .then((response) => response.json())
      .then((jsonData) => {
        setJson(jsonData.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (text) => {
    const filtered = json.filter((media) => {
      if (text.length === 0) {
        return true;
      } else {
        return media.title.toLowerCase().includes(text.toLowerCase());
      }
    });

    setFilteredJson(filtered);
  };

  const getResults = () => {
    if (filteredJson.length === 0) {
      return json.map((media) => (
        <MediaCard
          id={media.id}
          rating={media.rating}
          image={media.poster_path}
          type={route.params.type}
          key={media.id}
        />
      ));
    } else {
      return filteredJson.map((media) => (
        <MediaCard
          id={media.id}
          rating={media.rating}
          image={media.poster_path}
          type={route.params.type}
          key={media.id}
        />
      ));
    }
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
          <Header title="Results" back />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 90,
              paddingTop: 10,
            }}
          >
            <Searchbar
              onChangeText={handleSearch}
              filterFunc={() => setSheet(true)}
            />
            <View style={styles.container}>{getResults()}</View>
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
});
