import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MovieMemoir from "./MovieMemoir";
import Movie from "./Movie";

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="MovieMemoir">
      <Stack.Screen
        name="MovieMemoir"
        component={MovieMemoir}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
