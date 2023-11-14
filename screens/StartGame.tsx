import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
} from "native-base";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ModalLayout from "../modals/ModalLayout";

export default function StartGame({ navigation }) {

  const [modalChangeAvatar,setModalChangeAvatar]=useState(false)


  return (
    <Layout>
      <HStack
        px={2}
        mt={12}
        h="40px"
        alignContent="center"
        justifyContent="space-between"
      >
        <Image
          style={{ width: 100, height: 50 }}
          alt="logo"
          source={require("../assets/logo.png")}
          mb={10}
        />
        <HStack space={4} bg="gray.700" p={1} rounded="lg">
          <Image
            style={{ width: 40, height: 30 }}
            alt="logo"
            source={require("../assets/diamond.png")}
            mb={10}
          />
          <Text fontSize="xl" color="white">
            100
          </Text>
          <IconButton
            bg="#00FF47"
            rounded="lg"
            size="xs"
            icon={<Feather name="plus" size={20} color="white" />}
          />
        </HStack>
      </HStack>

      <Box alignItems="center" mt={16}>
        <Box position="relative">
          <Image alt="profile" source={require("../assets/avatar.png")} />
          <Box
            p={1}
            rounded="full"
            right={3}
            position="absolute"
            bottom="0"
            bg="#2075B8"
          >
            <Entypo onPress={() => setModalChangeAvatar(true)} name="pencil" size={20} color="white" />
          </Box>
        </Box>

        <Text fontSize="xl" fontWeight="semibold">
          Fauzan
        </Text>
      </Box>

      <Box alignItems="center" mt={16}>
        <Box>
          <Image alt="profile" source={require("../assets/customer.png")} />
        </Box>
        <Button
          size="lg"
          onPress={() => navigation.navigate("Find Opponents")}
          bg="#2075B8"
          px={16}
          rounded="xl"
          mt={-3}
        >
          START GAME
        </Button>
      </Box>

      <ModalLayout   isOpen={modalChangeAvatar} onClose={setModalChangeAvatar}  title="Change Avatar">
      <Box >
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
              onPress={() => setModalChangeAvatar(false)}
              bg="#CF0A0A"
              rounded="lg"
              px={10}
            >
              Cancel
            </Button>
            <Button
              onPress={() => setModalChangeAvatar(false)}
              bg="#0ACF83"
              rounded="lg"
              px={10}
            >
              Save
            </Button>
          </HStack>
        </Box>
      </ModalLayout>
    </Layout>
  );
}
