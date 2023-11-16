import {
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React from "react";
import Layout from "../components/Layout";
import CountdownTimer from "../components/CountDownTimer";
import { Routes } from "../navigation/routes";
import { FindOpponentNavigation } from "../navigation/MainNavigation";

export default function FindOpponent({ navigation }: FindOpponentNavigation) {
  const handleCountdownFinish = () => {
    console.log("Countdown finished");
    navigation.navigate(Routes.PlayGame);
  };

  return (
    <Layout>
      <ScrollView>
        <Box mt={16}>
          <CountdownTimer onFinish={handleCountdownFinish} />
          {/* <Text
            fontWeight="bold"
            textAlign="center"
            fontSize="7xl"
            color="#FFC700"
          >
            00:18
          </Text> */}
          <Text mt={-3} fontSize="xl" fontWeight="semibold" textAlign="center">
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
      </ScrollView>
    </Layout>
  );
}
