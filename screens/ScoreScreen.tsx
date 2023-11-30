import { Button, HStack, Image, Text, View } from "native-base";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { Routes } from "../navigation/routes";
import { setStatus } from "../redux/reducers/TimerReducer";
import { useUserProfile } from "../hooks/useUserProfile";
import { socket } from "../socket/socket";
import { ScoreNavigation } from "../navigation/MainNavigation";

export default function ScoreScreen({ navigation }:ScoreNavigation) {
  const dispatch = useDispatch();
  const { userData } = useUserProfile();
  // const { status } = useSelector((time: RootState) => time.timer);
  useEffect(() => {
    setStatus("finished");
  }, []);

  function handleReturnHome() {
    socket.disconnect();
    dispatch(setStatus("idle"));
    navigation.navigate(Routes.ChangeProfile);
  }

  function handlePlayAgain() {
    dispatch(setStatus("matchmaking"));
    socket.emit("matchmaking", {
      userName: userData?.username,
      userAvatar: userData?.avatar,
    });
    navigation.navigate(Routes.FindOpponent);
  }
  return (
    <Layout isCenter>
      <View>
        <Image
          mx="auto"
          bgColor={"#00EEFA"}
          borderRadius={100}
          resizeMode="cover"
          alt="profile"
          source={{ uri: userData?.avatar }}
          size={"md"}
        />
        <Text fontWeight="semibold" fontSize="lg" textAlign="center">
          {userData.username}
        </Text>
        <HStack mt={10} justifyContent="space-evenly" px={10}>
          <Button
            onPress={handleReturnHome}
            bg="#CF0A0A"
            rounded="xl"
          >
            Return to Home
          </Button>
          <Button
            onPress={handlePlayAgain}
            bg="#0176E8"
            rounded="xl"
          >
            Play Again
          </Button>
        </HStack>
      </View>
    </Layout>
  );
}
