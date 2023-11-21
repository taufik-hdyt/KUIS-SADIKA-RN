import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  View,
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
import { useUserProfile } from "../hooks/useUserProfile";
import { useAuth } from "@clerk/clerk-expo";

export default function StartGame({ navigation }: StartGameNavigation) {
  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
  const [modalTopUp, setModalTopUp] = useState(false);
  const {signOut, isLoaded, isSignedIn} = useAuth()

  const { isLoading, userData } = useUserProfile();

  if (isLoading)
    return (
      <View flex={1} justifyContent="center">
        <Spinner size="lg" accessibilityLabel="Loading" />
      </View>
    );

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
        <HStack
          space={4}
          bg="#00edfaa0"
          px={3}
          py={1}
          rounded="xl"
          alignItems={"center"}
        >
          <Image
            style={{ width: 30, height: 30 }}
            alt="logo"
            source={require("../assets/diamond.png")}
          />
          <Text fontSize="md" color="#1e1e1e">
            100
          </Text>
          <IconButton
            bg="#0176E8"
            rounded="lg"
            size="xs"
            icon={<Feather name="plus" size={20} color="white" />}
            onPress={() => setModalTopUp(true)}
          />
        </HStack>
      </HStack>
      <View flex={1} justifyContent={"center"} mt={-160}>
        <Box alignItems="center" mt={16}>
          <Box position="relative">
            <Image
              bgColor={"#00EEFA"}
              borderRadius={100}
              resizeMode="cover"
              alt="profile"
              source={{ uri: userData.avatar }}
              size={"md"}
            />

            <Box
              p={1}
              rounded="full"
              right={-10}
              position="absolute"
              bottom={-5}
              bg="#2075B8"
            >
              <Entypo
                onPress={() => setModalChangeAvatar(true)}
                name="pencil"
                size={23}
                color="white"
              />
            </Box>
          </Box>

          <Text fontSize="xl" fontWeight="semibold">
            {userData.username}
          </Text>
        </Box>

        <Box alignItems="center" mt={16}>
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
        {isLoaded && isSignedIn &&<Box alignItems="center" mt={16}>
          <Button
            size="lg"
            onPress={() => signOut()}
            bg="#2075B8"
            px={6}
            rounded="xl"
            mt={-3}
          >
            Log out
          </Button>
        </Box>}
      </View>

      <ModalChangeAvatar
        isOpen={modalChangeAvatar}
        onClose={setModalChangeAvatar}
      />
      <ModalTopUp isOpen={modalTopUp} onClose={setModalTopUp} />
    </Layout>
  );
}
