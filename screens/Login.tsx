import { Box, Button, Image, View } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Layout from "../components/Layout";
import { Routes } from "../navigation/routes";
import { LoginNavigation } from "../navigation/MainNavigation";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

export default function Login({ navigation }: LoginNavigation) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onSelectAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log("file login.tsx:23 = ", createdSessionId);
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        navigation.navigate(Routes.ChangeProfile);
      }
    } catch (error) {
      console.error("OAUTH ERROR", error);
    }
  };

  return (
    <Layout isCenter>
      <View alignItems="center">
        <Image alt="logo" source={require("../assets/logo.png")} mb={20} />
      </View>
      <View px={8} justifyContent={"center"}>
        <View position={"absolute"} top={2} left={10} zIndex={1}>
          <AntDesign name="google" size={24} color="white" />
        </View>
        <Button onPress={onSelectAuth} rounded="full" bg="#0176E8">
          CONTINUE WITH GOOGLE
        </Button>
      </View>
    </Layout>
  );
}
