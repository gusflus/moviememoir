import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../components/Icon";
import WatchlistStack from "./WatchlistStack";
import SearchStack from "./SearchStack";
import Account from "./Account";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "WatchlistStack":
              iconName = focused ? "film" : "film";
              break;
            case "SearchStack":
              iconName = focused ? "magnify" : "magnify";
              break;
            case "Account":
              iconName = focused ? "account" : "account";
              break;
          }

          return <Icon iconName={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen
        name="WatchlistStack"
        options={styles.tab}
        component={WatchlistStack}
      />
      <Tab.Screen
        name="SearchStack"
        options={styles.tab}
        component={SearchStack}
      />
      <Tab.Screen name="Account" options={styles.tab} component={Account} />
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
