import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { userState, accessTokenState } from "../../recoil/authAtoms";
import { socketState } from "../../recoil/socketAtom";
import TextInputComponent from "../../components/chat/chatscreen/TextInputComponent";

type ChatScreenParams = {
  route: {
    params: {
      navigation: any;
      room: string;
      roomId: string;
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
  const socket = useRecoilValue(socketState);
  const { nickname } = useRecoilValue(userState);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected Server");
        const joinMessage = {
          type: "join",
          chatroomId: route.params.roomId,
        };
        socket.emit("join", joinMessage);
      });

      socket.on("onJoin", (e: any) => {
        console.log("User Joined:", e);
        setServerMessages(prevMessages => [...prevMessages, { type: "join", ...e.data }]);
      });

      socket.on("onLeave", (e: any) => {
        console.log("User Left:", e);
        setServerMessages(prevMessages => [...prevMessages, { type: "leave", ...e }]);
      });

      socket.on("onMessage", (e: any) => {
        console.log("Received message:", e);
        setServerMessages(prevMessages => [...prevMessages, { type: "message", ...e.data }]);
      });

      socket.on("disconnect", reason => {
        console.log(`Disconnected. Reason: ${reason}`);
      });

      socket.on("error", error => {
        console.log(`Socket error: ${error}`);
      });

      return () => {
        const leaveMessage = {
          type: "leave",
          chatroomId: route.params.roomId,
        };
        socket.emit("leave", leaveMessage);
        socket.disconnect();
      };
    }
  }, [socket, route.params.roomId]);

  const sendMessage = () => {
    if (messageText.trim() === "") return;

    if (socket) {
      const chatMessage = {
        type: "message",
        message: messageText,
        messageType: "chat",
        chatroomId: route.params.roomId,
      };
      socket.emit("message", chatMessage);
    }
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
