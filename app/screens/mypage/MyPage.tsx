import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Profile } from "@components/mypage/Profile.tsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/authAtoms";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GradationButton } from "@/components/common/GradationButton";
import { ListItem } from "@/components/mypage/ListItem";
import { LinkedListItem } from "@/components/mypage/LinkedListItem";
import { MypageRootStackParam } from "../navigation/MyPageStack";
import { authUrl, userUrl } from "@/utils/apiUrls";
import { useAccessToken } from "@/hooks/useAccessToken";
import getCurrentAge from "@/utils/getCurrentAge";
import phoneNumberFormat from "@/utils/phoneNumberFormat";
import { useAlert } from "@/hooks/useAlert";
import Toast from "react-native-toast-message";
import { Button } from "@/components/common/Button";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import { useEffect } from "react";

export function MyPage() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const userData = useRecoilValue(userState);
  const { updateToken, deleteToken, getAccessTokenFromAsyncStorage } = useAccessToken();
  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();
  const { setAlertState } = useAlert();

  const logout = async () => {
    const token = await getAccessTokenFromAsyncStorage();
    try {
      const res = await fetch(`${authUrl}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("logout accessToken : ", token);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        await deleteToken();
        return console.log("logout success");
      } else if (res.status === 401 && data.errorCode === "1010") {
        const success = await updateToken();
        if (success) logout();
        return;
      }
    } catch (err) {
      console.error("logout error : ", err);
    }
    Toast.show({ text1: "로그아웃 실패. 잠시 후 다시 시도해주세요." });
  };

  const removeUser = async () => {
    const token = await getAccessTokenFromAsyncStorage();
    try {
      const res = await fetch(`${userUrl}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        await deleteToken();
        return console.log("remove user success");
      } else if (res.status === 401 && data.errorCode === "1010") {
        const success = await updateToken();
        if (success) removeUser();
        return;
      }
    } catch (err) {
      console.error("logout error : ", err);
    }
    Toast.show({ text1: "회원 탈퇴 실패. 잠시 후 다시 시도해주세요." });
  };

  const handlePressLogoutButton = async () => {
    setAlertState({
      open: true,
      title: "로그아웃 하시겠습니까?",
      desc: "현재 기기에서만 로그아웃 됩니다.",
      onPress: logout,
      defaultText: "확인",
      cancelText: "취소",
    });
  };

  const handlePressWithdrawButton = () => {
    setAlertState({
      open: true,
      title: "정말 탈퇴 하시겠습니까?",
      desc: "탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다.",
      onPress: removeUser,
      defaultText: "확인",
      cancelText: "취소",
    });
  };

  // const sendToChangeId = () => {
  //   navigation.navigate("changeId");
  // };

  const sendToChangePassword = () => {
    navigation.navigate("changePassword");
  };

  const sendTo이용약관페이지 = () => {
    openLoadingScreen();
    setTimeout(() => {
      closeLoadingScreen();
    }, 5000);
    navigation.navigate("mypage");
  };

  const sendTo개인정보처리방침페이지 = () => {
    Toast.show({ text1: "Toast 테스트중입니다. 놀라지마세요!" });
    navigation.navigate("mypage");
  };

  return (
    <>
      <View style={{ paddingTop: top }}>
        <StatusBar backgroundColor={"#F8F2FF"} />
        <View style={styles.topNav}>
          <Text style={styles.navText}>마이페이지</Text>
        </View>
      </View>
      <View style={[styles.outBox]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerBox}>
            <Profile />
            <View style={styles.infoBox}>
              <ListItem
                label="출생년도"
                value={userData.birthYear ? `${userData.birthYear} (만 ${getCurrentAge(userData.birthYear)}세)` : ""}
                borderBottomColor="#fff"
              />
              <ListItem label="전화번호" value={userData.phoneNumber ? phoneNumberFormat(userData.phoneNumber) : ""} borderBottomColor="#fff" />
              <ListItem label="아이디" value={userData.userId?.slice(0, -2) + "**" || ""} borderBottomColor="#fff" />
              <LinkedListItem label="비밀번호" value={"재설정"} onPress={sendToChangePassword} color="purple" />
            </View>

            <View>
              <LinkedListItem label="이용약관" onPress={sendTo이용약관페이지} />
              <LinkedListItem label="개인정보 처리방침" onPress={sendTo개인정보처리방침페이지} />
              <ListItem label="앱 버전" value={"1.0.0"} borderBottomColor="#E8ECF1" />
            </View>

            <View style={styles.buttonContainer}>
              <GradationButton text="로그아웃" onPress={handlePressLogoutButton} />
              <Button text="회원탈퇴" onPress={handlePressWithdrawButton} />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topNav: {
    height: 65,
    backgroundColor: "#F8F2FF",
    borderBlockColor: "#7000ff",
    borderBottomWidth: 1,
  },

  navText: {
    fontFamily: "JalnanGothic",
    fontSize: 24,
    color: "#7000ff",
    lineHeight: 65,
    marginLeft: 25,
  },

  outBox: {
    flex: 1,
    backgroundColor: "#fff",
  },

  innerBox: {
    paddingHorizontal: 25,
  },

  infoBox: {
    backgroundColor: "#F8F2FF",
  },

  buttonContainer: {
    marginVertical: 40,
    rowGap: 8,
  },
});
