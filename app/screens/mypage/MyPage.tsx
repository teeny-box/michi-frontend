import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Profile } from "@components/mypage/Profile.tsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EntypoIcon from "react-native-vector-icons/Entypo";

export type RootStackParam = {
  changeId: undefined;
  changePassword: undefined;
};

export function MyPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={styles.outBox}>
      <Profile />
      <View>
        <View style={styles.list}>
          <Text style={styles.listTitle}>출생년도</Text>
          <Text style={styles.listText}>2000(만 24세)</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.listTitle}>핸드폰 번호</Text>
          <Text style={styles.listText}>010-7744-0745</Text>
        </View>
        <TouchableOpacity style={styles.list} onPressIn={() => navigation.navigate("changeId")}>
          <Text style={styles.listTitle}>아이디</Text>
          <Text style={styles.listText}>qwe123</Text>
          <EntypoIcon name="chevron-right" size={14} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPressIn={() => navigation.navigate("changePassword")}>
          <Text style={styles.listTitle}>비밀번호</Text>
          <EntypoIcon name="chevron-right" size={14} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPressIn={() => {}}>
          <Text style={styles.listTitle}>이용약관</Text>
          <EntypoIcon name="chevron-right" size={14} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPressIn={() => {}}>
          <Text style={styles.listTitle}>개인정보 처리방침</Text>
          <EntypoIcon name="chevron-right" size={14} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPressIn={() => {}}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPressIn={() => {}}>
        <Text style={styles.buttonText}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flex: 1,
  },

  list: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  listTitle: {
    flexGrow: 1,
    fontSize: 14,
    lineHeight: 18.9,
    color: "#333",
  },

  listText: {
    fontSize: 14,
    lineHeight: 18.9,
    color: "gray",
  },

  arrowIcon: {
    marginLeft: 8,
    color: "#333",
  },

  button: {
    paddingVertical: 10,
    backgroundColor: "purple",
    marginHorizontal: 12,
    marginVertical: 4,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
  },
});
