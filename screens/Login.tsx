import { Box, Button, Image } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Layout from "../components/Layout";

export default function Login({ navigation }) {
  return (
    <Layout isCenter>
      <Image alt="logo" source={require("../assets/logo.png")} mb={20} />
      <Box px={8}>
        <Button
          onPress={() => navigation.navigate("Change Profile")}
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
