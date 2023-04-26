import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, firestore } from "../Firebase";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import React from "react";

import { colors } from "../components/Colors";
import Header from "../components/Header";
import BottomSheet from "../components/BottomSheet";

const Account = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const [sheet, setSheet] = useState(false);

  const handleSignOut = () => {
    auth.signOut();
    navigation.replace("Login");
  };

  const handleDeleteUser = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .delete()
      .then(() => {
        console.log("User data deleted");
        auth.currentUser.delete(auth.currentUser.uid).then(() => {
          console.log("User deleted");
          navigation.replace("Login");
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
      <Text style={styles.title}>Information:</Text>
      <View style={[styles.container, { height: height - 130 }]}>
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>User: {auth.currentUser.email}</Text>
          <TouchableOpacity
            onPress={handleSignOut}
            style={[styles.button, { marginBottom: 15 }]}
          >
            <Text>sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSheet(true)}
            style={[
              styles.button,
              { marginBottom: 15, marginTop: 0, backgroundColor: "#8a0000" },
            ]}
          >
            <Text>delete account</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.subtitle, { marginTop: 50, marginBottom: 10 }]}>
          Data Credits:
        </Text>
        <Image
          source={require("../assets/TMDB_att.png")}
          style={styles.image}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: 25,
            color: "#90cea1",
          }}
        >
          {"Movie, TV, and people data courtesy of\nThe Movie Database"}
        </Text>
        <Image source={require("../assets/JW_att.png")} style={styles.image} />
        <Text style={{ color: "#FFCE2E" }}>
          {"Streaming data courtesy of JustWatch"}
        </Text>
      </View>
      <BottomSheet
        isOpen={sheet}
        close={() => setSheet(false)}
        height={200}
        children={
          <View>
            <Text style={{ textAlign: "center" }}>
              Are you sure you want to delete your account? This action is
              irreversible.
            </Text>
            <TouchableOpacity
              onPress={handleDeleteUser}
              style={[
                styles.button,
                {
                  marginBottom: 15,
                  alignSelf: "center",
                  backgroundColor: "#ad0202",
                },
              ]}
            >
              <Text>delete account</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    width: "90%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_transparent,
    borderRadius: 25,
  },
  subtitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: colors.light,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  title: {
    width: "100%",
    fontSize: 35,
    fontWeight: "bold",
    color: colors.dark,
    marginLeft: 20,
    marginTop: 20,
  },
  button: {
    width: "60%",
    backgroundColor: colors.primary,
    padding: 20,
    marginTop: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
    alignItems: "center",
  },
  image: {
    alignItems: "center",
    width: "75%",
    resizeMode: "contain",
    marginTop: 25,
  },
});
