import { Image, Text, View } from "native-base";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import ChangeProfile from "./screens/ChangeProfile";
import StartGame from "./screens/StartGame";
import ModalFindOpponent from "./modals/ModalFindOpponent";
import PlayGame from "./screens/PlayGame";
import ModalChangeAvatar from "./modals/ModalChangeAvatar";

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
          component={ModalFindOpponent}
        />
        <Stack.Screen
          name="Play Game"
          component={PlayGame}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="Change Avatar"
          component={ModalChangeAvatar}
          options={{
            presentation: "modal"
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
