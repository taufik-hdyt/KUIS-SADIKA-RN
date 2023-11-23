import { Dimensions } from "react-native";
import * as Device from "expo-device";

const { width, height } = Dimensions.get("window");

const isSmall = width <= 375 && !Device.DeviceType.TABLET;

const guidelineBaseWidth = () => {
  if (isSmall) {
    return 320;
  }
  return 350;
};

const horizontalScale = (size: number) => {
  return (width / guidelineBaseWidth()) * size;
};

const guidelineBaseHeight = () => {
  if (isSmall) {
    return 550;
  } else if (width > 410) {
    return 620;
  }
  return 680;
};

const verticalScale = (size: number) => {
  return (height / guidelineBaseHeight()) * size;
};

const guidelineBaseFonts = () => {
  if (width > 410) {
    return 430;
  }
  return 400;
};

const scaleFontSize = (size: number) => {
  return Math.round((width / guidelineBaseFonts()) * size);
};

export { horizontalScale, verticalScale, scaleFontSize };
