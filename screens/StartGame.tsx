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
import ModalChangeAvatar from "../modals/ModalChangeAvatar";
import ModalTopUp from "../modals/ModalTopUp";
import { Routes } from "../navigation/routes";
import { StartGameNavigation } from "../navigation/MainNavigation";

export default function StartGame({ navigation }: StartGameNavigation) {
  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
  const [modalTopUp, setModalTopUp] = useState(false);

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
            onPress={() => setModalTopUp(true)}
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
            <Entypo
              onPress={() => setModalChangeAvatar(true)}
              name="pencil"
              size={20}
              color="white"
            />
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
          onPress={() => navigation.navigate(Routes.FindOpponent)}
          bg="#2075B8"
          px={16}
          rounded="xl"
          mt={-3}
        >
          START GAME
        </Button>
      </Box>

      <ModalChangeAvatar
        isOpen={modalChangeAvatar}
        onClose={setModalChangeAvatar}
      />
      <ModalTopUp isOpen={modalTopUp} onClose={setModalTopUp} />
    </Layout>
  );
}
