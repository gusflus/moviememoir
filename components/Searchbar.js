import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../components/Colors";

const SearchBar = ({ onChangeText, filterButton, filterFunc }) => {
  const [filter, setFilter] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text) => {
    setSearchTerm(text);
    onChangeText(text, filter);
  };

  const handleClear = () => {
    setSearchTerm("");
    handleSearch("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <TouchableOpacity onPress={handleClear} style={styles.xStyle}>
        <MaterialCommunityIcons
          name="close-circle-outline"
          style={styles.xStyle}
        />
      </TouchableOpacity>
      {filterButton ? (
        <TouchableOpacity onPress={filterFunc} style={styles.iconStyle}>
          <MaterialCommunityIcons
            name="filter-variant"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ marginRight: 10 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0EEEE",
    height: 50,
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: "row",
    borderRadius: 20,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 15,
  },
  xStyle: {
    fontSize: 25,
    alignSelf: "center",
    color: colors.dark_transparent,
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 8,
    color: colors.dark_transparent,
  },
});

export default SearchBar;
