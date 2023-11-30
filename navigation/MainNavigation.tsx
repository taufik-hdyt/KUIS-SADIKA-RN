/* eslint-disable react/react-in-jsx-scope */
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import Login from "../screens/Login";
import ChangeProfile from "../screens/ChangeProfile";
import StartGame from "../screens/StartGame";
import PlayGame from "../screens/PlayGame";
import FindOpponent from "../screens/FindOpponent";
import { Routes } from "../navigation/routes";

import { useAuth } from "@clerk/clerk-expo";
import ScoreScreen from "../screens/ScoreScreen";


export type MainStackParamList = {
  Login: undefined;
  ChangeProfile: undefined;
  StartGame: undefined;
  FindOpponent: undefined;
  PlayGame: undefined;
  Score: undefined;
};

export type LoginNavigation = StackScreenProps<MainStackParamList, "Login">;
export type ProfileNavigation = StackScreenProps<
  MainStackParamList,
  "ChangeProfile"
>;
export type StartGameNavigation = StackScreenProps<
  MainStackParamList,
  "StartGame"
>;
export type FindOpponentNavigation = StackScreenProps<
  MainStackParamList,
  "FindOpponent"
>;
export type PlayGameNavigation = StackScreenProps<
  MainStackParamList,
  "PlayGame"
>;

export type ScoreNavigation = StackScreenProps<MainStackParamList, "Score">;

const Stack = createStackNavigator<MainStackParamList>();

export default function MainNavigation() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.Login}
    >
      {isLoaded && !isSignedIn ? (
        <Stack.Group>
          <Stack.Screen name={Routes.Login} component={Login} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={Routes.ChangeProfile} component={ChangeProfile} />
          <Stack.Screen name={Routes.StartGame} component={StartGame} />
          <Stack.Screen name={Routes.FindOpponent} component={FindOpponent} />
          <Stack.Screen name={Routes.PlayGame} component={PlayGame} />
          <Stack.Screen name={Routes.Score} component={ScoreScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
