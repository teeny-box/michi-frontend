import { nicknameState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { commonStyles } from "./Common.styled";

// 영문자, 숫자, 한글로만 이루어져야 합니다.
// 길이는 2자 이상 10자 이하여야 합니다.
const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;

export function Nickname(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [checkMessage, setCheckMessage] = useState("블라블라 대충 규칙 메시지가 나옵니다.");
  const [isAvailable, setIsAvailable] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  useEffect(() => {
    if (nickname) nicknameValidation(nickname);
  }, []);

  const nicknameValidation = async (nickname: string) => {
    setIsAvailable(false);

    try {
      if (!regex.test(nickname)) {
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

  const handleChangeNickname = (text: string) => {
    setNickname(text);

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
      nicknameValidation(text);
    }, 500);
    setTimer(newTimer);
  };

  const handlePressNextButton = () => {
    navigation.push("terms");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>닉네임을 입력하세요</Text>
      <TextInput value={nickname} onChangeText={handleChangeNickname} style={styles.input} maxLength={10} />
      <Text>{checkMessage}</Text>
      <TouchableOpacity
        onPressIn={handlePressNextButton}
        disabled={!isAvailable}
        style={isAvailable ? commonStyles.nextButton : commonStyles.nextButtonDisabled}>
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
