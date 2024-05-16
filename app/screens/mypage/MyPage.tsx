import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Profile } from "@components/mypage/Profile.tsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { removeAsyncStorage } from "@/storage/AsyncStorage";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/recoil/authAtoms";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradationButton } from "@/components/common/GradationButton";
import { ListItem } from "@/components/mypage/ListItem";
import { LinkedListItem } from "@/components/mypage/LinkedListItem";
import { MypageRootStackParam } from "../navigation/MyPageStack";
import { authUrl } from "@/utils/apiUrls";

export function MyPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const logout = async () => {
    try {
      const res = await fetch(`${authUrl}/logout`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.ok) {
        setAccessToken("");
        removeAsyncStorage("accessToken");
        removeAsyncStorage("refreshToken");
        return console.log("success");
      }
      console.log("fail");
    } catch (err) {
      console.error("logout error : ", err);
    }
  };

  const removeUser = () => {
    // 회원탈퇴
  };

  const handlePressLogoutButton = () => {
    Alert.alert("로그아웃 하시겠습니까?", "", [{ text: "OK", onPress: logout }, { text: "Cancle" }]);
  };

  const handlePressWithdrawButton = () => {
    Alert.alert("정말 탈퇴 하시겠습니까?", "탈퇴 시 모든 데이터가 삭제되며, 복구할 수 없습니다.", [{ text: "OK", onPress: removeUser }, { text: "Cancle" }]);
  };

  const sendToChangeId = () => {
    navigation.navigate("changeId");
  };

  const sendToChangePassword = () => {
    navigation.navigate("changePassword");
  };

  const sendTo이용약관페이지 = () => {
    navigation.navigate("mypage");
  };

  const sendTo개인정보처리방침페이지 = () => {
    navigation.navigate("mypage");
  };

  return (
    <SafeAreaView style={styles.outBox}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile />
        <View style={styles.infoBox}>
          <ListItem label="출생년도" value={"2000년 생 (만 24세)"} borderBottomColor="#fff" />
          <ListItem label="전화번호" value={"010-7744-0745"} borderBottomColor="#fff" />
          <LinkedListItem label="아이디" value={"qwe123"} onPress={sendToChangeId} color="purple" />
          <LinkedListItem label="비밀번호" value={"재설정"} onPress={sendToChangePassword} color="purple" />
        </View>

        <View>
          <LinkedListItem label="이용약관" onPress={sendTo이용약관페이지} />
          <LinkedListItem label="개인정보 처리방침" onPress={sendTo개인정보처리방침페이지} />
          <ListItem label="앱 버전" value={"1.0.0"} borderBottomColor="#E8ECF1" />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePressLogoutButton}>
            <GradationButton text="로그아웃" />
          </TouchableOpacity>
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

  arrowIcon: {
    marginLeft: 14,
  },

  buttonContainer: {
    marginVertical: 40,
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
