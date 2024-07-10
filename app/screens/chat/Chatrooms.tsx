import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Dimensions, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import ChatRoomCell from "../../components/chat/chatrooms/ChatroomsCell";
import { RootStackParam } from "../../screens/navigation/chat/ChatStartStackNavigation"; // 경로 수정

interface ChatRoom {
  title: string;
  lastMessage: string;
  time: Date;
}

export function Chatrooms(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const { height } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const handlePressRandomChat = () => {
    const newChatRoom: ChatRoom = {
      title: `Chat Room ${chatRooms.length + 1}`,
      lastMessage: "New chat started",
      time: new Date(),
    };
    setChatRooms([...chatRooms, newChatRoom]);
    navigation.navigate("ChatScreen", { room: newChatRoom.title });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: top }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? top : 0}>
      <View style={styles.fixedContainer}>
        <TouchableOpacity style={[styles.chatBanner, { height: height * 0.15 }]} onPress={handlePressRandomChat}>
          <Text>실시간 랜덤채팅 배너</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <View style={[styles.searchBar, { height: height * 0.05 }]}>
          <Icon name="search" size={16} style={{ color: "#939398", paddingRight: 4 }} />
          <TextInput placeholder="검색" />
        </View>
        <Text style={styles.textStyle}>새 매칭</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={chatRooms}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("ChatScreen", { room: item.title });
            }}>
            <ChatRoomCell chatRoom={item} />
          </Pressable>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fixedContainer: {
    backgroundColor: "#FFFFFF",
  },
  chatBanner: {
    backgroundColor: "#7000FF",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#F2F5F7",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  textStyle: {
    fontWeight: "bold",
  },
});
