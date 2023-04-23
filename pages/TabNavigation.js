import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../components/Icon";
import WatchlistStack from "./WatchlistStack";
import SearchStack from "./SearchStack";
import Account from "./Account";
import WatchHistoryStack from "./WatchHistoryStack";
import DiscoverStack from "./DiscoverStack";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="SearchStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "WatchlistStack":
              iconName = focused ? "film" : "film";
              break;
            case "WatchHistoryStack":
              iconName = focused ? "history" : "history";
              break;
            case "SearchStack":
              iconName = focused ? "magnify" : "magnify";
              break;
            case "DiscoverStack":
              iconName = focused ? "movie-open" : "movie-open";
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
        name="WatchHistoryStack"
        options={styles.tab}
        component={WatchHistoryStack}
      />
      <Tab.Screen
        name="SearchStack"
        options={styles.tab}
        component={SearchStack}
      />
      <Tab.Screen
        name="DiscoverStack"
        options={styles.tab}
        component={DiscoverStack}
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
