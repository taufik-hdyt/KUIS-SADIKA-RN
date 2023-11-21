import {
  Avatar,
  Box,
  Button,
  HStack,
  Modal,
  SimpleGrid,
  Spinner,
  Text,
  View,
  Image,
} from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAvatars } from "../hooks/useAvatars";
import { AvatarData } from "../screens/ChangeProfile";

interface Props {
  isOpen: boolean;
  onClose: (a: boolean) => void;
}

export default function ModalChangeAvatar({ isOpen, onClose }: Props) {
  const { isLoading, avatarsData } = useAvatars();

  if (isLoading)
    return (
      <View flex={1} justifyContent="center">
        <Spinner size="lg" accessibilityLabel="Loading" />
      </View>
    );

  return (
    <Modal size="xl" isOpen={isOpen} onClose={() => onClose(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Change Avatar</Modal.Header>
        <Modal.Body>
          <Box>
            <SimpleGrid columns={3} space={3} alignItems="center">
              {avatarsData &&
                avatarsData?.data.map((avatar: AvatarData) => (
                  <Box
                    key={avatar.id}
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
                ))}
            </SimpleGrid>

            <HStack
              mt={4}
              alignItems="center"
              justifyContent="center"
              space={3}
            >
              <AntDesign name="infocirlceo" size={24} color="#FF0742" />
              <Text color="#EF1F1F" textBreakStrategy="balanced">
                You don't have enough diamonds, you can buy diamond at shop
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
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
