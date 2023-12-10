import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  Pressable,
  SimpleGrid,
  Text,
} from "native-base";
import React from "react";
import { formatRupiah } from "../utils/utils";
import { useTopUp } from "../hooks/useTopUp";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalTopUpDiamond = ({ isOpen, onClose }: IProps) => {
  const { Process, dataDiamond, handleSelected, selected, loading } =
    useTopUp();

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>Top Up</Modal.Header>
        <Modal.CloseButton />
        <Modal.Body>
          {!selected && (
            <Text
              bg="red.500"
              rounded="lg"
              mb={3}
              color="white"
              textAlign="center"
            >
              Please choose the diamond!!!
            </Text>
          )}
          <SimpleGrid columns={3} space={3} alignItems="center">
            {dataDiamond?.map((e, idx) => (
              <Pressable key={idx} onPress={() => handleSelected(e.id)}>
                <Box
                  w="90px"
                  p={1}
                  justifyContent="center"
                  alignItems="center"
                  borderColor={selected === e.id ? "green.500" : "black"}
                  borderWidth={selected === e.id ? 2 : 1}
                  borderStyle="solid"
                  rounded="lg"
                  bg={selected === e.id ? "rgba(0,0,0,.5)" : "transparent"}
                >
                  <Text
                    color={selected === e.id ? "white" : "black"}
                    fontWeight="bold"
                  >
                    {e.qty}
                  </Text>
                  <Image
                    resizeMode="contain"
                    size="xs"
                    alt="diamond"
                    mt={1}
                    source={{ uri: e.image }}
                  />
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color={selected === e.id ? "white" : "black"}
                    mt={1}
                  >
                    {formatRupiah(e.price)}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </SimpleGrid>
        </Modal.Body>

        <Modal.Footer>
          <HStack space={3}>
            <Button onPress={onClose} rounded="xl" bg="red.500">
              Cancel
            </Button>
            <Button
              isDisabled={!selected}
              onPress={() => Process()}
              rounded="xl"
              bg="green.500"
              isLoading={loading}
            >
              Purchase
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalTopUpDiamond;
