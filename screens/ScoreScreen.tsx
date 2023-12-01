/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { useUserProfile } from "../hooks/useUserProfile";
import { ScoreNavigation } from "../navigation/MainNavigation";
import { Routes } from "../navigation/routes";
import { setStatus } from "../redux/reducers/TimerReducer";
import { socket } from "../socket/socket";
import { LoadingAnimation, WinnerAnimation } from "../components/Animation";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ScoreScreen({ navigation }: ScoreNavigation) {
  const dispatch = useDispatch();
  const [waitMatchOver, setWaitMatchOver] = useState<boolean>(true);
  const { userData } = useUserProfile();
  const [scoreFinal, setScoreFinal] = useState([]);
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

      setScoreFinal(finalResult);
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

  console.log(scoreFinal);

  return (
    <Layout>
      <View>
        <Box px={4} h="full" justifyContent="center">
          {waitMatchOver ? (
            <Box rounded={"xl"} alignItems={"center"}>
              <LoadingAnimation />
              <Text fontWeight="semibold" fontSize="lg">
                Please wait for the score results ...
              </Text>
            </Box>
          ) : (
            <>
              <Box alignItems="center">
                <WinnerAnimation />
              </Box>
              <Box
                mt={-2}
                bg="rgba(0,0,0,0.6)"
                h="400px"
                rounded="lg"
                p={4}
                justifyContent={"space-between"}
              >
                <Stack space={2}>
                  <Text
                    mb={2}
                    bg="#0176E8"
                    rounded="lg"
                    textAlign="center"
                    fontWeight="semibold"
                    fontSize="2xl"
                    color="white"
                    py={1}
                  >
                    Top Score ⭐⭐⭐
                  </Text>
                  {scoreFinal
                    ?.sort((a, b) => b.score - a.score)
                    .map((item, idx) => (
                      <HStack
                        key={idx}
                        borderColor="white"
                        borderWidth="1px"
                        borderStyle="solid"
                        py={2}
                        px={4}
                        rounded="lg"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <HStack alignItems="center" space={3}>
                          <Text fontSize="md" color="white">{`${
                            idx + 1
                          }.`}</Text>
                          <Avatar source={{ uri: item.userAvatar }} />
                          <Text fontSize="md" color="white">
                            {item.userName}
                          </Text>
                        </HStack>
                        <HStack alignItems="center" space={3}>
                          <FontAwesome5
                            name="trophy"
                            size={24}
                            color="orange"
                          />
                          <Text fontWeight="bold" fontSize="lg" color="white">
                            {item.score}
                          </Text>
                        </HStack>
                      </HStack>
                    ))}
                </Stack>
                <HStack justifyContent={"space-around"} space={2}>
                  <Button
                    rounded="xl"
                    px={3}
                    justifyContent={"center"}
                    bg="#0176E8"
                    onPress={handleReturnHome}
                  >
                    <View
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <AntDesign name="arrowleft" size={24} color="white" />
                      <Text color="white" ml={3}>
                        Return Home
                      </Text>
                    </View>
                  </Button>

                  <Button
                    rounded="xl"
                    px={10}
                    justifyContent={"center"}
                    bg="#0176E8"
                    onPress={handlePlayAgain}
                  >
                    <View
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text color="white">Play again</Text>
                    </View>
                  </Button>
                </HStack>
              </Box>
            </>
          )}
        </Box>
      </View>
    </Layout>
  );
}
