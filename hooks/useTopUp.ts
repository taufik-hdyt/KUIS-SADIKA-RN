import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";

export const useTopUp = () => {
  const dataDiamond = [
    { id: 1, price: 30000, qty: 10, image: "https://i.imgur.com/kIaZCmI.png" },
    { id: 2, price: 40000, qty: 15, image: "https://i.imgur.com/YAEULCa.png" },
    { id: 3, price: 50000, qty: 25, image: "https://i.imgur.com/JKVuDl1.png" },
    { id: 4, price: 60000, qty: 35, image: "https://i.imgur.com/bZtsTyf.png" },
    { id: 5, price: 100000, qty: 80, image: "https://i.imgur.com/bP5nmqH.png" },
    {
      id: 6,
      price: 200000,
      qty: 150,
      image: "https://i.imgur.com/bP5nmqH.png",
    },
  ];
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSelected = (id: number) => {
    setSelected((prevSelected: number) => (prevSelected === id ? null : id));
  };

  const selectedDiamond = dataDiamond.find((item) => item.id === selected);

  const data = {
    name: "Taufik",
    email: "taufik1@gmail.com",
    diamond_quantity: selectedDiamond?.qty,
    diamond_price: selectedDiamond?.price,
  };

  const Process = async () => {
    setLoading(true);
    try {
      if (!selected) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "https://mtf1lbjd-5000.asse.devtunnels.ms/api/v1/payment",
        data,
        config
      );

      // Dapatkan payment_url dari respons backend

      if (response.data.payment_url) {
        setLoading(false);
        await WebBrowser.openBrowserAsync(response.data.payment_url);
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

  return {
    loading,
    selected,
    selectedDiamond,
    Process,
    dataDiamond,
    handleSelected,
  };
};
