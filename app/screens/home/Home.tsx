import React, { useState, useCallback, useEffect } from "react";
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
  GestureResponderEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon6 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradationProfile } from "@/components/common/GradationProfile";
import { GradationButton } from "@/components/common/GradationButton";
import { Button } from "@/components/common/Button";
import { postsUrl, userUrl } from "@/utils/apiUrls";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/authAtoms";
import { accessTokenState } from "@/recoil/authAtoms";
import { useAlert } from "@/hooks/useAlert";
import RandomChatBanner from "@/components/home/RandomChatBanner";
import UserProfile from "@/components/common/UserProfile";
import { useSocket } from "@/hooks/useSocket";

export type RootStackParam = {
  feedCreat: undefined;
  feedEdit: { postNumber: number };
  ChatScreen: undefined;
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

interface OnlineUser {
  userId: string;
  nickname: string;
  profileImage?: string | null;
  title: string;
  content: string;
  // 필요한 다른 속성들 추가
}

interface User {
  nickname: string;
  profileImage?: string | null;
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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isUnderModalVisible, setIsUnderModalVisible] = useState<boolean>(false);
  const [isInnerModalVisible, setIsInnerModalVisible] = useState<boolean>(false);
  const [isOnlineModalVisible, setIsOnlineModalVisible] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedOnline, setSelectedOnline] = useState<OnlineUser | null>(null);
  const [userData] = useRecoilState(userState);
  const { setAlertState } = useAlert();
  const { top, bottom } = useSafeAreaInsets();
  const accessToken = useRecoilValue(accessTokenState);
  const { onlineUsers, onlineUserIds } = useSocket();

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPostsData();
    }, []),
  );

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

  const onPressModalOpen = (post: Post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const onPressOnlineModalOpen = (online: any) => {
    setSelectedOnline(online);
    setIsOnlineModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
    setIsInnerModalVisible(false);
  };

  const onPressOnlineModalClose = () => {
    setIsOnlineModalVisible(false);
  };

  const onPressUnderModalOpen = (post: Post) => {
    setSelectedPost(post);
    setIsUnderModalVisible(true);
  };
  const UnderModalClose = () => {
    setIsUnderModalVisible(false);
  };

  const onPressEdit = (postNumber: number) => {
    setIsModalVisible(false);
    setIsInnerModalVisible(false);
    navigation.navigate("feedEdit", { postNumber });
    setIsUnderModalVisible(false);
  };

  const onPressDelete = () => {
    setIsModalVisible(false);
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

  const toggleInnerModal = () => {
    setIsInnerModalVisible(!isInnerModalVisible);
  };

  const onPressInnerDelete = () => {
    setIsModalVisible(false);
    setIsInnerModalVisible(false);
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
      <RandomChatBanner />
      <View style={styles.homeTabBox}>
        <TouchableOpacity style={[styles.homeTab, selectedTab === "피드" ? styles.selectedTab : null]} onPress={() => setSelectedTab("피드")}>
          <Text style={[styles.homeTabText, selectedTab === "피드" ? styles.selectedTabText : null]}>피드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.homeTab, selectedTab === "온라인" ? styles.selectedTab : null]} onPress={() => setSelectedTab("온라인")}>
          <Text style={[styles.homeTabText, selectedTab === "온라인" ? styles.selectedTabText : null]}>온라인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.homeContents}>
        {selectedTab === "피드" ? (
          <View style={styles.feedContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
              {postsData &&
                postsData.map((feed: Post) => (
                  <TouchableHighlight key={feed.postNumber} onPress={() => onPressModalOpen(feed)} underlayColor={"#rgba(112, 0, 255, 0.05)"}>
                    <View style={styles.feed}>
                      <View style={styles.feedContents}>
                        <UserProfile profileImage={feed.user.profileImage} isOnline={onlineUserIds.includes(feed.user.userId)} />
                        <View style={styles.feedInfo}>
                          <Text style={styles.feedNickName}>
                            {truncateText(feed.user.nickname, 10)}
                            <Text style={styles.feedText}></Text>
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
                {onlineUsers &&
                  onlineUsers.map((online, index) => (
                    <TouchableOpacity key={index} style={styles.onlineUser} onPress={() => onPressOnlineModalOpen(online)}>
                      <UserProfile profileImage={online.profileImage} isOnline={onlineUserIds.includes(online.userId)} size="large" />
                      <Text style={styles.onlineUsernickName}>{online.nickname}</Text>
                      <Text style={styles.onlineUserisOnline}>접속중</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              {selectedPost && (
                <View style={styles.modalcontentsbox}>
                  {userData.userId === selectedPost.user.userId && (
                    <TouchableOpacity style={styles.modalMenuBtn} onPress={toggleInnerModal}>
                      <Icon name="ellipsis1" size={32} color={"#7000FF"} />
                    </TouchableOpacity>
                  )}
                  {isInnerModalVisible && (
                    <View style={styles.innerModal}>
                      <TouchableOpacity style={styles.innerModalBtn1} onPress={() => selectedPost && onPressEdit(selectedPost.postNumber)}>
                        <Text>수정</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.innerModalBtn2} onPress={() => selectedPost && onPressInnerDelete()}>
                        <Text>삭제</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={styles.modalProfileBox}>
                    <GradationProfile>
                      <View style={styles.modalProfileBox}>
                        <View style={styles.modalProfileBoxInner}>
                          <Image
                            source={selectedPost.user.profileImage ? { uri: selectedPost.user.profileImage } : require("@assets/images/user_default_image.png")}
                            style={styles.modalProfileImage}
                            alt="프로필 이미지"
                          />
                        </View>
                      </View>
                    </GradationProfile>
                    <View style={styles.isOnline}>
                      {onlineUserIds.includes(selectedPost.user.userId) ? <View style={styles.isOnlineYes}></View> : <View style={styles.isOnlineNo}></View>}
                    </View>
                  </View>
                  <View style={styles.modalNicknameBox}>
                    <Text style={styles.modalNicknameText}>{selectedPost.user.nickname}</Text>
                    <Text style={styles.modalIsloginText}>접속중</Text>
                  </View>
                  <View style={styles.modalBody}>
                    <Text style={styles.modalTitle} numberOfLines={2} ellipsizeMode="tail">
                      {selectedPost.title}
                    </Text>
                    <View style={styles.modalContents}>
                      <ScrollView>
                        <Text style={styles.modalContentsText}>{selectedPost.content}</Text>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              )}
              <TouchableOpacity style={styles.modalbtn1}>
                <GradationButton text="채팅하기" rightIcon={<Icon6 name="angle-right" size={18} color={"white"} />} onPress={onPressModalClose} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalbtn2}>
                <Button onPress={onPressModalClose} text="취소" color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal animationType="fade" visible={isOnlineModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={onPressModalClose}>
          <View style={styles.modalOverlay}>
            <View style={styles.onlineModalView}>
              {selectedOnline && (
                <View style={styles.modalcontentsbox}>
                  <View style={styles.modalProfileBox}>
                    <GradationProfile>
                      <View style={styles.modalProfileBox}>
                        <View style={styles.modalProfileBoxInner}>
                          <Image
                            source={selectedOnline.profileImage ? { uri: selectedOnline.profileImage } : require("@assets/images/user_default_image.png")}
                            style={styles.modalProfileImage}
                            alt="프로필 이미지"
                          />
                        </View>
                      </View>
                    </GradationProfile>
                    <View style={styles.isOnline}>
                      {onlineUserIds.includes(selectedOnline.userId) ? <View style={styles.isOnlineYes}></View> : <View style={styles.isOnlineNo}></View>}
                    </View>
                  </View>
                  <View style={styles.modalNicknameBox}>
                    <Text style={styles.modalNicknameText}>{selectedOnline.nickname}</Text>
                    <Text style={styles.modalIsloginText}>접속중</Text>
                  </View>
                </View>
              )}
              <View style={styles.onlineModalbtnBox}>
                <TouchableOpacity style={styles.onlineModalbtn1}>
                  <GradationButton text="채팅하기" rightIcon={<Icon6 name="angle-right" size={18} color={"white"} />} onPress={onPressOnlineModalClose} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.onlineModalbtn2}>
                  <Button onPress={onPressOnlineModalClose} text="취소" color={"gray"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal animationType="fade" visible={isUnderModalVisible} transparent={true}>
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
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#7000FF",
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
  feedContainer: {
    flex: 1,
  },
  feed: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "6%",
    height: 80,
  },
  feedContents: {
    flex: 1,
    flexDirection: "row",
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
    height: 60,
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
  onlineUsernickName: {
    fontWeight: "600",
    marginVertical: SCREEN_HEIGHT / 200,
  },
  onlineUserisOnline: {
    fontSize: 12,
    fontWeight: "400",
  },
  writeBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: "#111",
    position: "absolute",
    bottom: "4%",
    right: "4%",
    borderRadius: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    flex: 1,
    marginHorizontal: 25,
    marginTop: 100,
    marginBottom: 80,
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
    position: "relative",
  },
  modalMenuBtn: {
    top: 0,
    right: 0,
    position: "absolute",
  },
  modalProfileBox: {
    height: 100,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalProfileBoxInner: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 90,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  modalProfileImage: {
    height: 85,
    width: 85,
    borderRadius: 100,
  },
  isOnline: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
    right: "5%",
    height: 24,
    width: 24,
    backgroundColor: "#AB94F7",
    borderRadius: 100,
  },
  isOnlineYes: {
    height: 18,
    width: 18,
    borderRadius: 100,
    backgroundColor: "#00CF3A",
  },
  isOnlineNo: {
    height: 18,
    width: 18,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  modalNicknameBox: {
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
  },
  modalNicknameText: {
    fontSize: 28,
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
    height: 70,
    fontSize: 24,
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
    fontSize: 14,
  },
  modalbtn1: {
    height: 45,
    width: "85%",
    marginTop: 15,
    marginBottom: 10,
  },
  modalbtn2: {
    height: 45,
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
  onlineModalView: {
    height: 260,
    marginHorizontal: 25,
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
  onlineModalbtnBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineModalbtn1: {
    height: 45,
    width: "40%",
    marginRight: 7,
    marginBottom: 20,
  },
  onlineModalbtn2: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    backgroundColor: "#9597A4",
    marginLeft:7,
    marginBottom: 20,
  },
  innerModal: {
    top: 30,
    right: 0,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7000ff",
  },
  innerModalBtn1: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 35,
    borderBottomWidth: 1,
    borderColor: "#rgba(112, 0, 255, 0.2)",
  },
  innerModalBtn2: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 35,
  },
  underModalOverlay: {
    flex: 2,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  underModalView: {
    height: 100,
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
