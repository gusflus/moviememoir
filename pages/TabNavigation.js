import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../components/Icon";
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "HomeStack":
              iconName = focused ? "film" : "film";
              break;
            case "SearchStack":
              iconName = focused ? "magnify" : "magnify";
              break;
          }

          return <Icon iconName={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="HomeStack" options={styles.tab} component={HomeStack} />
      <Tab.Screen
        name="SearchStack"
        options={styles.tab}
        component={SearchStack}
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
