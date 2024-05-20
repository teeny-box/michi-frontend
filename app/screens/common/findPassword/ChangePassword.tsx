import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { passwordState } from "@/recoil/signupAtoms";
import { StartRootStackParam } from "@/screens/navigation/StartStackNavigation";
import { commonStyles } from "@/screens/signup/Common.styled";

// 8자 이상이어야 합니다.
// 최소 1개 이상의 영문자, 숫자, 특수문자를 각각 포함해야 합니다.
const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

export function ChangePassword(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
  const [newPassword, setNewPassword] = useRecoilState(passwordState);
  const [checkPassword, setCheckPassword] = useState("");
  const [checkValidationMessage, setCheckValidationMessage] = useState("특수문자, 공백은 사용할 수 없습니다.");
  const [isSame, setIsSmae] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (newPassword) passwordValidation(newPassword);
  }, []);

  useEffect(() => {
    if (newPassword === checkPassword) {
      setIsSmae(true);
    } else {
      setIsSmae(false);
    }
  }, [newPassword, checkPassword]);

  const passwordValidation = (password: string) => {
    if (!regex.test(password)) {
      setCheckValidationMessage("사용할 수 없는 비밀번호입니다.");
      setIsAvailable(false);
    } else {
      setCheckValidationMessage("사용 가능한 비밀번호입니다.");
      setIsAvailable(true);
    }
  };

  const handleChangePassword = (text: string) => {
    setNewPassword(text);

    if (!text) {
      setCheckValidationMessage("특수문자, 공백은 사용할 수 없습니다.");
      setIsAvailable(false);
      return;
    }

    // 유효성 검사
    passwordValidation(text);
  };

  const handlePressNextButton = () => {
    navigation.pop(3);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>비밀번호를 입력하세요</Text>
      <Text style={styles.label}>새 비밀번호</Text>
      <TextInput value={newPassword} onChangeText={handleChangePassword} secureTextEntry={true} style={styles.input} />
      <Text>{checkValidationMessage}</Text>
      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput value={checkPassword} onChangeText={setCheckPassword} secureTextEntry={true} style={styles.input} />
      <TouchableOpacity onPress={handlePressNextButton} disabled={!isSame} style={isSame ? commonStyles.nextButton : commonStyles.nextButtonDisabled}>
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
