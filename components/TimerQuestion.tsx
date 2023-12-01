/* eslint-disable react/react-in-jsx-scope */
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, useToast } from "native-base";
import { useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useDispatch } from "react-redux";
import { MainStackParamList } from "../navigation/MainNavigation";
import { Routes } from "../navigation/routes";
import { setScore } from "../redux/reducers/ScoreReducer";
import ToastStanding from "./PlayGameStandings";
import { socket } from "../socket/socket";

interface Props {
  isPlaying: boolean;
  durasi: number;
  size?: number;
  textSize?: string;
  strokeWidth?: number;
  isCheckAnswer: boolean;
  setQuestionIndex: (e: number) => void;
  questionIndex?: number;
  shouldNavigate?: boolean;
  correctAnswer?: string;
}
export const TimerQuestion = ({
  durasi,
  isPlaying,
  size,
  textSize,
  strokeWidth,
  isCheckAnswer,
  questionIndex,
  setQuestionIndex,
  shouldNavigate,
  correctAnswer,
}: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigation<NavigationProp<MainStackParamList>>();
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={durasi}
      size={size ? size : 50}
      colors={["#3EC70B", "#F94C10", "#FE0000"]}
      colorsTime={[durasi, durasi * 0.5, 0]}
      strokeWidth={strokeWidth ? strokeWidth : 8}
      onComplete={() => {
        if (!shouldNavigate) {
          setQuestionIndex(questionIndex + 1);
          socket.emit("resetStandings");
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              return (
                <ToastStanding
                  id={id}
                  title={"Current standings"}
                  variant={"top-accent"}
                  status="info"
                  correctAnswer={correctAnswer}
                />
              );
            },
          });
        }
        if (shouldNavigate) {
          navigate.navigate(Routes.Score);
        }

        return { shouldRepeat: shouldNavigate ? false : true, delay: 0.5 };
      }}
    >
      {({ remainingTime }) => {
        useEffect(() => {
          if (isCheckAnswer) {
            let score = 3 * 2;
            if (remainingTime > durasi * 0.8) {
              score += 69;
            } else if (remainingTime > durasi * 0.5) {
              score += 39;
            } else if (remainingTime > durasi * 0.2) {
              score += 9;
            }
            dispatch(setScore(score));
          }
        }, [isCheckAnswer, remainingTime]);
        return (
          <Text p={2} fontWeight="bold" fontSize={textSize ? textSize : "lg"}>
            {remainingTime}s
          </Text>
        );
      }}
    </CountdownCircleTimer>
  );
};
