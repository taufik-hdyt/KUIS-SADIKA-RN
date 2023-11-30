import React, { useState } from "react";
import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  View,
  useToast,
} from "native-base";
import { FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Layout from "../components/Layout";
import { ProfileNavigation } from "../navigation/MainNavigation";
import { useAvatars } from "../hooks/useAvatars";
import { Pressable } from "react-native";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useForm, Controller } from "react-hook-form";
import { Routes } from "../navigation/routes";
import ToastStanding from "../components/PlayGameStandings";
import { LoadingAnimation } from "../components/Animation";

export type AvatarData = {
  id: number;
  avatar_url: string;
  avatar_name: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export default function ChangeProfile({ navigation }: ProfileNavigation) {
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const { isLoading, avatarsData } = useAvatars();
  const freeAvatars = avatarsData?.filter(
    (avatar: AvatarData) => avatar.price === 0
  );
  const { form, setForm, isUpdating, updateUser } = useUpdateProfile();
  const selectedAvatar = freeAvatars?.find(
    (avatar: AvatarData) => avatar.id === selected
  );
  function handleSelected(avatarId: number) {
    setSelected((prevSelected: number) =>
      prevSelected === avatarId ? null : avatarId
    );
    // console.log(selectedAvatar?.id, selectedAvatar?.price);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit({ username }) {
    const updatedForm = {
      ...form,
      username,
      avatar: selectedAvatar?.avatar_url,
    };
    setForm(updatedForm);
    console.log(updatedForm);
    updateUser();
    setTimeout(() => {
      navigation.navigate(Routes.StartGame);
    }, 1000);
  }

  return (
    <Layout isCenter>
      <View alignItems="center">
        <Image alt="logo" source={require("../assets/logo.png")} mb={10} />
      </View>
      {isLoading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <LoadingAnimation />
        </Box>
      ) : (
        <>
          <SimpleGrid columns={4} space={3} alignItems="center">
            <FlatList
              data={freeAvatars}
              numColumns={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item: avatar }) => (
                <Pressable onPress={() => handleSelected(avatar.id)}>
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
              )}
            />
          </SimpleGrid>
          <View justifyContent={"center"} alignItems="center" my={3}>
            <Text fontWeight={"semibold"} fontSize={"md"} color={"#0176E8"}>
              Choose your starter avatar
            </Text>
          </View>
          <Box px="12">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  rounded="xl"
                  mt="4"
                  bg="white"
                  _focus={{ bg: "white" }}
                  variant="filled"
                  placeholder="Input your name"
                  InputLeftElement={
                    <Icon
                      as={
                        <FontAwesome
                          name="pencil-square-o"
                          size={24}
                          color="black"
                        />
                      }
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              )}
              name="username"
            />
            {errors.username && <Text>This is required.</Text>}

            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={isUpdating}
              bg="#0176E8"
              rounded="lg"
              mt={2}
            >
              Continue
            </Button>
            <Button
              onPress={() => {
                navigation.navigate(Routes.StartGame);
              }}
              bg="#0176E8"
              rounded="lg"
              mt={2}
            >
              go to next page
            </Button>
            <Button
              onPress={() => {
                toast.show({
                  placement: "bottom",
                  duration: 5000,
                  render: ({ id }) => {
                    return (
                      <ToastStanding
                        id={id}
                        title={"Current standings"}
                        variant={"top-accent"}
                        status="success"
                      />
                    );
                  },
                });
              }}
              bg="#0176E8"
              rounded="lg"
              mt={2}
            >
              HEHE
            </Button>
            
          </Box>
        </>
      )}
    </Layout>
  );
}
