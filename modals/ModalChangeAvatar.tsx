import { Avatar, Box, Button, HStack, SimpleGrid, Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import Layout from "../components/Layout";

export default function ModalChangeAvatar({ navigation }) {
  return (
    <Layout isCenter>
      <Box px={6}>
        <Box bg="white" p={6} rounded="lg">
          <SimpleGrid columns={3} space={3} alignItems="center">
            {Array.from({ length: 9 }, (_, index) => (
              <Box
                key={index}
                py={2}
                borderWidth="2px"
                borderColor="black"
                borderStyle="solid"
                w="80px"
                rounded="xl"
              >
                <Avatar
                  bg="green.500"
                  alignSelf="center"
                  size="lg"
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
                <Text
                  mt={1}
                  color="#FA9711"
                  fontWeight="semibold"
                  textAlign="center"
                >
                  FREE
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <HStack mt={8} w="full" justifyContent="center" space={4}>
            <Button
              onPress={() => navigation.navigate("Start Game")}
              bg="#CF0A0A"
              rounded="lg"
              px={10}
            >
              Cancel
            </Button>
            <Button
              onPress={() => navigation.navigate("Start Game")}
              bg="#0ACF83"
              rounded="lg"
              px={10}
            >
              Save
            </Button>
          </HStack>
        </Box>
      </Box>
    </Layout>
  );
}
