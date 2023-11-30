import { Box, Button, HStack, Image, Stack, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Timer } from "../components/Timer";
import { useUserProfile } from "../hooks/useUserProfile";
import { FindOpponentNavigation } from "../navigation/MainNavigation";
import { Routes } from "../navigation/routes";
import { setPlayer } from "../redux/reducers/PlayersReducer";
import { setTimer } from "../redux/reducers/TimerReducer";
import { RootState } from "../redux/store";
import { socket } from "../socket/socket";
import { setQuestion, setRoomId } from "../redux/reducers/ScoreReducer";

export default function FindOpponent({ navigation }: FindOpponentNavigation) {
  const { timer } = useSelector((time: RootState) => time.timer);

  const { userData } = useUserProfile();

  const dispatch = useDispatch();
  const [goBack, setGoBack] = useState<boolean>(false);

  useEffect(() => {
    socket.on("findingMatchCountdown", ({ time }) => {
      dispatch(setTimer(time));
      if (time === 0) {
        navigation.navigate(Routes.PlayGame);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("matchFound", (data) => {
      if (data) {
        // console.log(data.questions);
        dispatch(setQuestion(data.questions));
        dispatch(setRoomId(data.roomID));
        navigation.navigate(Routes.PlayGame);
      }
    });
  }, [socket]);


  useEffect(() => {
    socket.on("findingMatch", ({ opponentsInMatchmaking }) => {
      console.log("data: ", opponentsInMatchmaking);
      dispatch(setPlayer(opponentsInMatchmaking));
    });
  }, [socket, dispatch]);

  const playerList = useSelector((state: RootState) => state.player);

  function handleCancel() {
    if (!goBack) {
      setGoBack(true);
      socket.emit("cancelMatchmaking", {
        userName: userData?.username,
        userAvatar: userData?.avatar,
      });
    } else {
      navigation.navigate(Routes.StartGame);
    }
  }

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
              isPlaying={false}
            />
          </Box>
          <Text mt={10} fontSize="xl" fontWeight="semibold" textAlign="center">
            Match Found
          </Text>
          <Text fontSize="xl" fontWeight="semibold" textAlign="center">
            <Text color="#0176E8">{playerList?.player?.length}</Text>/3
          </Text>
        </Box>

        <Stack space={2} alignItems="center" mt={8}>
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
                style={{ width: 50, height: 50, borderRadius: 50 }}
                alt="profile"
                source={{ uri: player.userAvatar }}
              />
              <Text fontSize="lg" color="white" fontWeight="semibold">
                {player.userName}
              </Text>
            </HStack>
          ))}
        </Stack>
        {/* <Button
          w="100px"
          mx="auto"
          mt={2}
          onPress={() => {
            dispatch(setStatus("playing"));
            navigation.navigate(Routes.PlayGame);
          }}
        >
          Next
        </Button> */}
        <View>
          <Button
            w="100px"
            mx="auto"
            variant="unstyled"
            bgColor={"red.600"}
            width={"160px"}
            mt={2}
            onPress={handleCancel}
          >
            {!goBack ? (
              <Text color={"white"}>Cancel Match</Text>
            ) : (
              <Text color={"white"}>Go Back</Text>
            )}
          </Button>
        </View>
      </View>
    </Layout>
  );
}
