import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { useRecoilState } from "recoil";
import { idState } from "@/recoil/signupAtoms";
import { commonStyles } from "./Common.styled";
import { useEffect, useState } from "react";

// 영문자로 시작해야 합니다.
// 영문자, 숫자, 밑줄(_)로만 이루어져야 합니다.
// 길이는 4자 이상 20자 이하여야 합니다.
const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;

export function Id() {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [id, setId] = useRecoilState(idState);
  const [checkMessage, setCheckMessage] = useState("블라블라 대충 규칙 메시지가 나옵니다.");
  const [isAvailable, setIsAvailable] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  useEffect(() => {
    if (id) idValidation(id);
  }, []);

  const idValidation = async (id: string) => {
    setIsAvailable(false);

    try {
      if (!regex.test(id)) {
        setCheckMessage("사용할 수 없는 ID입니다.");
      } else {
        // api 요청
        setCheckMessage("사용 가능한 ID입니다.");
        setIsAvailable(true);
      }
    } catch (e) {
      console.error("error", e);
      setCheckMessage("사용할 수 없는 ID입니다.");
    }
  };

  const handleChangeId = (text: string) => {
    setId(text);

    // 유효성 검사
    if (!text) {
      clearTimeout(timer);
      setCheckMessage("특수문자, 공백은 사용할 수 없습니다.");
      setIsAvailable(false);
      return;
    }

    setCheckMessage("...");
    setIsAvailable(false);

    // 중복 검사(api) 디바운싱
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      await idValidation(text);
    }, 500);
    setTimer(newTimer);
  };

  const handlePressNextButton = () => {
    navigation.push("password");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>아이디를 입력하세요</Text>
      <TextInput value={id} onChangeText={handleChangeId} style={styles.input} maxLength={20} />
      <Text>{checkMessage}</Text>
      <TouchableOpacity
        onPressIn={handlePressNextButton}
        disabled={!isAvailable}
        style={isAvailable ? commonStyles.nextButton : commonStyles.nextButtonDisabled}>
        {/* style={commonStyles.nextButton}> */}
        <Text>NEXT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 26,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },
});
