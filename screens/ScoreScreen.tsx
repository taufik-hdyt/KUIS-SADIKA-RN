import React from "react";
import Layout from "../components/Layout";
import { Button, HStack, Image, Text, View } from "native-base";
import { Routes } from "../navigation/routes";


export default function ScoreScreen({navigation}) {
  return (
    <Layout isCenter>
      <View>
        <Image
          alt="avatarwin"
          mx="auto"
          source={require("../assets/avatarwin.png")}
        />
        <Text fontWeight="semibold" fontSize="lg" textAlign="center">
          Molusca_Bertulang
        </Text>
        <HStack mt={10} justifyContent="space-evenly" px={10}>
          <Button  onPress={()=>navigation.navigate(Routes.StartGame)}  bg="#CF0A0A" rounded="xl">
            Return to Home
          </Button>
          <Button onPress={()=>navigation.navigate(Routes.FindOpponent)} bg="#0176E8" rounded="xl">
            Play Again
          </Button>
        </HStack>
      </View>
    </Layout>
  );
}
