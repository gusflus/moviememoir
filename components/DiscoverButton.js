import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

import { colors } from "../components/Colors";

const DiscoverButton = ({ title, onPress, selected, logo_path }) => {
  if (logo_path) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.discoverButtonLogo,
          { borderColor: selected ? colors.primary : "transparent" },
        ]}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w200${logo_path}`,
          }}
          style={[
            styles.logo,
            { borderColor: selected ? colors.primary : "transparent" },
          ]}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.discoverButton,
          {
            backgroundColor: selected ? colors.dark : colors.secondary,
          },
        ]}
      >
        <Text
          style={[
            styles.discoverButtonText,
            {
              color: selected ? colors.primary : colors.dark,
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default DiscoverButton;

const styles = StyleSheet.create({
  discoverButton: {
    borderRadius: 18,
    margin: 10,
    marginVertical: 18,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  discoverButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  discoverButtonLogo: {
    borderRadius: 18,
    margin: 10,
    marginVertical: 18,
    borderWidth: 5,
  },
  logo: {
    height: 65,
    width: 65,
    resizeMode: "cover",
    borderRadius: 0,
    overflow: "hidden",
    borderRadius: 12,
    marginBottom: 0,
  },
});
