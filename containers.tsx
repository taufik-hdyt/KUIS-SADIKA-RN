import { Image, Text, View } from "native-base";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import ChangeProfile from "./screens/ChangeProfile";
import StartGame from "./screens/StartGame";
import PlayGame from "./screens/PlayGame";
import FindOpponent from "./screens/FindOpponent";

export default function Containers() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Change Profile"
          component={ChangeProfile}
        />
        <Stack.Screen name="Start Game" component={StartGame} options={{
          headerShown: false,
        }} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Find Opponents"
          component={FindOpponent}
        />
        <Stack.Screen
          name="Play Game"
          component={PlayGame}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
