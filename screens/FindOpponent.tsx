import { Box, Button, HStack, Image, View, Stack, Text } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Routes } from "../navigation/routes";
import { FindOpponentNavigation } from "../navigation/MainNavigation";
import { Timer } from "../components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setGoNext, setStatus } from "../redux/reducers/TimerReducer";
import { useFocusEffect } from "@react-navigation/native";

export default function FindOpponent({ navigation }: FindOpponentNavigation) {
  const { timer, goNext } = useSelector((time: RootState) => time.timer);

  const dispatch = useDispatch();

  // console.log("from findOpponent", timer);

  const [find, setFind] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      console.log(
        "in findOpponent => ",
        "mm timer: " + timer,
        "gonext: " + goNext
      );
      setFind(true);
      if (goNext) {
        navigation.replace(Routes.PlayGame);
      }
      return () => {
        dispatch(setStatus("playing"));
        setFind(false);
        console.log(
          "leaving findOpponent => ",
          "mm timer: " + timer,
          "gonext: " + goNext
        );
      };
    }, [goNext])
  );

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
            Finding Opponent
          </Text>
          <Text fontSize="xl" fontWeight="semibold" textAlign="center">
            <Text color="#0176E8">4</Text>/5
          </Text>
        </Box>

        <Stack space={2} alignItems="center" mt={8}>
          {Array.from({ length: 5 }, (_, index) => (
            <HStack
              key={index}
              borderColor="white"
              borderStyle="solid"
              borderWidth="2px"
              p={1.5}
              w="280px"
              rounded="lg"
              bg="gray.600"
              alignItems="center"
            >
              <Image
                style={{ width: 50, height: 50 }}
                alt="profile"
                source={require("../assets/avatar.png")}
              />
              <Text fontSize="lg" color="white" fontWeight="semibold">
                Molusca_Bertulang
              </Text>
            </HStack>
          ))}
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
