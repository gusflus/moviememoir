import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { auth } from "./Firebase";

import TabNavigation from "./pages/TabNavigation";
import Login from "./pages/Login";

const Stack = createNativeStackNavigator();

const App = () => {
  const [loginCheck, setLoginCheck] = useState(undefined);

  useEffect(() => {
    const unsubscrbe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("authStateChanged -> logged in from app: " + user.email);
        setLoginCheck(true);
      } else {
        console.log("authStateChanged -> not logged in to app");
        setLoginCheck(false);
      }
    });

    return unsubscrbe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loginCheck ? "TabNavigation" : "Login"}
      >
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
