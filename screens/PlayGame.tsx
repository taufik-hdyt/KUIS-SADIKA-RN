import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Pressable,
  Progress,
  Spinner,
  Stack,
  Text,
  View,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import { FontAwesome } from "@expo/vector-icons";
import { Routes } from "../navigation/routes";

import { Button, ScrollView, StyleSheet } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useDispatch, useSelector } from "react-redux";
import { TimerQuestion } from "../components/TimerQuestion";
import { useQuestions } from "../hooks/useQuestions";
import { PlayGameNavigation } from "../navigation/MainNavigation";
import { setAnswer, setScore } from "../redux/reducers/ScoreReducer";
import { RootState } from "../redux/store";
import {
  setGoNextQuestion,
  setStatus,
  setTimer,
} from "../redux/reducers/TimerReducer";
import ToastStanding from "../components/PlayGameStandings";

export default function PlayGame({ navigation }: PlayGameNavigation) {
  const { timer, goNextQuestion } = useSelector(
    (state: RootState) => state.timer
  );
  const { questions } = useSelector((state: RootState) => state.score);
  // console.log(questions);

  const score = useSelector((state: RootState) => state.score);
  // console.log("answer => ", score, "go next: " + goNextQuestion);

  const dispatch = useDispatch();
  const [timerQuestionKey, setTimerQuestionKey] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const toast = useToast();

  const question = questions;

  const getQuestion = question?.[currentQuestionIndex]?.question;
  const getAnswer = question?.[currentQuestionIndex]?.answer.toLowerCase();
  const answerLength = question?.[currentQuestionIndex]?.answer.length;

  const progressQuestion = (currentQuestionIndex + 1) * 20;

  const CELL_COUNT = answerLength;
  const checkAnswer = value.toLowerCase() === getAnswer;

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
    } else {
      if (answerLength === value.length) {
        toast.show({ description: "Jawaban salah", placement: "top" });
      }
    }
  }, [value.toLowerCase(), getAnswer, currentQuestionIndex]);

  return (
    <Layout>
      <ScrollView style={{ marginTop: 20 }}>
        {!questions ? (
          <View flex={1} mt={200} alignItems={"center"} justifyContent="center">
            <Spinner size="lg" accessibilityLabel="Loading" />
          </View>
        ) : (
          <>
            <Box p={4}>
              <HStack justifyContent="flex-end" alignContent="center">
                <Flex
                  bg="gray.100"
                  px={3}
                  direction="row"
                  rounded="xl"
                  alignItems="center"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    {score.currentUserScore}
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
                  <Text fontSize="lg" fontWeight="semibold" color="white">
                    {getQuestion ? getQuestion : ""}
                  </Text>
                </Box>
              </Stack>

              {/* ======================= Answer ============================ */}

              <Box px={6} mt={4} bg="blue.500" py={3} rounded="lg">
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  keyboardType="default"
                  textContentType="none"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      fontSize="2xl"
                      onLayout={getCellOnLayoutHandler(index)}
                      style={[styles.cell, isFocused && styles.focusCell]}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </Box>
            </Box>
          </>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#00000030",
    backgroundColor: "white",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
