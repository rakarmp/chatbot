import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ChatGPT from "./src";
import HeaderBar from "./src/components/headbar";

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <ChatGPT />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
