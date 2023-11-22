// CustomKeyboard.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomKeyboard = ({ onKeyPress }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M","⌫"],
  ];

  return (
    <View style={styles.keyboardContainer}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 3
  },
  key: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    backgroundColor: "white",
    minWidth: 30,
    
  },
  keyText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default CustomKeyboard;