import { Box, Button, Icon, Image, Input, SimpleGrid, Spinner, Text, View } from "native-base";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Layout from "../components/Layout";
import { Routes } from "../navigation/routes";
import { ProfileNavigation } from "../navigation/MainNavigation";
import { useAvatars } from "../hooks/useAvatars";
import { useUser } from "@clerk/clerk-expo";
import { Pressable, SafeAreaView } from "react-native";

type AvatarData = {
  id: number;
  avatar_url: string;
  avatar_name: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export default function ChangeProfile({ navigation }: ProfileNavigation) {
  const { isLoading, avatarsData } = useAvatars();
  const [selected, setSelected] = useState(null);
  function handleSelected(e: number) {
    setSelected((prevSelected: number) => (prevSelected === e ? null : e));
  }
  const { user } = useUser();
  if (isLoading)
    return (
      <View flex={1} justifyContent="center">
        <Spinner size="lg" accessibilityLabel="Loading" />
      </View>
    );

  const userData = {
    fullName: user?.fullName,
    emailAddress: user?.primaryEmailAddress.emailAddress,
    imageUrl: user?.imageUrl,
  };

  // console.log(userData);

  return (
    <Layout isCenter>
      <Image alt="logo" source={require("../assets/logo.png")} mb={10} />
      <SimpleGrid columns={4} space={3} alignItems="center">
        {avatarsData?.map((avatar: AvatarData) => (
          <Pressable key={avatar.id} onPress={() => handleSelected(avatar.id)}>
            <Image
              alt={avatar.avatar_name}
              bg={selected === avatar.id ? "red.300" : "transparent"}
              rounded="lg"
              size={"sm"}
              source={{
                uri: avatar.avatar_url,
              }}
            />
          </Pressable>
        ))}
        {/* {Array.from({ length: 12 }, (_, index) => (
          <Image
            key={index}
            alt="avatar"
            source={require("../assets/cat.png")}
          />
        ))} */}
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
          onPress={() => navigation.navigate(Routes.StartGame)}
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
