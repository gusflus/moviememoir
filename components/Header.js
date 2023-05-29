import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as Device from "expo-device";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

import { colors } from "./Colors";

const Header = ({ title, back = false }) => {
  const navigation = useNavigation();
  if (Device.osName === "iOS") {
    if (back) {
      return (
        <>
          <View style={styles.extension} />
          <SafeAreaView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <AntDesign name="caretleft" size={18} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.title}>{title}</Text>
            </View>
          </SafeAreaView>
        </>
      );
    }
    return (
      <>
        <View style={styles.extension} />
        <SafeAreaView>
          <View style={styles.headerNoButton}>
            <Text style={styles.titleNoButton}>{title}</Text>
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    if (back) {
      return (
        <View style={styles.headerAndroid}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonAndroid}
          >
            <AntDesign name="caretleft" size={18} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.titleAndroid}>{title}</Text>
        </View>
      );
    }
    return (
      <View style={styles.headerAndroidNoButton}>
        <Text style={styles.titleAndroidNoButton}>{title}</Text>
      </View>
    );
  }
};

export default Header;

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 20,
    marginTop: 20,
    width: 40,
    height: 40,
  },
  titleNoButton: {
    marginTop: 15,
    fontSize: 27,
    marginLeft: 30,
    fontWeight: "bold",
    color: colors.primary,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    marginTop: 15,
    fontSize: 27,
    fontWeight: "bold",
    color: colors.primary,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: colors.dark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    paddingBottom: 20,
  },
  headerNoButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.dark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    paddingBottom: 20,
  },
  extension: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: colors.dark,
  },
  backButtonAndroid: {
    marginLeft: 20,
    marginTop: "17%",
    width: 40,
    height: 40,
  },
  titleAndroidNoButton: {
    marginTop: "15%",
    fontSize: 27,
    marginLeft: 30,
    fontWeight: "bold",
    color: colors.primary,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  titleAndroid: {
    marginTop: "15%",
    fontSize: 27,
    fontWeight: "bold",
    color: colors.primary,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  headerAndroid: {
    flexDirection: "row",
    width: "100%",
    height: 130,
    backgroundColor: colors.dark,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 7,
    paddingBottom: 20,
  },
  headerAndroidNoButton: {
    width: "100%",
    height: 130,
    backgroundColor: colors.dark,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 7,
    paddingBottom: 20,
  },
});
