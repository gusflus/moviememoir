import React from "react";
import { StyleSheet, View, Dimensions, ScaledSize } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "./Colors";

const Icon = ({ iconName, focused }) => {
  const { width } = Dimensions.get("window");

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.wrapper,
            focused ? styles.front : styles.back,
            { width: width * 0.2 },
          ]}
        >
          <MaterialCommunityIcons
            name={iconName}
            size={24}
            color={focused ? colors.primary : colors.dark}
            style={{ bottom: focused ? 7 : 0 }}
          />
        </View>
      </View>
      <View
        style={[
          styles.bottom,
          {
            width: width * 0.2,
            backgroundColor: focused ? colors.dark : colors.medium,
          },
        ]}
      />
    </>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "absolute",
    bottom: 0,
  },
  front: {
    backgroundColor: colors.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    backgroundColor: colors.medium,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    bottom: -30,
    height: 30,
  },
});
