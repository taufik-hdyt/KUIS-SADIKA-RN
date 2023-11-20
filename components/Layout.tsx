import React, { ReactNode } from "react";
import { ImageBackground } from "react-native";

interface Props {
  children: ReactNode;
  isCenter?: boolean
}
export default function Layout({ children,isCenter }: Props) {
  return (
    <ImageBackground alt="background"
      style={{ flex: 1,justifyContent: isCenter ? "center" : "flex-start"}}
      source={require("../assets/background.png")}
    >
      {children}
    </ImageBackground>
  );
}
