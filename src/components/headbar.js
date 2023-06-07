import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#25D366",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HeaderBar;
