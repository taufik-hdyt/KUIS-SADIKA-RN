import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  View,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Layout from "../components/Layout";
import { ProfileNavigation } from "../navigation/MainNavigation";
import { useAvatars } from "../hooks/useAvatars";
import { Pressable } from "react-native";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useForm, Controller } from "react-hook-form";
import { Routes } from "../navigation/routes";

type AvatarData = {
  id: number;
  avatar_url: string;
  avatar_name: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export default function ChangeProfile({ navigation }: ProfileNavigation) {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, avatarsData } = useAvatars();
  const { form, setForm, isUpdating, updateUser } = useUpdateProfile();
  const [selected, setSelected] = useState(null);
  const selectedAvatar = avatarsData?.data.find(
    (avatar: AvatarData) => avatar.id === selected
  )


  function handleSelected(avatarId: number) {
    setSelected((prevSelected: number) =>
      prevSelected === avatarId ? null : avatarId
    );
    console.log(selectedAvatar?.id, selectedAvatar?.price);
  }

  function onSubmit({ username }) {
    const updatedForm = { ...form, username, avatar: selectedAvatar?.avatar_url };
    setForm(updatedForm);
    console.log(updatedForm);
    updateUser();
    toast.show({
      description: "update success",
    });

  }

  if (isLoading)
    return (
      <View flex={1} justifyContent="center">
        <Spinner size="lg" accessibilityLabel="Loading" />
      </View>
    );




  return (
    <Layout isCenter>
      <Image alt="logo" source={require("../assets/logo.png")} mb={10} />
      <SimpleGrid columns={4} space={3} alignItems="center">
        {avatarsData?.data.map((avatar: AvatarData) => (
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
      </SimpleGrid>
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
        {errors.avatar && <Text>This is required.</Text>}

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isUpdating}
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
