import { AntDesign } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { useAvatars } from "../hooks/useAvatars";
import { LoadingAnimation } from "../components/Animation";

interface Props {
  isOpen: boolean;
  onClose: (a: boolean) => void;
}

export default function ModalChangeAvatar({ isOpen, onClose }: Props) {
  const { isLoading, avatarsData } = useAvatars();
  const [selected, setSelected] = useState(null);

  const handleSelected = (avatarId: number) => {
    setSelected((prevSelected: number) =>
      prevSelected === avatarId ? null : avatarId
    );
    console.log(selected);
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={() => onClose(false)}
      animationPreset="slide"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Change Avatar</Modal.Header>
        <VStack pb={4}>
          <Box alignItems={"center"} height={380}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={avatarsData}
              numColumns={3}
              keyExtractor={(item) => item.id}
              windowSize={15}
              renderItem={({ item: avatar }) => (
                <Pressable onPress={() => handleSelected(avatar.id)}>
                  <Box
                    py={2}
                    borderWidth="2px"
                    borderColor="black"
                    borderStyle="solid"
                    w="80px"
                    rounded="xl"
                    bg={selected === avatar.id ? "rgba(0,0,0,.7)": "transparent"}
                    margin={2}
                  >
                    <Avatar
                      bg="green.500"
                      alignSelf="center"
                      size="lg"
                      source={{
                        uri: avatar.avatar_url,
                      }}
                    />
                    <Text
                      mt={1}
                      color="#FA9711"
                      fontWeight="semibold"
                      textAlign="center"
                    >
                      {avatar.price === 0 ? (
                        <Text>Free</Text>
                      ) : (
                        <>
                          <Image
                            style={{ width: 12, height: 12 }}
                            alt="logo"
                            source={require("../assets/diamond.png")}
                            mb={10}
                          />
                          <Text>{avatar.price}</Text>
                        </>
                      )}
                    </Text>
                  </Box>
                </Pressable>
              )}
            />
          </Box>
          <HStack mt={4} alignItems="center" justifyContent="center" space={3}>
            <AntDesign name="infocirlceo" size={24} color="#FF0742" />
            <Text color="#EF1F1F" textBreakStrategy="balanced">
              You dont have enough diamonds, you can buy diamond at shop
            </Text>
          </HStack>

          <HStack mt={4} w="full" justifyContent="center" space={4}>
            <Button
              onPress={() => onClose(false)}
              bg="#CF0A0A"
              rounded="lg"
              px={10}
            >
              Cancel
            </Button>
            <Button
              onPress={() => onClose(false)}
              bg="#0ACF83"
              rounded="lg"
              px={10}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </Modal.Content>
    </Modal>
  );
}
