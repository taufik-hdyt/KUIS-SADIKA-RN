import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Modal,
  SimpleGrid,
  Text,
} from "native-base";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: (a: boolean) => void;
}

export default function ModalTopUp({ isOpen, onClose }: Props) {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={() => onClose(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Top Up</Modal.Header>
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
                  <Box display="flex" alignItems="center" >
                    <Image alt="diamond" source={require("../assets/topup/diamond3.png")} />
                  </Box>
                  <Text
                    mt={1}
                    color="#FA9711"
                    fontWeight="semibold"
                    textAlign="center"
                  >
                    20 JT
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            <HStack mt={8} w="full" justifyContent="center" space={4}>
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
