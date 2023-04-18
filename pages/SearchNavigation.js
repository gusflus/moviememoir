import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "./Search";
import Media from "./Media";

const SearchNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="Search"
        component={Search}
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

export default SearchNavigation;
