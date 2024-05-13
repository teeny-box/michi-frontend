import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { commonStyles } from "@/screens/signup/Common.styled";
import { useRecoilState } from "recoil";
import { idFoundState } from "@/recoil/authAtoms";
import { authUrl } from "@/utils/apiUrls";
import { FindPasswordRootStackParam } from "@/screens/navigation/user/FindPasswordNavigation";

// 영문자로 시작해야 합니다.
// 영문자, 숫자, 밑줄(_)로만 이루어져야 합니다.
// 길이는 4자 이상 20자 이하여야 합니다.
const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export function IdCheck() {
  const navigation = useNavigation<NativeStackNavigationProp<FindPasswordRootStackParam>>();
  const [id, setId] = useRecoilState(idFoundState);
  const [checkMessage, setCheckMessage] = useState("");

  const handleChangeId = async (text: string) => {
    if (!text) setId("");
    else if (!regex.test(text)) {
      setCheckMessage("ID 규칙에 맞게 작성해주세요.");
    } else {
      setCheckMessage("");
      setId(text);
    }
  };

  const checkIdExist = async () => {
    try {
      const res = await fetch(`${authUrl}`);
      if (res.ok) {
        return 1;
      }
      return 0;
    } catch (err) {
      console.error("id exists check error : ", err);
      return 0;
    }
  };

  const handlePressNextButton = async () => {
    const isExist = await checkIdExist();
    if (isExist) {
      navigation.push("findPassword");
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>비밀번호를 찾을 아이디 정보를 입력하세요</Text>
      <Text style={styles.label}>아이디</Text>
      <TextInput value={id} onChangeText={handleChangeId} style={styles.input} maxLength={20} />
      <Text>{checkMessage}</Text>
      <TouchableOpacity
        onPressIn={handlePressNextButton}
        disabled={id.length < 4}
        style={id.length >= 4 ? commonStyles.nextButton : commonStyles.nextButtonDisabled}>
        {/* style={commonStyles.nextButton}> */}
        <Text>확인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 26,
  },

  label: {
    fontSize: 12,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },
});
