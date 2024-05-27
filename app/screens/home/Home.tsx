import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradationProfile } from "@/components/common/GradationProfile";

export type RootStackParam = {
  feedEdit: undefined;
};

const feedData = [
  { id: "1", nickName: "제로콜라파괴자", title: "심심한데 끝말잇기하고 쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "2", nickName: "제로콜", title: "심심한데 ", content: "규칙" },
  { id: "3", nickName: "제", title: " 끝말잇기하고 쫑하실분", content: " 없음 비매너 사절ㅡㅡ^" },
  { id: "4", nickName: "파괴자", title: "심심한데 끝말잇기하고 쫑하실분", content: "한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "5", nickName: "제로콜라파괴자", title: "심심한데 끝말잇쫑하실분", content: "규" },
  { id: "6", nickName: "제파괴자", title: "심심고 쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "7", nickName: "제로콜라파괴자", title: "한데 끝말잇기하고 쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "8", nickName: "제로콜라파괴자", title: "심심한데 끝말잇기하고 쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "9", nickName: "제로콜라파괴자", title: "심심한데 끝말", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "10", nickName: "제로콜라파괴자", title: "심말잇기하고 쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "11", nickName: "제로콜라파괴자", title: "심기하고 쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "12", nickName: "제로콜라파괴자", title: "실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "13", nickName: "제로콜라파괴자", title: "심심한데 끝말", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "14", nickName: "제로콜라파괴자", title: "심심한데  쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "15", nickName: "제로콜라파괴자", title: "심분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  { id: "16", nickName: "제로콜라파괴자", title: "심 쫑하실분", content: "규칙 세글자 한방단어 없음 비매너 사절ㅡㅡ^" },
  // Add more data as needed
];

const onlineUserData = [
  { id: "1", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "2", nickName: "제로콜", isOnline: "접속중" },
  { id: "3", nickName: "제", isOnline: " 접속중" },
  { id: "4", nickName: "파괴자", isOnline: "접속중" },
  { id: "5", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "6", nickName: "제파괴자", isOnline: "접속중" },
  { id: "7", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "8", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "9", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "10", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "11", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "12", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "13", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "14", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "15", nickName: "제로콜라파괴자", isOnline: "접속중" },
  { id: "16", nickName: "제로콜라파괴자", isOnline: "접속중" },
  // Add more data as needed
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function Home(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState("피드");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <View style={styles.randomChatBtn}>
          <Text style={styles.randomChatText}>실시간</Text>
          <Text style={styles.randomChatText}>
            랜덤 채팅 START
            <Icon name="doubleright" size={28} />
          </Text>
        </View>
      </View>
      <View style={styles.homeTabBox}>
        <TouchableOpacity style={styles.homeTab} onPress={() => setSelectedTab("피드")}>
          <Text style={[styles.homeTabText, selectedTab === "피드" ? styles.selectedTabText : null]}>피드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeTab} onPress={() => setSelectedTab("온라인")}>
          <Text style={[styles.homeTabText, selectedTab === "온라인" ? styles.selectedTabText : null]}>온라인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.homeContents}>
        {selectedTab === "피드" ? (
          <View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
              {feedData.map(feed => (
                <TouchableOpacity key={feed.id}>
                  <View style={styles.feed}>
                    <View style={styles.feedContents}>
                      <GradationProfile>
                        <View style={styles.feedProfile}>
                          <Icon3 name="user-circle-o" size={46} color={"#fff"} />
                        </View>
                      </GradationProfile>
                      <View style={styles.feedInfo}>
                        <Text style={styles.feedNickName}>
                          {feed.nickName} <Icon2 name="sparkles-sharp" size={10} color={"#AB94F7"} /> <Text style={styles.feedText}>1시간 전</Text>
                        </Text>
                        <Text style={styles.feedTitle}>{feed.title}</Text>
                        <Text style={styles.feedText}>{feed.content}</Text>
                      </View>
                    </View>
                    <View>
                      <Icon name="ellipsis1" size={28} color={"#7000FF"} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.writeBtn} onPressIn={() => navigation.navigate("feedEdit")}>
              <Icon4 name="square-edit-outline" size={32} color={"#fff"} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.onlineBanner}>
              <Text>지금 접속중인 사람들과 채팅을 즐길 수 있어요!</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
              <View style={styles.onlineUserContainer}>
                {onlineUserData.map(user => (
                  <View key={user.id} style={styles.onlineUser}>
                    <GradationProfile>
                      <View style={styles.onlineUserProfile}>
                        <View>
                          <Icon3 name="user-circle-o" size={76} color={"#fff"} />
                        </View>
                      </View>
                    </GradationProfile>
                    <Text style={styles.onlineUsernickName}>{user.nickName}</Text>
                    <Text style={styles.onlineUserisOnline}>{user.isOnline}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  homeHeader: {
    flex: 2,
    width: "100%",
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
    fontSize: 28,
    fontWeight: "600",
  },
  homeTabBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#282828",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  homeTab: {
    marginLeft: "6%",
  },
  homeTabText: { fontSize: 26, fontWeight: "700", color: "#aaa" },
  selectedTabText: {
    color: "#000",
  },
  homeContents: {
    flex: 9,
    width: "100%",
  },
  scrollView: {},
  feed: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "6%",
    height: SCREEN_HEIGHT / 11,
  },
  feedContents: {
    flex: 1,
    flexDirection: "row",
  },
  feedProfile: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_HEIGHT / 16,
    borderRadius: 100,
  },
  feedInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "3%",
  },
  feedNickName: {
    fontSize: 12,
    fontWeight: "700",
  },
  feedTitle: {
    marginTop: "2%",
    marginBottom: "0.5%",
    fontSize: 14,
    fontWeight: "400",
  },
  feedText: {
    fontSize: 12,
    fontWeight: "200",
  },
  onlineBanner: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 15,
    backgroundColor: "rgba(112, 0, 255, 0.05)",
  },
  onlineUserContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: SCREEN_WIDTH * 0.9,
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  onlineUser: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT / 6.5,
    marginVertical: SCREEN_HEIGHT / 200,
  },
  onlineUserProfile: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT / 10,
    width: SCREEN_HEIGHT / 10,
    borderRadius: 100,
  },
  onlineUsernickName: {
    fontWeight: "600",
    marginVertical: SCREEN_HEIGHT / 200,
  },
  onlineUserisOnline: {
    fontWeight: "400",
  },
  writeBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_HEIGHT / 18,
    height: SCREEN_HEIGHT / 18,
    backgroundColor: "#111",
    position: "absolute",
    bottom: "3%",
    right: "3%",
    borderRadius: 100,
  },
});
