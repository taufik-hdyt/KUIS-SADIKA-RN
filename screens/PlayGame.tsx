import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  useToast,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuestions } from "../hooks/useQuestions";
import { Timer } from "../components/Timer";
import { FontAwesome } from "@expo/vector-icons";
import { Routes } from "../navigation/routes";

export default function PlayGame({ navigation }) {
  const [answer, setAnswer] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { questionsData } = useQuestions();
  const toast = useToast();
  const question = questionsData?.data;

  const handleAnswer = () => {
    if (currentQuestionIndex < question?.length - 1) {
      if (answer !== question[currentQuestionIndex]?.answer) {
        return toast.show({ description: "Jawaban salah" });
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer("");
    } else {
      console.log("Semua pertanyaan telah dijawab.");
    }
  };

  return (
    <Layout isCenter>
      <SafeAreaView>
        <Box p={6}>
          <Box py={8} rounded="xl" bg="black" px={3}>
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

            <Text
              fontWeight="semibold"
              fontSize="lg"
              textAlign="center"
              rounded="lg"
              mt={10}
              bg="gray.100"
              p={3}
            >
              {question[currentQuestionIndex]?.question}
            </Text>
            <Stack space={2} mt={10}>
              <Input
                _focus={{ bg: "white" }}
                variant="filled"
                bg="white"
                placeholder="Input your answer "
                fontSize="lg"
                value={answer}
                onChangeText={(e) => setAnswer(e)}
                InputLeftElement={
                  <Icon
                    as={
                      <FontAwesome
                        name="pencil-square-o"
                        size={24}
                        color="black"
                      />
                    }
                    size={8}
                    ml="2"
                    color="muted.400"
                  />
                }
              />
              <Button
                isDisabled={answer === ""}
                onPress={handleAnswer}
                bg="primary.500"
              >
                Answer
              </Button>
              <Button onPress={()=> navigation.navigate(Routes.Score)}>Next Page</Button>
            </Stack>
          </Box>
        </Box>
      </SafeAreaView>
    </Layout>
  );
}
