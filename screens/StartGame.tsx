import { Entypo, Feather } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  View,
  Tooltip,
  Stack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useUserProfile } from "../hooks/useUserProfile";
import ModalChangeAvatar from "../modals/ModalChangeAvatar";
import { StartGameNavigation } from "../navigation/MainNavigation";
import { Routes } from "../navigation/routes";
import { setStatus } from "../redux/reducers/TimerReducer";
import { RootState } from "../redux/store";
import { resetScoreState } from "../redux/reducers/ScoreReducer";
import { socket } from "../socket/socket";
import { LoadingAnimation, LogoutAnimation } from "../components/Animation";
import { useAuth } from "@clerk/clerk-expo";
import ModalTopUpDiamond from "../modals/ModalTopUp";

export default function StartGame({ navigation }: StartGameNavigation) {
  const { status } = useSelector((state: RootState) => state.timer);

  const dispatch = useDispatch();

  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
  const [modalTopUp, setModalTopUp] = useState(false);
  const { signOut } = useAuth();

  const { isLoading, userData } = useUserProfile();

  function handleStartGame() {
    dispatch(setStatus("matchmaking"));
    socket.emit("matchmaking", {
      userName: userData?.username,
      userAvatar: userData?.avatar,
    });
    navigation.navigate(Routes.FindOpponent);
  }

  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    if (status === "finished" || "idle") {
      dispatch(resetScoreState());
    }
  }, [status]);

  if (isLoading)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <LoadingAnimation />
      </Box>
    );

  return (
    <Layout>
      <HStack px={2} mt={4} alignItems="center" justifyContent="space-between">
        <Image
          style={{ width: 100, height: 50 }}
          alt="logo"
          source={require("../assets/logo.png")}
        />
        <HStack alignItems="center" space={2}>
          <HStack
            space={2}
            bg="rgba(255,255,255, 0.7)"
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
            <Text fontWeight="semibold" fontSize="md" color="#1e1e1e">
              {userData?.diamond}
            </Text>
            <IconButton
              bg="#0176E8"
              rounded="lg"
              size="xs"
              icon={<Feather name="plus" size={20} color="white" />}
              onPress={() => setModalTopUp(true)}
            />
          </HStack>

          <Tooltip label="Logout">
            <IconButton
              onPress={() => signOut()}
              icon={<LogoutAnimation />}
              bg="rgba(255,255,255, 0.7)"
              p={1}
              rounded="lg"
            />
          </Tooltip>
        </HStack>
      </HStack>
      {isLoading ? (
        <View flex={1} justifyContent="center">
          <LoadingAnimation />
        </View>
      ) : (
        <>
          <Stack space={"2/6"} justifyContent={"center"} h="full" >
            <Box alignItems="center" >
              <Box position="relative" bg="#0176E8" rounded="full" p={1}>
                <Box bg="white" rounded="full" p={.5}>
                  <Image
                    bgColor={"#00EEFA"}
                    borderRadius={100}
                    resizeMode="cover"
                    alt="profile"
                    source={{ uri: userData?.avatar }}
                    size={"lg"}
                  />

                  <Box
                    p={1}
                    rounded="full"
                    right={-10}
                    position="absolute"
                    bottom={-5}
                    bg="#0176E8"
                  >

                    <Entypo
                      onPress={() => setModalChangeAvatar(true)}
                      name="pencil"
                      size={20}
                      color="white"
                    />
                  </Box>
                </Box>
              </Box>

              <Text fontSize="xl" fontWeight="semibold">
                {userData?.username}
              </Text>
            </Box>

            <Box alignItems="center">
              <Button
                size="lg"
                onPress={handleStartGame}
                bg="#0176E8"
                px={16}
                rounded="xl"
                mt={-12}
              >
                START GAME
              </Button>
            </Box>
          </Stack>

          <ModalChangeAvatar
            isOpen={modalChangeAvatar}
            onClose={setModalChangeAvatar}
          />
          <ModalTopUpDiamond
            isOpen={modalTopUp}
            onClose={() => setModalTopUp(false)}
          />
        </>
      )}
    </Layout>
  );
}
