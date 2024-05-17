import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputField } from "@/components/common/TextInputField";
import { GradationButton } from "@/components/common/GradationButton";
import { MypageRootStackParam } from "../navigation/MyPageStack";
import { userUrl } from "@/utils/apiUrls";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/recoil/authAtoms";

// 8자 이상이어야 합니다.
// 최소 1개 이상의 영문자, 숫자, 특수문자를 각각 포함해야 합니다.
const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
const defaultMessage = "* 영어, 숫자, 특수문자를 포함해주세요.\n* 8자 이상 입력해주세요.";

export function ChangePassword(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const accessToken = useRecoilValue(accessTokenState);

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordMessage, setCurrentPasswordMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState(defaultMessage);
  const [isAvailable, setIsAvailable] = useState<undefined | boolean>();

  const [checkPassword, setCheckPassword] = useState("");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState("");
  const [isSame, setIsSmae] = useState<undefined | boolean>();

  useEffect(() => {
    if (checkPassword) {
      if (newPassword === checkPassword) {
        setIsSmae(true);
        setCheckPasswordMessage("");
      } else {
        setIsSmae(false);
        setCheckPasswordMessage("* 입력한 새 비밀번호와 일치하지 않습니다.");
      }
    }
  }, [newPassword, checkPassword]);

  const passwordValidation = (password: string) => {
    if (!regex.test(password)) {
      if (password.length < 8) {
        setNewPasswordMessage(defaultMessage);
      } else {
        setNewPasswordMessage("* 영어, 숫자, 특수문자를 포함해주세요.");
      }
      setIsAvailable(false);
    } else {
      setNewPasswordMessage("사용 가능한 비밀번호입니다.");
      setIsAvailable(true);
    }
  };

  const handleChangeNewPassword = (text: string) => {
    setNewPassword(text);
    passwordValidation(text);
  };

  const updatePassword = async () => {
    try {
      const res = await fetch(`${userUrl}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          password: currentPassword,
          newPassword,
        }),
      });

      if (res.ok) {
        return 1;
      }
    } catch (err) {
      console.error("update password error : ", err);
    }
  };

  const handlePressSubmitButton = async () => {
    const success = await updatePassword();
    if (success) {
      navigation.pop();
    } else {
      setCurrentPasswordMessage("* 현재 비밀번호가 일치하지 않습니다!");
    }
  };

  return (
    <SafeAreaView style={styles.outBox}>
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
        <TextInputField
          label="현재 비밀번호"
          value={currentPassword}
          setValue={setCurrentPassword}
          message={currentPasswordMessage}
          placeholder="현재 비밀번호를 입력해주세요."
          secureTextEntry={true}
        />
        <TextInputField
          label="새 비밀번호"
          value={newPassword}
          setValue={handleChangeNewPassword}
          message={newPasswordMessage}
          placeholder="새 비밀번호를 입력해주세요."
          isAvailable={isAvailable}
          secureTextEntry={true}
        />
        <TextInputField
          label="비밀번호 확인"
          value={checkPassword}
          setValue={setCheckPassword}
          message={checkPasswordMessage}
          placeholder="비밀번호를 재입력 해주세요."
          isAvailable={isSame}
          secureTextEntry={true}
        />
        {currentPassword && isAvailable && isSame ? (
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
