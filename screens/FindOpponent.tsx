import { useFocusEffect } from "@react-navigation/native";
import { Box, Button, HStack, Image, Stack, Text, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Timer } from "../components/Timer";
import { useUserProfile } from "../hooks/useUserProfile";
import { FindOpponentNavigation } from "../navigation/MainNavigation";
import { Routes } from "../navigation/routes";
import { setStatus } from "../redux/reducers/TimerReducer";
import { RootState } from "../redux/store";
import { socket } from "../socket/socket";
import { setPlayer } from "../redux/reducers/PlayersReducer";

export default function FindOpponent({ navigation }: FindOpponentNavigation) {
  const { timer, goNext } = useSelector((time: RootState) => time.timer);
  const { userData } = useUserProfile();

  const dispatch = useDispatch();

  // console.log("from findOpponent", timer);

  const [find, setFind] = useState<boolean>(false);

  useEffect(() => {
    socket.on("findingMatch", ({ opponentsInMatchmaking }) => {
      console.log("data: ", opponentsInMatchmaking);
      dispatch(setPlayer(opponentsInMatchmaking));
    });
  }, [socket, dispatch]);

  const playerList = useSelector((state: RootState) => state.player);
  console.log("playerList: ", playerList);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log(
  //       "in findOpponent => ",
  //       "mm timer: " + timer,
  //       "gonext: " + goNext
  //     );
  //     setFind(true);
  //     // if (goNext) {
  //     //   navigation.replace(Routes.PlayGame);
  //     // }
  //     return () => {
  //       dispatch(setStatus("playing"));
  //       setFind(false);
  //       console.log(
  //         "leaving findOpponent => ",
  //         "mm timer: " + timer,
  //         "gonext: " + goNext
  //       );
  //     };
  //   }, [goNext])
  // );

  return (
    <Layout>
      <View flex={1}>
        <Box mt={16}>
          <Box mx="auto">
            <Timer
              strokeWidth={10}
              textSize="3xl"
              size={100}
              durasi={timer}
              isPlaying={find}
            />
          </Box>
          <Text mt={10} fontSize="xl" fontWeight="semibold" textAlign="center">
            Match Found
          </Text>
          <Text fontSize="xl" fontWeight="semibold" textAlign="center">
            <Text color="#0176E8">5</Text>/5
          </Text>
        </Box>

        <Stack space={2} alignItems="center" mt={8}>
          <View>
            {playerList.player.map((player, i) => (
              <HStack
                key={player.userId}
                borderColor="white"
                borderStyle="solid"
                borderWidth="2px"
                p={1.5}
                space={3}
                w="280px"
                rounded="lg"
                bg="gray.600"
                alignItems="center"
              >
                <Text color="white">{i + 1}</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  alt="profile"
                  source={{ uri: player.userAvatar }}
                />
                <Text fontSize="lg" color="white" fontWeight="semibold">
                  {player.userName}
                </Text>
              </HStack>
            ))}
          </View>
        </Stack>
        <Button
          w="100px"
          mx="auto"
          mt={2}
          onPress={() => {
            dispatch(setStatus("playing"));
            navigation.navigate(Routes.PlayGame);
          }}
        >
          Next
        </Button>
      </View>
      <View>
        <Button w="100px" mx="auto" mt={2} onPress={() => {}}>
          add player
        </Button>
      </View>
    </Layout>
  );
}
