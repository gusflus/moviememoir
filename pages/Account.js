import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../Firebase";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import { colors } from "../components/Colors";
import Header from "../components/Header";

const Account = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");

  const handleSignOut = () => {
    auth.signOut();
    navigation.replace("Login");
  };

  return (
    <>
      <LinearGradient
        colors={[colors.secondary, colors.dark]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Header title="Account" />
      <View style={[styles.container, { height: height - 130 }]}>
        <Text style={styles.subtitle}>User: {auth.currentUser.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, { marginBottom: 15 }]}
        >
          <Text>sign out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
  subtitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.dark,
    marginTop: 10,
    marginLeft: 20,
  },
  button: {
    width: "80%",
    backgroundColor: colors.primary,
    padding: 20,
    marginTop: 25,
    borderRadius: 25,
  },
});
