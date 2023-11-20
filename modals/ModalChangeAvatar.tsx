import {
  Avatar,
  Box,
  Button,
  HStack,
  Modal,
  SimpleGrid,
  Text,
} from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  isOpen: boolean;
  onClose: (a: boolean) => void;
}

export default function ModalChangeAvatar({ isOpen, onClose }: Props) {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={() => onClose(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Change Avatar</Modal.Header>
        <Modal.Body>
          <Box>
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

            <HStack mt={4} alignItems="center" justifyContent="center" space={3} >
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
