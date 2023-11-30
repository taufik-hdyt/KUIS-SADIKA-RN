import React, { Fragment, ReactNode } from "react";
import { ImageBackground, StatusBar } from "react-native";

interface Props {
  children: ReactNode;
  isCenter?: boolean;
}
export default function Layout({ children, isCenter }: Props) {
  return (
    <Fragment>
      <StatusBar backgroundColor="rgba(0,0,0,.7)" />
      <ImageBackground
        alt="background"
        style={{ flex: 1, justifyContent: isCenter ? "center" : "flex-start" }}
        source={require("../assets/background.png")}
      >
        {children}
      </ImageBackground>
    </Fragment>
  );
}
