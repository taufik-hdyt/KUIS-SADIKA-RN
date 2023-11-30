import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Progress,
  Stack,
  Text,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import { FontAwesome } from "@expo/vector-icons";
import { Routes } from "../navigation/routes";

import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToastStanding from "../components/PlayGameStandings";
import { TimerQuestion } from "../components/TimerQuestion";
import { PlayGameNavigation } from "../navigation/MainNavigation";
import { setAnswer } from "../redux/reducers/ScoreReducer";
import { RootState } from "../redux/store";
import { socket } from "../socket/socket";
import { useUserProfile } from "../hooks/useUserProfile";
import { LoadingAnimation } from "../components/Animation";
import InputAnswer from "../components/Keyboard";
import { Feather } from "@expo/vector-icons";

export default function PlayGame({ navigation }: PlayGameNavigation) {
  const { userData } = useUserProfile();
  const { player } = useSelector((state: RootState) => state.player);
  const { questions, roomId, currentUserAnswer, currentUserScore } =
    useSelector((state: RootState) => state.score);

  const playerID = player.find((p) => p.userName === userData.username);

  console.log(playerID.userId);

  const dispatch = useDispatch();
  const [timerQuestionKey, setTimerQuestionKey] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const toast = useToast();

  const question = questions;
  const getQuestion = question?.[currentQuestionIndex]?.question;
  const getAnswer = question?.[currentQuestionIndex]?.answer.toLowerCase();
  const answerLength = question?.[currentQuestionIndex]?.answer.length;

  const progressQuestion = (currentQuestionIndex / question?.length) * 100;
  const checkAnswer = value.toLowerCase() === getAnswer;
  useEffect(() => {
    if (checkAnswer) {
      setTimerQuestionKey((prevKey) => prevKey + 1);
      dispatch(setAnswer(value.toLowerCase()));
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setValue("");
      if (question?.length !== currentQuestionIndex + 1) {
        toast.show({
          placement: "bottom",
          render: ({ id }) => {
            return (
              <ToastStanding
                id={id}
                title={"Current standings"}
                variant={"top-accent"}
                status="success"
              />
            );
          },
        });
      }
      if (question?.length === currentQuestionIndex + 1) {
        navigation.navigate(Routes.Score);
        setCurrentQuestionIndex(0);
        setValue("");
      }
    }
  }, [value.toLowerCase(), getAnswer, currentQuestionIndex]);

  function handleCheckAnswer() {
    if (answerLength === value.length) {
      if (!checkAnswer) {
        return (
          <HStack
            mt={4}
            space={1}
            alignContent="center"
            justifyContent="center"
          >
            <Text fontWeight="bold" fontSize="lg" color="white">
              Wrong Answer
            </Text>
            <Feather name="x-circle" size={30} color="red" />
          </HStack>
        );
      }
    }
  }

  useEffect(() => {
    if (currentUserAnswer !== "" || currentUserScore !== 0) {
      socket.emit("addScore", {
        userId: playerID.userId,
        roomId: roomId,
        score: currentUserScore,
        answer: currentUserAnswer,
      });
    }
  }, [currentUserScore, currentUserAnswer]);

  return (
    <Layout>
      <ScrollView style={{ marginTop: 20 }}>
        {!questions ? (
          <LoadingAnimation />
        ) : (
          <>
            <Box p={4}>
              <HStack justifyContent="flex-end"  alignContent="center">
                <Flex
                  bg="gray.100"
                  px={3}
                  direction="row"
                  rounded="xl"
                  alignItems="center"
                >
                  <Text mr={2} fontSize="2xl" fontWeight="bold">
                    {currentUserScore}
                  </Text>
                  <FontAwesome name="trophy" size={34} color="#FFD700" />
                </Flex>
              </HStack>

              <Stack>
                <Text>
                  {currentQuestionIndex + 1}/{question?.length} Questions
                </Text>
                <Progress mt={1} mb={4} value={progressQuestion} />
              </Stack>
              <Center>
                <HStack
                  alignItems="center"
                  space={3}
                  bg="#D9D9D9"
                  rounded="full"
                  pr={6}
                >
                  <TimerQuestion
                    setQuestionIndex={setCurrentQuestionIndex}
                    questionIndex={currentQuestionIndex}
                    shouldNavigate={
                      question?.length === currentQuestionIndex + 1
                    }
                    durasi={30}
                    isPlaying={true}
                    isCheckAnswer={checkAnswer}
                    correctAnswer={getAnswer}
                    key={timerQuestionKey}
                  />
                  <Text fontSize="lg" fontWeight="semibold">
                    Player Remaining : <Text color="#FA9711">4</Text>
                  </Text>
                </HStack>
              </Center>

              <Stack alignItems="center" mt={3}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/nanya.png")}
                  alt="bg"
                  size={"100px"}
                />
                <Box rounded="lg" w="full" mt={-2} bg="blue.500" p={3}>
                  <Text
                    mb={10}
                    fontSize="lg"
                    fontWeight="semibold"
                    color="white"
                  >
                    {getQuestion ? getQuestion : ""}
                  </Text>

                  <Divider />
                  {handleCheckAnswer()}
                  <Box bg="rgba(0,0,0,.6)" mt={6} rounded="xl" p={2}>
                    <Text color="white" mb={2}>
                      Input Answer
                    </Text>
                    <InputAnswer
                      setValue={setValue}
                      value={value}
                      answerLength={answerLength}
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>
          </>
        )}
      </ScrollView>
    </Layout>
  );
}
