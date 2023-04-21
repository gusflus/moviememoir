import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WatchHistory from "./WatchHistory";
import Media from "./Media";
import Person from "./Person";

const WatchHistoryStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="WatchHistory"
        component={WatchHistory}
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

export default WatchHistoryStack;
