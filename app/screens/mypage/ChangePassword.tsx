import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputField } from "@/components/common/TextInputField";
import { GradationButton } from "@/components/common/GradationButton";
import { MypageRootStackParam } from "../navigation/MyPageStack";

// 8자 이상이어야 합니다.
// 최소 1개 이상의 영문자, 숫자, 특수문자를 각각 포함해야 합니다.
const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
const defaultMessage = "* 영어, 숫자, 특수문자를 포함해주세요.\n* 8자 이상 입력해주세요.";

export function ChangePassword(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkValidationMessage, setCheckValidationMessage] = useState(defaultMessage);
  const [isSame, setIsSmae] = useState<undefined | boolean>();
  const [isAvailable, setIsAvailable] = useState<undefined | boolean>();

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

  const handlePressSubmitButton = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.outBox}>
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
        <TextInputField
          label="현재 비밀번호"
          value={newPassword}
          setValue={handleChangePassword}
          message={checkValidationMessage}
          placeholder="현재 비밀번호를 입력해주세요."
          isAvailable={isAvailable}
          secureTextEntry={true}
        />
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
        {isAvailable ? (
          <TouchableOpacity onPress={handlePressSubmitButton} style={styles.submitButton}>
            <GradationButton text="수정완료" />
          </TouchableOpacity>
        ) : (
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>수정완료</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  scrollBox: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 80,
  },

  submitButton: {
    marginTop: 30,
    backgroundColor: "lightgrey",
    width: "100%",
    height: 45,
  },

  submitButtonText: {
    color: "#fff",
    margin: "auto",
    fontSize: 16,
    fontFamily: "Freesentation-5Medium",
  },
});
