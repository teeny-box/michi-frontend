import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform, FlatList, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import io from "socket.io-client";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/authAtoms";
import TextInputComponent from "../../components/chat/chatscreen/TextInputComponent";

type ChatScreenParams = {
  route: {
    params: {
      navigation: any;
      room: string;
    };
  };
};

type Navigation = NativeStackHeaderProps & ChatScreenParams;

type Message = {
  type: string;
  user: string;
  message: string;
  room: string;
};

export default function ChatScreen({ route }: Navigation) {
  const [messageText, setMessageText] = useState("");
  const [serverMessages, setServerMessages] = useState<Message[]>([]);
  const webSocket = useRef(null);
  const { nickname } = useRecoilValue(userState); // Recoil에서 user 값을 구조 분해하여 nickname만 가져옴
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    webSocket.current = io(`${process.env.BASE_URL}`);

    webSocket.current.on("connect", () => {
      let message = {
        type: "Welcome",
        user: nickname,
        message: `${nickname} 님이 입장하셨습니다.`,
        room: route.params.room,
      };

      webSocket.current.emit("welcome", message);
      console.log("Connected Server");
    });

    webSocket.current.on("message", (e: Message) => {
      console.log(nickname, "message", e);
      setServerMessages(prevMessages => [...prevMessages, e]);
    });

    webSocket.current.on("welcome", (e: Message) => {
      console.log("welcome", e);
      setServerMessages(prevMessages => [...prevMessages, e]);
    });

    webSocket.current.on("leave", (e: Message) => {
      setServerMessages(prevMessages => [...prevMessages, e]);
    });

    webSocket.current.on("error", e => {
      console.log(e.message);
    });

    webSocket.current.on("disconnect", e => {
      console.log("Disconnected. Check internet or server.");
    });

    return () => {
      let message = {
        type: "Leave",
        user: nickname,
        message: `${nickname} 님이 퇴장하셨습니다.`,
        room: route.params.room,
      };
      webSocket.current.emit("leave", message);
      webSocket.current.disconnect();
    };
  }, [nickname, route.params.room]);

  const sendMessage = () => {
    let message = {
      type: "Chat",
      user: nickname,
      message: messageText,
      room: route.params.room,
    };
    webSocket.current.emit("message", message);
    setMessageText("");
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text>
        {item.user}: {item.message}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: top }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 0}>
      <FlatList data={serverMessages} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.scrollContent} />
      <View style={styles.inputContainer}>
        <TextInputComponent messageText={messageText} setMessageText={setMessageText} sendMessage={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  inputContainer: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: "#ffffff",
  },
});
