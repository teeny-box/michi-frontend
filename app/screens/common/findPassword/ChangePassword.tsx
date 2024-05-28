import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StartRootStackParam } from "@/screens/navigation/StartStackNavigation";
import { commonStyles } from "@/screens/signup/Common.styled";
import { GradationButton } from "@/components/common/GradationButton";
import { TextInputField } from "@/components/common/TextInputField";
import { userUrl } from "@/utils/apiUrls";

// 8자 이상이어야 합니다.
// 최소 1개 이상의 영문자, 숫자, 특수문자를 각각 포함해야 합니다.
const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
const defaultMessage = "* 영어, 숫자, 특수문자를 포함해주세요.\n* 8자 이상 입력해주세요.";

export function ChangePassword(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
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

  const updatePassword = async (): Promise<1 | undefined> => {
    try {
      const res = await fetch(`${userUrl}`, {
        method: "PATCH",
        // headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          password: currentPassword,
          newPassword,
        }),
      });

      if (res.ok) {
        return 1;
      } else if (res.status === 401) {
        // const success = await updateToken();
        // if (success) return await updatePassword();
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

  useEffect(() => {
    const disabled = currentPassword === "" || !isAvailable || !isSame;
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handlePressSubmitButton} disabled={disabled}>
          <Text style={[styles.headerRightText, disabled ? { color: "gray" } : { color: "#7000ff" }]}>완료</Text>
        </Pressable>
      ),
    });
  }, [currentPassword, isAvailable, isSame]);

  const handlePressNextButton = () => {
    navigation.pop(3);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
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
        <GradationButton text="수정완료" onPress={handlePressSubmitButton} disabled={currentPassword === "" || !isAvailable || !isSame} />
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

  headerRightText: {
    fontFamily: "Freesentation-6SemiBold",
    fontSize: 20,
  },
});
