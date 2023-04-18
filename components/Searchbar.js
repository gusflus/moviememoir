import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchBar = ({ placeholder, onChangeText }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text) => {
    setSearchTerm(text);
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <MaterialCommunityIcons name="magnify" style={styles.iconStyle} />
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
    borderRadius: 25,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 15,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default SearchBar;
