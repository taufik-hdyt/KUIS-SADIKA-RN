import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import Containers from "./containers";

export default function App() {
  return (
    <NativeBaseProvider>
      <Containers />
    </NativeBaseProvider>
  );
}