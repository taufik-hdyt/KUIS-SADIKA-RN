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
import { AntDesign } from "@expo/vector-icons";

import { useAuth } from "@clerk/clerk-expo";
import ScoreScreen from "../screens/ScoreScreen";
import { Button, HStack, Text } from "native-base";

type MainStackParamList = {
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
  const { isLoaded, isSignedIn, signOut } = useAuth();
  return (
    <Stack.Navigator>
      {isLoaded && !isSignedIn ? (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={Routes.Login}
            component={Login}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name={Routes.ChangeProfile}
            component={ChangeProfile}
          />
          <Stack.Screen
            name={Routes.StartGame}
            component={StartGame}
            options={{
              headerRight: () => (
                <Button onPress={() => signOut()} variant="unstyled">
                  <HStack space={2} mr={3}>
                    <AntDesign name="logout" size={24} color="black" />
                    <Text fontWeight="semibold">Logout</Text>
                  </HStack>
                </Button>
              ),
              headerTitle:"",
              headerLeft: ()=> ("")
            }}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={Routes.FindOpponent}
            component={FindOpponent}
          />
          <Stack.Screen
            name={Routes.PlayGame}
            component={PlayGame}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.Score}
            component={ScoreScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
