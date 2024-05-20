import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "./Common.styled";
import { useRecoilState } from "recoil";
import { passwordState } from "@/recoil/signupAtoms";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { Title } from "@/components/signup/Title";
import { TextInputField } from "@/components/common/TextInputField";
import { NextButton } from "@/components/signup/NextButton";

// 8자 이상이어야 합니다.
// 최소 1개 이상의 영문자, 숫자, 특수문자를 각각 포함해야 합니다.
const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
const defaultMessage = "* 영어, 숫자, 특수문자를 포함해주세요.\n* 8자 이상 입력해주세요.";

export function Password(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [newPassword, setNewPassword] = useRecoilState(passwordState);
  const [checkPassword, setCheckPassword] = useState("");
  const [checkValidationMessage, setCheckValidationMessage] = useState(defaultMessage);
  const [isSame, setIsSmae] = useState<undefined | boolean>();
  const [isAvailable, setIsAvailable] = useState<undefined | boolean>();

  useEffect(() => {
    if (newPassword) passwordValidation(newPassword);
  }, []);

  useEffect(() => {
    if (checkPassword) {
      if (newPassword === checkPassword) {
        setIsSmae(true);
      } else {
        setIsSmae(false);
      }
    }
  }, [newPassword, checkPassword]);

  const passwordValidation = (password: string) => {
    if (!regex.test(password)) {
      if (password.length < 8) {
        setCheckValidationMessage(defaultMessage);
      } else {
        setCheckValidationMessage("* 영어, 숫자, 특수문자를 포함해주세요.");
      }
      setIsAvailable(false);
    } else {
      setCheckValidationMessage("사용 가능한 비밀번호입니다.");
      setIsAvailable(true);
    }
  };

  const handleChangePassword = (text: string) => {
    setNewPassword(text);
    passwordValidation(text);
  };

  const handlePressNextButton = () => {
    navigation.push("nickname");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
        <Title text="비밀번호를 입력하세요" />
        <TextInputField
          label="새 비밀번호"
          value={newPassword}
          setValue={handleChangePassword}
          message={checkValidationMessage}
          placeholder="새 비밀번호를 입력해주세요."
          isAvailable={isAvailable}
          secureTextEntry={true}
        />
        <TextInputField
          label="비밀번호 확인"
          value={checkPassword}
          setValue={setCheckPassword}
          message={isSame === false ? "* 입력한 비밀번호와 다릅니다." : ""}
          placeholder="비밀번호를 재입력 해주세요."
          isAvailable={isSame}
          secureTextEntry={true}
        />
      </ScrollView>
      <NextButton onPress={handlePressNextButton} disabled={!(isSame && isAvailable)} />
    </SafeAreaView>
  );
}
