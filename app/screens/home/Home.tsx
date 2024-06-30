import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon6 from "react-native-vector-icons/FontAwesome5";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradationProfile } from "@/components/common/GradationProfile";
import LinearGradient from "react-native-linear-gradient";
import { postsUrl, userUrl } from "@/utils/apiUrls";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/authAtoms";
import { accessTokenState } from "@/recoil/authAtoms";
import { useAlert } from "@/hooks/useAlert";

export type RootStackParam = {
  feedCreat: undefined;
  feedEdit: { postNumber: number };
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Post {
  content: string;
  createdAt: string;
  deletedAt: string | null;
  postNumber: number;
  title: string;
  user: {
    birthYear: string;
    createdAt: string;
    deletedAt: string | null;
    nickname: string;
    phoneNumber: string;
    profileImage: string | null;
    role: string;
    state: string;
    updatedAt: string;
    userId: string;
  };
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

export function Home(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState("피드");
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [onlineUser, setOnlineUser] = useState<Post[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isUnderModalVisible, setIsUnderModalVisible] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // 선택된 게시물
  const [userData] = useRecoilState(userState);
  const { setAlertState } = useAlert();
  const { top, bottom } = useSafeAreaInsets();
  const accessToken = useRecoilValue(accessTokenState);

  useFocusEffect(
    useCallback(() => {
      getPostsData();
    }, []),
  );

  useEffect(() => {
    getOnlineUser();
  }, []);

  const getPostsData = async (): Promise<void | undefined> => {
    try {
      const res = await fetch(postsUrl, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      if (res.status === 200) {
        setPostsData(data.data);
      }
    } catch (err) {
      console.error("getposts error : ", err);
      console.log(err);
    }
  };

  const removePost = async () => {
    try {
      const res = await fetch(`${postsUrl}/${selectedPost?.postNumber}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log("remove post success");
        getPostsData();
      }
    } catch (err) {
      console.error("remove error : ", err);
    }
  };

  const getOnlineUser = async (): Promise<void | undefined> => {
    try {
      const res = await fetch(`${userUrl}/online`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      if (res.status === 200) {
        setOnlineUser(data.data);
      }
    } catch (err) {
      console.error("getposts error : ", err);
      console.log(err);
    }
  };

  const onPressModalOpen = (post: Post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const onPressUnderModalOpen = (post: Post) => {
    setSelectedPost(post);
    setIsUnderModalVisible(true);
  };
  const UnderModalClose = () => {
    setIsUnderModalVisible(false);
  };

  const onPressEdit = (postNumber: number) => {
    setIsUnderModalVisible(false);
    navigation.navigate("feedEdit", { postNumber });
  };

  const onPressDelete = () => {
    setIsUnderModalVisible(false);
    setAlertState({
      open: true,
      title: "해당 피드를 삭제하시겠어요?",
      desc: "삭제된 피드는 복구되지 않습니다.",
      defaultText: "확인",
      onPress: () => removePost(),
      cancelText: "취소",
    });
  };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={styles.container}>
      <View style={[styles.safeArea, { height: top }]}></View>
      <View style={styles.homeHeader}>
        <View style={styles.randomChatBtn}>
          <Text style={styles.randomChatText}>실시간</Text>
          <Text style={styles.randomChatText}>
            랜덤 채팅 START
            <Icon name="doubleright" size={28} />
          </Text>
        </View>
        <Image source={require("@assets/images/logo_home.png")} style={styles.homeLogo} />
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
              {postsData &&
                postsData.map((feed: Post) => (
                  <TouchableHighlight key={feed.postNumber} onPress={() => onPressModalOpen(feed)} underlayColor={"#rgba(112, 0, 255, 0.05)"}>
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
                            {truncateText(feed.user.nickname, 10)} <Icon2 name="sparkles-sharp" size={10} color={"#AB94F7"} />{" "}
                            <Text style={styles.feedText}>1시간 전</Text>
                          </Text>
                          <Text style={styles.feedTitle}>{truncateText(feed.title, 18)}</Text>
                        </View>
                      </View>
                      <View>
                        {userData.userId === feed.user.userId && (
                          <TouchableOpacity onPress={() => onPressUnderModalOpen(feed)}>
                            <Icon name="ellipsis1" size={28} color={"#7000FF"} />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableHighlight>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.writeBtn} onPress={() => navigation.navigate("feedCreat")}>
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
                {onlineUser &&
                  onlineUser.map(user => (
                    <View key={user} style={styles.onlineUser}>
                      <GradationProfile>
                        <View style={styles.onlineUserProfile}>
                          <View>
                            <Icon3 name="user-circle-o" size={76} color={"#fff"} />
                          </View>
                        </View>
                      </GradationProfile>
                      <Text style={styles.onlineUsernickName}>{user.userName}</Text>
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
            {selectedPost && (
              <View style={styles.modalcontentsbox}>
                <View style={styles.modalProfileBox}>
                  <GradationProfile>
                    <View style={styles.modalProfileBox}>
                      <Icon3 name="user-circle-o" size={90} color={"#fff"} />
                    </View>
                  </GradationProfile>
                </View>
                <View style={styles.modalNicknameBox}>
                  <Text style={styles.modalNicknameText}>{selectedPost.user.nickname}</Text>
                  <Text style={styles.modalIsloginText}>
                    접속중 <Icon2 name="sparkles-sharp" size={12} color={"#AB94F7"} /> 1시간전
                  </Text>
                </View>
                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>{selectedPost.title}</Text>
                  <View style={styles.modalContents}>
                    <ScrollView>
                      <Text style={styles.modalContentsText}>{selectedPost.content}</Text>
                    </ScrollView>
                  </View>
                </View>
              </View>
            )}
            <TouchableOpacity style={styles.modalbtn1}>
              <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
                <Text style={styles.modalFooterBtnText}>
                  채팅하기 <Icon6 name="angle-right" size={22} />
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalbtn2} onPress={onPressModalClose}>
              <Text style={styles.modalFooterBtnText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" visible={isUnderModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={UnderModalClose}>
          <View style={styles.underModalOverlay}>
            <View style={[styles.underModalView, { marginBottom: bottom }]}>
              <TouchableOpacity style={styles.underModalBtn1} onPress={() => selectedPost && onPressEdit(selectedPost.postNumber)}>
                <Text>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.underModalBtn2} onPress={() => selectedPost && onPressDelete()}>
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
  safeArea: {
    backgroundColor: "#7000FF",
  },
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
    width: "23%",
    height: "88%",
    marginRight: "5%",
    marginBottom: "1%",
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
    borderWidth: 1,
    borderColor: "#7000FF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalcontentsbox: {
    flex: 4,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalProfileBox: {
    height: 100,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalNicknameBox: {
    alignItems: "center",
    height: 60,
    justifyContent: "space-between",
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
    flex: 1,
    marginTop: 10,
    width: "100%",
  },
  modalTitle: {
    marginTop: 10,
    flex: 0.2,
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
  modalbtn1: {
    flex: 0.4,
    width: "85%",
    marginTop: 15,
    marginBottom: 10,
  },
  modalbtn2: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    backgroundColor: "#9597A4",
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
  underModalView: {
    flex: 1,
    marginTop: SCREEN_HEIGHT * 0.88,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#7000ff",
    borderBottomWidth: 1,
    borderBottomColor: "#7000ff",
  },
  underModalBtn1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#9597a4",
  },
  underModalBtn2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
