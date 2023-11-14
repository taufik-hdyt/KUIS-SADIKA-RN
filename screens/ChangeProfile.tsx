import { Box, Button, Icon, Image, Input, SimpleGrid } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Layout from "../components/Layout";

export default function ChangeProfile({ navigation }) {
  return (
    <Layout isCenter>
      <Image alt="logo" source={require("../assets/logo.png")} mb={10} />
      <SimpleGrid columns={4} space={3} alignItems="center">
        {Array.from({ length: 12 }, (_, index) => (
          <Image
            key={index}
            alt="avatar"
            source={require("../assets/cat.png")}
          />
        ))}
      </SimpleGrid>
      <Box px="12">
        <Input
          rounded="xl"
          mt="4"
          bg="white"
          _focus={{ bg: "white" }}
          variant="filled"
          placeholder="Input your name"
          InputLeftElement={
            <Icon
              as={
                <FontAwesome name="pencil-square-o" size={24} color="black" />
              }
              size={5}
              ml="2"
              color="muted.400"
            />
          }
        />
        <Button
          onPress={() => navigation.navigate("Start Game")}
          bg="#0176E8"
          rounded="lg"
          mt={2}
        >
          Continue
        </Button>
      </Box>
    </Layout>
  );
}
