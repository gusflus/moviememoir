import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../components/Icon";
import HomeNavigation from "./HomeNavigation";
import SearchNavigation from "./SearchNavigation";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "HomeNavigation":
              iconName = focused ? "film" : "film";
              break;
            case "SearchNavigation":
              iconName = focused ? "magnify" : "magnify";
              break;
          }

          return <Icon iconName={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeNavigation"
        options={styles.tab}
        component={HomeNavigation}
      />
      <Tab.Screen
        name="SearchNavigation"
        options={styles.tab}
        component={SearchNavigation}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tab: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarVisible: false,
    tabBarStyle: {
      position: "absolute",
      backgroundColor: "transparent",
      height: 2,
    },
  },
});
