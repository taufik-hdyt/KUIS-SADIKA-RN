import { Box, Button, HStack, Image, ScrollView, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Routes } from "../navigation/routes";
import { FindOpponentNavigation } from "../navigation/MainNavigation";
import { Timer } from "../components/Timer";

export default function FindOpponent({ navigation }: FindOpponentNavigation) {
  const [find, setFind] = useState<boolean>(false);

  useEffect(() => {
    setFind(true);
  }, []);
  console.log(find);

  return (
    <Layout>
      <ScrollView>
        <Box mt={16}>
          <Box mx="auto">
            <Timer
              strokeWidth={10}
              textSize="3xl"
              size={100}
              durasi={30}
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
        <Button w='100px' mx='auto' mt={2} onPress={()=>navigation.navigate(Routes.PlayGame)}>Next</Button>
      </ScrollView>
    </Layout>
  );
}
