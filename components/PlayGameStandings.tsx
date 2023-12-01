import { Alert, Avatar, Box, HStack, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { socket } from "../socket/socket";

type ToastStandingProps = {
  id: string;
  title: string;
  variant?: string;
  status?: string;
  correctAnswer?: string;
};

type PlayGameStandingsProps = {
  answers: string;
  score: number;
  userAvatar: string;
  userId: string;
};

export const ToastStanding = ({
  id,
  title,
  variant,
  status,
  correctAnswer,
}: ToastStandingProps) => {
  const [curStandings, setCurStandings] = useState<PlayGameStandingsProps[]>(
    []
  );
  // console.log(id,title);

  useEffect(() => {
    socket.on("playGameStandings", ({ playGameStanding }) => {
      setCurStandings(playGameStanding);
      // console.log(data);
    });
  }, [socket]);

  console.log(curStandings);

  return (
    <Alert
      minW="300px"
      alignSelf="center"
      flexDirection="row"
      status={status ? status : "info"}
      variant={variant}
    >
      <Box w="full">
        <Box p={2}>
          <Text fontWeight="semibold" fontSize="lg" textAlign="center">
            Current Rankings
          </Text>
          {/* <Text
            py={1}
            rounded="lg"
            color="white"
            bg="green.400"
            w="200px"
            mb={3}
            textAlign="center"
            mx="auto"
          >
            Correct Answer : <Text fontWeight="semibold">{correctAnswer}</Text>
          </Text> */}
          <Stack space={2}>
            {curStandings?.map((item, idx) => (
              <HStack
                key={idx}
                space={3}
                alignItems="center"
                p={2}
                bg="blue.100"
                rounded="lg"
              >
                <Avatar
                  source={{
                    uri: item.userAvatar,
                  }}
                />
                <Stack>
                  <Text fontWeight="semibold" fontSize="lg" textAlign="center">
                    Player 1
                  </Text>
                  <Text textAlign="center">Answer : {item.answers}</Text>
                  <Text textAlign="center" color={"green.400"}>Answer : {item.answers}</Text>
                </Stack>
              </HStack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Alert>
  );
};

export default ToastStanding;
