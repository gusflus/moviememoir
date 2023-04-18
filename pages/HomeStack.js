import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import Media from "./Media";
import Person from "./Person";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="Home"
        component={Home}
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

export default HomeStack;
