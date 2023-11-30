import { Entypo, Feather } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useUserProfile } from "../hooks/useUserProfile";
import ModalChangeAvatar from "../modals/ModalChangeAvatar";
import ModalTopUp from "../modals/ModalTopUp";
import { StartGameNavigation } from "../navigation/MainNavigation";
import { Routes } from "../navigation/routes";
import { setStatus } from "../redux/reducers/TimerReducer";
import { RootState } from "../redux/store";
import { resetScoreState } from "../redux/reducers/ScoreReducer";
import { socket } from "../socket/socket";

export default function StartGame({ navigation }: StartGameNavigation) {
  const { status } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
  const [modalTopUp, setModalTopUp] = useState(false);
  // const { signOut, isLoaded, isSignedIn } = useAuth();

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
      <View flex={1} justifyContent="center">
        <Spinner size="lg" accessibilityLabel="Loading" />
      </View>
    );

  return (
    <Layout>
      <HStack
        px={2}
        mt={4}
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
          <Text fontWeight="semibold" fontSize="md" color="#1e1e1e">
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
      {isLoading ? (
        <View flex={1} justifyContent="center">
          <Spinner size="lg" accessibilityLabel="Loading" />
        </View>
      ) : (
        <>
          <View flex={1} justifyContent={"center"} mt={-160}>
            <Box alignItems="center" mt={16}>
              <Box position="relative">
                <Image
                  bgColor={"#00EEFA"}
                  borderRadius={100}
                  resizeMode="cover"
                  alt="profile"
                  source={{ uri: userData?.avatar }}
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
                {userData?.username}
              </Text>
            </Box>

            <Box alignItems="center" mt={16}>
              <Button
                size="lg"
                onPress={handleStartGame}
                bg="#2075B8"
                px={16}
                rounded="xl"
                mt={-3}
              >
                START GAME
              </Button>
            </Box>
            {/* {isLoaded && isSignedIn && (
          <Box alignItems="center" mt={16}>
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
          </Box>
        )} */}
          </View>

          <ModalChangeAvatar
            isOpen={modalChangeAvatar}
            onClose={setModalChangeAvatar}
          />
          <ModalTopUp isOpen={modalTopUp} onClose={setModalTopUp} />
        </>
      )}
    </Layout>
  );
}
