import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase";

import { colors } from "../components/Colors";

const AccountWall = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You must be logged in to view this page.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          auth.signOut();
          navigation.replace("Login");
        }}
      >
        <Text style={styles.buttonText}>Login or Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountWall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    color: "$000",
  },
  button: {
    backgroundColor: colors.dark,
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
