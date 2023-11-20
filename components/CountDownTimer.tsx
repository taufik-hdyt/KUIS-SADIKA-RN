import { Text } from "native-base";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

const CountDownTimer = ({ onFinish }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          onFinish();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <View>
      <Text fontWeight="bold" textAlign="center" fontSize="7xl" color="#FFC700">
      {timer ? timer : 0}
      </Text>
    </View>
  );
};

export default CountDownTimer;
