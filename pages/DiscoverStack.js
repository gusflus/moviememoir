import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DiscoverConfig from "./DiscoverConfig";
import Discover from "./Discover";
import Media from "./Media";
import Person from "./Person";

const SearchStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="DiscoverConfig"
        component={DiscoverConfig}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Media"
        component={Media}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Person"
        component={Person}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
