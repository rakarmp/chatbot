import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [textInput, setTextInput] = useState("");

  const handleSend = async () => {
    const prompt = textInput;

    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const text = response.data.choices[0].text;
      const message = {
        type: "user",
        text: textInput,
      };
      const botMessage = {
        type: "bot",
        text: text,
      };

      setData([...data, message, botMessage]);
      setTextInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
        renderItem={({ item }) => (
          <View
            style={
              item.type === "user"
                ? styles.userMessageContainer
                : styles.botMessageContainer
            }
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Tulis apa saja..."
          placeholderTextColor="#777777"
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  chatContainer: {
    padding: 16,
  },
  userMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#DCF8C5",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  botMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#25D366",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChatGPT;
