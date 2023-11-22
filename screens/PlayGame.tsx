import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Progress,
  Stack,
  Text,
  View,
  useToast,
} from "native-base";
import { useQuestions } from "../hooks/useQuestions";
import { Timer } from "../components/Timer";
import { FontAwesome } from "@expo/vector-icons";
import { Routes } from "../navigation/routes";
import CustomKeyboard from "../components/Keyboard";

export default function PlayGame({ navigation }) {
  // const [answer, setAnswer] = useState<string>("");
  // const [score, setScore] = useState(0);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // const toast = useToast();

  // // data question from API
  // const { questionsData } = useQuestions();
  // const question = questionsData;

  // const getAnswer = question?.[currentQuestionIndex]?.answer;
  // const answerLength = question?.[currentQuestionIndex]?.answer.length;

  // const handleAnswer = () => {
  //   if (currentQuestionIndex < question?.length - 1) {
  //     if (answer !== getAnswer) {
  //       return toast.show({ description: "Jawaban salah" });
  //     }
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //     setAnswer("");
  //   } else {
  //     console.log("Semua pertanyaan telah dijawab.");
  //   }
  // };

  // const [input, setInput] = useState("");
  // function handleKeyPress(key: string) {
  //   if (input.length < answerLength) {
  //     setInput((prevData) => prevData + key);
  //   }
  //   if (key === "⌫") {
  //     const text = input.split("");
  //     console.log(text);
  //     setInput(text.slice(0, -1).join(""));
  //   }
  // }
  // console.log(input);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const toast = useToast();

  // data question from API
  const { questionsData } = useQuestions();
  const question = questionsData;
  const getAnswer = question?.[currentQuestionIndex]?.answer.toUpperCase();
  const answerLength = question?.[currentQuestionIndex]?.answer.length;

  const handleAnswer = () => {
    if (currentQuestionIndex < question?.length - 1) {
      if (input !== getAnswer)
        return toast.show({ description: "Jawaban salah" });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInput("");
      setScore(score + 60 / 10);
    } else {
      console.log("Semua pertanyaan telah dijawab.");
    }
  };

  function handleKeyPress(key: string) {
    if (input.length < answerLength) {
      setInput((prevData) => prevData + key.toUpperCase());
    }
    if (key === "⌫") {
      const text = input.split("");
      // console.log(text);
      setInput(text.slice(0, -1).join("").toUpperCase());
    }
  }
  // console.log(input.toUpperCase());
  // console.log(getAnswer);

  const progressQuestion = (currentQuestionIndex + 1) * 20;

  return (
    <Layout>
      <Box style={{ flex: 1 }}>
        <View flex={4} mt={12} mx={5} position={"relative"}>
          <View zIndex={2}>
            <HStack justifyContent="flex-end" alignContent="center">
              <Flex
                bg="gray.100"
                px={3}
                direction="row"
                rounded="xl"
                alignItems="center"
              >
                <Text mr={3} fontSize="xl" fontWeight="bold">
                  100
                </Text>
                <FontAwesome name="trophy" size={34} color="#FFD700" />
              </Flex>
            </HStack>

            <Stack>
              <Text color="black">
                {currentQuestionIndex}/{question?.length} Questions
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
                <Timer durasi={20} isPlaying={true} />
                <Text fontWeight="semibold" fontSize="lg" color="black">
                  Player Remaining : <Text color="#FA9711">20</Text>
                </Text>
              </HStack>
            </Center>
          </View>
          <View position={"absolute"} zIndex={0} bottom={10}>
            <View
              h={"200px"}
              bg="#2895F3"
              rounded="lg"
              p={3}
              justifyContent={"center"}
              w={"300px"}
            >
              <Text
                fontWeight="semibold"
                fontSize="2xl"
                color={"white"}
                w={"70%"}
                lineHeight={"30px"}
                ml={3}
              >
                {question ? question[currentQuestionIndex]?.question : ""}
              </Text>
            </View>
          </View>
          <View position={"absolute"} zIndex={1} bottom={0} right={-48}>
            <Image
              source={require("../assets/nanya.png")}
              alt="bg"
              size={"200px"}
            />
          </View>
        </View>

        <View flex={3} bgColor={"#005EAE"}>
          <View>
            <Stack justifyContent="center" space={2}>
              {/*=================== ANSWERRR============= */}
              <Box position="relative" height="10" bg="#2895F3">
                <HStack space={1} position="absolute" ml={16}>
                  {Array.from({ length: answerLength }, (_, indx) => (
                    <Box w={10} bg="white" h={10} key={indx}></Box>
                  ))}
                </HStack>

                <HStack space={1} ml={16}>
                  {input
                    .split("")
                    .slice(0, answerLength)
                    .map((data, idx) => (
                      <Box
                        justifyContent="center"
                        alignItems="center"
                        h={10}
                        w={10}
                        key={idx}
                      >
                        {data}
                      </Box>
                    ))}
                </HStack>
              </Box>
            </Stack>
            <View mt={5}>
              <View flexDir={"row"} justifyContent={"space-evenly"}>
                <Button
                  isDisabled={input === ""}
                  onPress={handleAnswer}
                  bg="primary.500"
                  w={"40"}
                >
                  Answer
                </Button>
                <Button
                  onPress={() => navigation.navigate(Routes.Score)}
                  w={"40"}
                >
                  Next Page
                </Button>
              </View>
              <View mt={2}>
                <CustomKeyboard
                  onKeyPress={(key: string) => handleKeyPress(key)}
                />
              </View>
            </View>
          </View>
        </View>
      </Box>
    </Layout>
  );
}
