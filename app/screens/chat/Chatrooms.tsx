import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Dimensions, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import ChatRoomCell from "../../components/chat/chatrooms/ChatroomsCell";
import { RootStackParam } from "../../screens/navigation/chat/ChatStartStackNavigation"; // 경로 수정
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../recoil/authAtoms";

interface ChatRoom {
  id: string;
  title: string;
  lastMessage: string;
  time: Date;
}

export function Chatrooms(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const { height } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();
  const accessToken = useRecoilValue(accessTokenState); // 토큰 가져오기

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    fetchChatRooms(accessToken);
  }, [accessToken]);

  async function fetchChatRooms(token: string) {
    const response = await fetch(`${process.env.BASE_URL}/chatroom`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chat rooms");
    }

    const data = await response.json();
    setChatRooms(data.data);
  }

  async function fetchRandomChatRoom(token: string) {
    const response = await fetch(`${process.env.BASE_URL}/chat/random`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chat room");
    }

    const data = await response.json();
    return data.data; // data.data에 채팅 방 정보가 들어있습니다.
  }

  async function fetchChatRoomMessages(chatroomId: string, token: string) {
    const response = await fetch(`${process.env.BASE_URL}/chat/${chatroomId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chat room messages");
    }

    const data = await response.json();
    return data.data;
  }

  const handlePressRandomChat = async () => {
    try {
      const chatRoomData = await fetchRandomChatRoom(accessToken);
      setChatRooms([...chatRooms, chatRoomData]);
      navigation.navigate("ChatScreen", { room: chatRoomData.title, roomId: chatRoomData.id });
    } catch (error) {
      console.error(error);
      // 오류 처리 로직 추가
    }
  };

  const handlePressChatRoom = async (roomId: string, title: string) => {
    try {
      const messages = await fetchChatRoomMessages(roomId, accessToken);
      navigation.navigate("ChatScreen", { room: title, roomId, messages });
    } catch (error) {
      console.error(error);
      // 오류 처리 로직 추가
    }
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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePressChatRoom(item.id, item.title)}>
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
