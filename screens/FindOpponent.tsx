import { Box, Button, HStack, Image, View, Stack, Text } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Routes } from "../navigation/routes";
import { FindOpponentNavigation } from "../navigation/MainNavigation";
import { Timer } from "../components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setStatus, tick } from "../redux/reducers/TimerReducer";
import { useFocusEffect } from "@react-navigation/native";

export default function FindOpponent({ navigation }: FindOpponentNavigation) {
  const { timer } = useSelector((time: RootState) => time.user);
  const dispatch = useDispatch();

  // console.log("from findOpponent", timer);

  const [find, setFind] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      // console.log(" on screen findOpponent");
      setFind(true);
      const timerInterval = setInterval(() => {
        dispatch(tick());
      }, 1000);
      if (timer === 0) {
        navigation.navigate(Routes.PlayGame);
        setFind(false);
      }
      return () => {
        // console.log("from findOpponent: Navigate to PlayGame");
        clearInterval(timerInterval);
      };
    }, [timer, dispatch, navigation])
  );

  return (
    <Layout>
      <View>
        <Box mt={16}>
          <Box mx="auto">
            <Timer
              strokeWidth={10}
              textSize="3xl"
              size={100}
              durasi={6}
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
          {Array.from({ length: 4 }, (_, index) => (
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
    </Layout>
  );
}
