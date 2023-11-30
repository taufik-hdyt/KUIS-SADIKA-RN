import LottieView from "lottie-react-native";
import { View } from "react-native";
import React from "react";

export const SettingAnimation = () => (
  <View>
    <LottieView
      source={require("../assets/animation/icons8-settings.json")}
      autoPlay
      loop
      style={{ width: 30, height: 30 }}
    />
  </View>
);

export const QuizAnimation = () => (
  <View>
    <LottieView
      source={require("../assets/animation/quizAnimaton.json")}
      autoPlay
      loop={false}
      style={{ width: 200, height: 200 }}
    />
  </View>
);
export const QuizAnimation1 = () => (
  <View>
    <LottieView
      source={require("../assets/animation/quiz.json")}
      autoPlay
      loop={true}
      style={{ width: 250, height: 250 }}
    />
  </View>
);

export const LoadingAnimation = () => (
  <View>
    <LottieView
      source={require("../assets/animation/loading.json")}
      autoPlay
      loop={true}
      style={{ width: 200, height: 200 }}
    />
  </View>
);

export const LogoutAnimation = () => (
  <View>
    <LottieView
      source={require("../assets/animation/logout.json")}
      autoPlay
      loop={true}
      style={{ width: 30, height: 30 }}
    />
  </View>
);
