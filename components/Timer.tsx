import { Text } from "native-base";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface Props {
  isPlaying: boolean;
  durasi: number;
  size?: number;
  textSize?: string;
  strokeWidth?: number;
}
export const Timer = ({
  durasi,
  isPlaying,
  size,
  textSize,
  strokeWidth,
}: Props) => {
  // console.log("From timer component:", durasi);

  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={durasi}
      size={size ? size : 50}
      colors={["#3EC70B", "#F94C10", "#FE0000"]}
      colorsTime={[20, 10, 0]}
      strokeWidth={strokeWidth ? strokeWidth : 8}
    >
      {({ remainingTime }) => (
        <Text p={2} fontWeight="bold" fontSize={textSize ? textSize : "lg"}>
          {remainingTime}s
        </Text>
      )}
    </CountdownCircleTimer>
  );
};