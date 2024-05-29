import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StartRootStackParam } from "@/screens/navigation/StartStackNavigation";
import { commonStyles } from "@/screens/signup/Common.styled";
import { GradationButton } from "@/components/common/GradationButton";
import { TextInputField } from "@/components/common/TextInputField";
import { userUrl } from "@/utils/apiUrls";
import { useRecoilValue } from "recoil";
import { oneTimeTokenState } from "@/recoil/authAtoms";
import { useLoadingScreen } from "@/hook/useLoadingScreen";
import Toast from "react-native-toast-message";
import { useAlert } from "@/hook/useAlert";

// 8자 이상이어야 합니다.
// 최소 1개 이상의 영문자, 숫자, 특수문자를 각각 포함해야 합니다.
const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
const defaultMessage = "* 영어, 숫자, 특수문자를 포함해주세요.\n* 8자 이상 입력해주세요.";

export function ChangePassword(): React.JSX.Element {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
  const oneTimeToken = useRecoilValue(oneTimeTokenState);
  const { setAlertState } = useAlert();
  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();

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
    openLoadingScreen();
    try {
      const res = await fetch(`${userUrl}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${oneTimeToken}` },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (res.ok) {
        return 1;
      }
    } catch (err) {
      console.error("update password error : ", err);
    } finally {
      closeLoadingScreen();
    }
  };

  const handlePressSubmitButton = async () => {
    const success = await updatePassword();
    if (success) {
      Toast.show({ text1: "비밀번호 변경 완료" });
      navigation.reset({ index: 1, routes: [{ name: "login" }] });
    } else {
      setAlertState({ open: true, title: "비밀번호 번경 실패", desc: "잠시 후 다시 시도해주세요.", defaultText: "확인" });
    }
  };

  useEffect(() => {
    const disabled = !isAvailable || !isSame;
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handlePressSubmitButton} disabled={disabled}>
          <Text style={[styles.headerRightText, disabled ? { color: "gray" } : { color: "#7000ff" }]}>완료</Text>
        </Pressable>
      ),
    });
  }, [isAvailable, isSame]);

  return (
    <View style={[commonStyles.container, { paddingTop: top }]}>
      <ScrollView contentContainerStyle={styles.scrollBox} showsVerticalScrollIndicator={false}>
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
        <GradationButton text="수정완료" onPress={handlePressSubmitButton} disabled={!isAvailable || !isSame} />
      </ScrollView>
    </View>
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
