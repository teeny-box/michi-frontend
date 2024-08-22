import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../recoil/authAtoms";
import { RootStackParam } from "../../screens/navigation/chat/ChatStartStackNavigation";

const RandomChatBanner: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const accessToken = useRecoilValue(accessTokenState);

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


  const handlePressRandomChat = async () => {
    if (!accessToken) {
        console.error("Access token is not available.");
        return;
      }
    try {
      const chatRoomData = await fetchRandomChatRoom(accessToken);
      navigation.navigate("ChatScreen", { room: chatRoomData.title, roomId: chatRoomData.id });
    } catch (error) {
      console.error(error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <TouchableOpacity style={styles.homeHeader} onPress={handlePressRandomChat}>
      <View style={styles.randomChatBtn}>
        <Text style={styles.randomChatText}>실시간</Text>
        <Text style={styles.randomChatText}>
          랜덤 채팅 START
          <Icon name="doubleright" size={28} />
        </Text>
      </View>
      <Image source={require('@assets/images/logo_home.png')} style={styles.homeLogo} />
    </TouchableOpacity>
  );
};

export default RandomChatBanner;

const styles = StyleSheet.create({
  homeHeader: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    backgroundColor: "#7000FF",
  },
  randomChatBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginVertical: "3%",
    marginLeft: "5%",
    backgroundColor: "#7000FF",
  },
  randomChatText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "600",
  },
  homeLogo: {
    width: "20%",
    height: "75%",
    marginRight: "5%",
    marginBottom: "1%",
  },
});