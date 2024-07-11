import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ChatRoomCellParams {
  chatRoom: ChatRoom;
}

export default function ChatRoomCell({ chatRoom }: ChatRoomCellParams) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {chatRoom.title} </Text>
      <Text style={styles.message}> {chatRoom.lastMessage} </Text>
      <Text style={styles.time}>{chatRoom.time ? chatRoom.time.toDateString() : "No date available"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  message: {
    fontSize: 16,
    color: "black",
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 14,
    color: "#D3D3D3",
  },
});
