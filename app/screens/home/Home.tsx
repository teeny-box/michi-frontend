import React, { useState, useEffect } from "react";
import { Modal, Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon5 from "react-native-vector-icons/Feather";
import Icon6 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradationProfile } from "@/components/common/GradationProfile";
import LinearGradient from "react-native-linear-gradient";

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isUnderModalVisible, setIsUnderModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    console.log("모달을 여는 중입니다.");
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const onPressUnderModalOpen = () => {
    console.log("모달을 여는 중입니다.");
    setIsUnderModalVisible(true);
  };

  const onPressUnderModalClose = () => {
    setIsUnderModalVisible(false);
  };

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
                <TouchableHighlight key={feed.id} onPress={onPressModalOpen} underlayColor={"#rgba(112, 0, 255, 0.05)"}>
                  <View style={styles.feed}>
                    <View style={styles.feedContents}>
                      <View style={styles.feedProfile}>
                        <GradationProfile>
                          <View style={styles.feedProfile}>
                            <Icon3 name="user-circle-o" size={46} color={"#fff"} />
                          </View>
                        </GradationProfile>
                      </View>
                      <View style={styles.feedInfo}>
                        <Text style={styles.feedNickName}>
                          {feed.nickName} <Icon2 name="sparkles-sharp" size={10} color={"#AB94F7"} /> <Text style={styles.feedText}>1시간 전</Text>
                        </Text>
                        <Text style={styles.feedTitle}>{feed.title}</Text>
                        <Text style={styles.feedText}>{feed.content}</Text>
                      </View>
                    </View>
                    <View>
                      <Icon name="ellipsis1" size={28} color={"#7000FF"} onPress={onPressUnderModalOpen} />
                    </View>
                  </View>
                </TouchableHighlight>
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
        <Modal animationType="fade" visible={isModalVisible} transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <View style={styles.modalBtnContainer}>
                  <Icon5 name="x" size={26} color={"#7000ff"} onPress={onPressModalClose} />
                </View>
                <View style={styles.modalHeader}>
                  <View style={styles.modalProfileBox}>
                    <GradationProfile>
                      <View style={styles.modalProfileBox}>
                        <Icon3 name="user-circle-o" size={90} color={"#fff"} />
                      </View>
                    </GradationProfile>
                    <View style={styles.modalNicknameBox}>
                      <Text style={styles.modalNicknameText}>낚곱새의여왕</Text>
                      <Text style={styles.modalIsloginText}>접속중</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.modalBody}>
                  <Text>
                    <Icon2 name="sparkles-sharp" size={12} color={"#AB94F7"} /> 1시간전
                  </Text>
                  <Text style={styles.modalTitle}>나 낚곱새의 여왕이 말하노니 제목은 26자까지 가능하노라</Text>
                  <View style={styles.modalContents}>
                    <ScrollView>
                      <Text style={styles.modalContentsText}>
                        그것이 문제로다. 밥넣어도 맛있고 면 넣어도 맛있는데 둘 다 먹기엔 내 배가 작아서 하나만 선택할 수 있다는 사실이 너무나도 서럽다. 누가
                        와서 나의 고민을 최종 컨펌해달라. 같이 밥먹으면 더 좋고 ^_^ 내용이 많이 길어진다면 화면을 위로 밀어서 내용을 더 볼 수 있게 스크롤을
                        사용해도 좋을 거
                        같아요채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기채팅하기기채팅하기채팅하기
                      </Text>
                    </ScrollView>
                  </View>
                </View>
                <TouchableOpacity style={styles.modalFooter}>
                  <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
                    <Text style={styles.modalFooterBtnText}>
                      채팅하기 <Icon6 name="angle-right" size={22} />
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      <Modal animationType="slide" visible={isUnderModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={onPressUnderModalClose}>
          <View style={styles.underModalOverlay}>
            <View style={styles.UnderModalView}>
              <TouchableOpacity style={styles.UnderModalBtn1}>
                <Text>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.UnderModalBtn2}>
                <Text>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    height: 52,
    width: 52,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    flex: 1,
    marginHorizontal: SCREEN_WIDTH * 0.06,
    marginTop: SCREEN_HEIGHT * 0.2,
    marginBottom: SCREEN_HEIGHT * 0.15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtnContainer: {
    flex: 0.3,
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modalHeader: {
    flex: 1,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalProfileBox: {
    height: 100,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalNicknameBox: {
    width: 180,
    height: 60,
    justifyContent: "space-between",
    marginLeft: 15,
  },
  modalNicknameText: {
    fontSize: 30,
    fontFamily: "Freesentation-6SemiBold",
  },
  modalIsloginText: {
    color: "#141414",
    fontFamily: "Freesentation-4Regular",
  },
  modalBody: {
    flex: 3,
    marginTop: 10,
    width: "85%",
  },
  modalTitle: {
    marginTop: 10,
    marginBottom: 10,
    flex: 0.3,
    fontSize: 26,
    fontFamily: "Freesentation-6SemiBold",
  },
  modalContents: {
    flex: 1,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E8ECF1",
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECF1",
  },
  modalContentsText: {
    fontSize: 16,
  },
  modalFooter: {
    flex: 0.4,
    width: "85%",
    marginTop: 15,
    marginBottom: 20,
  },
  linearGradient: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalFooterBtnText: {
    fontSize: 24,
    fontFamily: "Freesentation-5Medium",
    color: "#ffffff",
  },
  underModalOverlay: {
    flex: 1,
  },
  UnderModalView: {
    flex: 1,
    marginTop: SCREEN_HEIGHT * 0.9,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#7000ff",
    borderBottomWidth: 1,
    borderBottomColor: "#7000ff",
  },
  UnderModalBtn1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#9597a4",
  },
  UnderModalBtn2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
