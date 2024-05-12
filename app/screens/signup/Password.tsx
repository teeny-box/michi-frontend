import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "./Common.styled";
import { useRecoilState } from "recoil";
import { passwordState } from "@/recoil/signupAtoms";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";

// 8자 이상이어야 합니다.
// 최소 1개 이상의 영문자, 숫자, 특수문자를 각각 포함해야 합니다.
const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

export function Password(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [password, setPassword] = useRecoilState(passwordState);
  const [checkMessage, setCheckMessage] = useState("특수문자, 공백은 사용할 수 없습니다.");
  const [isAvailable, setIsAvailable] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  useEffect(() => {
    if (password) passwordValidation(password);
  }, []);

  const passwordValidation = (password: string) => {
    if (!regex.test(password)) {
      setCheckMessage("사용할 수 없는 비밀번호입니다.");
      setIsAvailable(false);
    } else {
      setCheckMessage("사용 가능한 비밀번호입니다.");
      setIsAvailable(true);
    }
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);

    // 유효성 검사
    if (!text) {
      clearTimeout(timer);
      setCheckMessage("특수문자, 공백은 사용할 수 없습니다.");
      setIsAvailable(false);
      return;
    }

    passwordValidation(text);

    // setCheckMessage("...");
    // setIsAvailable(false);

    // // 중복 검사(api) 디바운싱
    // if (timer) {
    //   clearTimeout(timer);
    // }

    // const newTimer = setTimeout(async () => {
    //   try {
    //     if (!regex.test(text)) {
    //       setCheckMessage("사용할 수 없는 비밀번호입니다.");
    //     } else {
    //       // api 요청
    //       setCheckMessage("사용 가능한 비밀번호입니다.");
    //       setIsAvailable(true);
    //     }
    //   } catch (e) {
    //     console.error("error", e);
    //     setCheckMessage("사용할 수 없는 비밀번호입니다.");
    //   }
    // }, 500);
    // setTimer(newTimer);
  };

  const handlePressNextButton = () => {
    navigation.push("nickname");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>비밀번호를 입력하세요</Text>
      <TextInput value={password} onChangeText={handleChangePassword} secureTextEntry={true} style={styles.input} />
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
