import { Box, Button, Image } from "native-base";
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
      <Image alt="logo" source={require("../assets/logo.png")} mb={20} />
      <Box px={8}>
        <Button
          onPress={onSelectAuth}
          rounded="full"
          bg="#0176E8"
          leftIcon={<AntDesign name="google" size={24} color="white" />}
        >
          CONTINUE WITH GOOGLE
        </Button>
      </Box>
    </Layout>
  );
}
