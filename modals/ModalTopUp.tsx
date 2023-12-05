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
import React, { useState } from "react";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { formatRupiah } from "../utils/utils";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalTopUpDiamond = ({ isOpen, onClose }: IProps) => {
  const dataDiamond = [
    { id: 1, price: 30000, qty: 10, image: "https://i.imgur.com/kIaZCmI.png" },
    { id: 2, price: 40000, qty: 15, image: "https://i.imgur.com/YAEULCa.png" },
    { id: 3, price: 50000, qty: 25, image: "https://i.imgur.com/JKVuDl1.png" },
    { id: 4, price: 60000, qty: 35, image: "https://i.imgur.com/bZtsTyf.png" },
    { id: 5, price: 100000, qty: 80, image: "https://i.imgur.com/bP5nmqH.png" },
    { id: 6, price: 200000, qty: 150, image: "https://i.imgur.com/bP5nmqH.png" },
  ];

  // state
  const [selected, setSelected] = useState(null);

  // handle selected diamond
  const handleSelected = (id: number) => {
    setSelected((prevSelected: number) => (prevSelected === id ? null : id));
  };

  const selectedDiamond = dataDiamond.find((item) => item.id === selected);

  const data = {
    name: "Taufik",
    email: "taufikhdyt@gmail.com",
    gross_amount: selectedDiamond?.price,
  };


  // setHeader
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const Process = async () => {
    try {
      if (!selected) {
        return;
      }
      const response = await axios.post(
        "http://192.168.18.111:5000/api/v1/payment",
        data,
        config
      );

      // Dapatkan payment_url dari respons backend
      if (response.data.data.payment_url) {
        onClose();
        await WebBrowser.openBrowserAsync(response.data.data.payment_url);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "transaction_details.order_id sudah digunakan"
      ) {
        console.error(
          "Order ID sudah digunakan. Silakan coba lagi dengan Order ID yang berbeda."
        );
      } else {
        console.error(error);
      }
    }
  };

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
            <Button isDisabled={!selected} onPress={() => Process()} rounded="xl" bg="green.500">
              Purchase
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalTopUpDiamond;
