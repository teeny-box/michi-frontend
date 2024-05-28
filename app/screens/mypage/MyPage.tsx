import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Profile } from "@components/mypage/Profile.tsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/authAtoms";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradationButton } from "@/components/common/GradationButton";
import { ListItem } from "@/components/mypage/ListItem";
import { LinkedListItem } from "@/components/mypage/LinkedListItem";
import { MypageRootStackParam } from "../navigation/MyPageStack";
import { authUrl, userUrl } from "@/utils/apiUrls";
import { useAccessToken } from "@/hook/useAccessToken";
import getCurrentAge from "@/utils/getCurrentAge";
import phoneNumberFormat from "@/utils/phoneNumberFormat";
import { useAlert } from "@/hook/useAlert";
import Toast from "react-native-toast-message";

export function MyPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const userData = useRecoilValue(userState);
  const { updateToken, deleteToken, getTokenFromAsyncStorege } = useAccessToken();
  const { setAlertState } = useAlert();

  const logout = async () => {
    const token = await getTokenFromAsyncStorege();
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
      } else if (res.status === 401) {
        const success = await updateToken();
        if (success) logout();
      }
    } catch (err) {
      console.error("logout error : ", err);
    }
  };

  const removeUser = async () => {
    const token = await getTokenFromAsyncStorege();
    try {
      const res = await fetch(`${userUrl}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        await deleteToken();
        return console.log("remove user success");
      } else if (res.status === 401) {
        const success = await updateToken();
        if (success) removeUser();
      }
    } catch (err) {
      console.error("logout error : ", err);
    }
  };

  const handlePressLogoutButton = async () => {
    setAlertState({ open: true, title: "로그아웃 하시겠습니까?", desc: "", onPress: logout, defaultText: "확인" });
  };

  const handlePressWithdrawButton = () => {
    setAlertState({
      open: true,
      title: "정말 탈퇴 하시겠습니까?",
      desc: "탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다.",
      onPress: removeUser,
      defaultText: "확인",
    });
  };

  // const sendToChangeId = () => {
  //   navigation.navigate("changeId");
  // };

  const sendToChangePassword = () => {
    navigation.navigate("changePassword");
  };

  const sendTo이용약관페이지 = () => {
    navigation.navigate("mypage");
  };

  const sendTo개인정보처리방침페이지 = () => {
    Toast.show({ text1: "Toast 테스트중입니다. 놀라지마세요!" });
    navigation.navigate("mypage");
  };

  return (
    <SafeAreaView style={styles.outBox}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity style={styles.button} onPress={handlePressWithdrawButton}>
            <Text style={styles.buttonText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },

  infoBox: {
    backgroundColor: "rgba(112, 0, 255, 0.05)",
  },

  buttonContainer: {
    marginVertical: 40,
    rowGap: 4,
  },

  button: {
    height: 45,
    backgroundColor: "#000",
    marginVertical: 4,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    margin: "auto",
    fontSize: 16,
    fontFamily: "Freesentation-5Medium",
  },
});
