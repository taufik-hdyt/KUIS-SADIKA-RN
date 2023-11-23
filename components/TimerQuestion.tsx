import { Text } from "native-base";
import { useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useDispatch } from "react-redux";
import { setScore } from "../redux/reducers/ScoreReducer";
import { setGoNextQuestion } from "../redux/reducers/TimerReducer";

interface Props {
  isPlaying: boolean;
  durasi: number;
  size?: number;
  textSize?: string;
  strokeWidth?: number;
  isCheckAnswer: any;
}
export const TimerQuestion = ({
  durasi,
  isPlaying,
  size,
  textSize,
  strokeWidth,
  isCheckAnswer,
}: Props) => {
  const dispatch = useDispatch();
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={durasi}
      size={size ? size : 50}
      colors={["#3EC70B", "#F94C10", "#FE0000"]}
      colorsTime={[durasi, durasi * 0.5, 0]}
      strokeWidth={strokeWidth ? strokeWidth : 8}
    >
      {({ remainingTime }) => {
        useEffect(() => {
          if (remainingTime == 0) {
            dispatch(setGoNextQuestion(true));
          }
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
