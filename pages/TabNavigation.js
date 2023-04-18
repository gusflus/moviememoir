import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Icon from "../components/Icon";
import MovieMemoir from "./MovieMemoir";
import Search from "./Search";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "MovieMemoir":
              iconName = focused ? "film" : "film";
              break;
            case "Search":
              iconName = focused ? "magnify" : "magnify";
              break;
          }

          return <Icon iconName={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen
        name="MovieMemoir"
        options={styles.tab}
        component={MovieMemoir}
      />
      <Tab.Screen name="Search" options={styles.tab} component={Search} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tab: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: "absolute",
      height: 60,
    },
  },
});
