import { Button, Image, Spinner, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { useUserProfile } from "../hooks/useUserProfile";
import { ScoreNavigation } from "../navigation/MainNavigation";
import { Routes } from "../navigation/routes";
import { setStatus } from "../redux/reducers/TimerReducer";
import { socket } from "../socket/socket";

export default function ScoreScreen({ navigation }: ScoreNavigation) {
  const dispatch = useDispatch();
  const [waitMatchOver, setWaitMatchOver] = useState<boolean>(true);
  const { userData } = useUserProfile();
  // const { status } = useSelector((time: RootState) => time.timer);
  useEffect(() => {
    setStatus("finished");
  }, []);

  useEffect(() => {
    if (waitMatchOver) {
      socket.on("roomSessionCountdown", ({ time }) => {
        console.log("log from score screen");
        console.log(time);
        if (time === 0) {
          console.log("over");
          setWaitMatchOver(false);
        }
      });
    }
  }, [socket, waitMatchOver]);

  useEffect(() => {
    socket.on("matchOver", ({ finalResult }) => {
      console.log("match over");
      console.log(finalResult);
    });
  }, [socket]);

  function handleReturnHome() {
    socket.disconnect();
    dispatch(setStatus("idle"));
    setWaitMatchOver(true);
    navigation.navigate(Routes.ChangeProfile);
  }

  function handlePlayAgain() {
    dispatch(setStatus("matchmaking"));
    setWaitMatchOver(true);
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
        <VStack mt={10} justifyContent="space-evenly" px={16} space={5}>
          {waitMatchOver ? (
            <>
              <View
                flexDirection={"row"}
                bg="#909090"
                opacity={0.5}
                rounded={"xl"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                padding={5}
              >
                <Spinner />
                <Text color={"white"}>Waiting for other to finish</Text>
                <Spinner />
              </View>
            </>
          ) : (
            <>
              <Button onPress={handleReturnHome} bg="#CF0A0A" rounded="xl">
                Return to Home
              </Button>
              <Button bg="#0176E8" rounded="xl" mx={10}>
                See Results
              </Button>
              <Button
                onPress={handlePlayAgain}
                bg="#0176E8"
                rounded="xl"
                mx={10}
              >
                Play Again
              </Button>
            </>
          )}
        </VStack>
      </View>
    </Layout>
  );
}
