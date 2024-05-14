import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Profile } from "@components/mypage/Profile.tsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { removeAsyncStorage } from "@/storage/AsyncStorage";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/authAtoms";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradationButton } from "@/components/common/GradationButton";
import { ListItem } from "@/components/mypage/ListItem";
import { LinkedListItem } from "@/components/mypage/LinkedListItem";
import { MypageRootStackParam } from "../navigation/MyPageStack";

export function MyPage() {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const setToken = useSetRecoilState(tokenState);

  const logout = () => {
    setToken("");
    removeAsyncStorage("token");
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
          <ListItem label="출생년도" value={"2000년 생 (만 24세)"} />
          <ListItem label="전화번호" value={"010-7744-0745"} />
          <LinkedListItem label="아이디" value={"qwe123"} onPressIn={sendToChangeId} showIcon={true} />
          <LinkedListItem label="비밀번호" value={"재설정"} onPressIn={sendToChangePassword} showIcon={true} />
        </View>

        <View>
          <LinkedListItem label="이용약관" onPressIn={sendTo이용약관페이지} />
          <LinkedListItem label="개인정보 처리방침" onPressIn={sendTo개인정보처리방침페이지} />
          <ListItem label="앱 버전" value={"1.0.0"} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPressIn={handlePressLogoutButton}>
            <GradationButton text="로그아웃" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPressIn={handlePressWithdrawButton}>
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
    padding: 25,
    backgroundColor: "#fff",
  },

  infoBox: {
    marginBottom: 20,
    backgroundColor: "rgba(112, 0, 255, 0.05)",
  },

  arrowIcon: {
    marginLeft: 14,
  },

  buttonContainer: {
    marginTop: 40,
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
