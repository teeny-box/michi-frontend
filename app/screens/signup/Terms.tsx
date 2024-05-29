import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "./Common.styled";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { useRecoilValue } from "recoil";
import { birthYearState, idState, nicknameState, passwordState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { authUrl } from "@/utils/apiUrls";
import { Title } from "@/components/signup/Title";
import { CheckBoxField } from "@/components/signup/CheckBoxField";
import { GradationButton } from "@/components/common/GradationButton";
import { useLoadingScreen } from "@/hook/useLoadingScreen";
import Toast from "react-native-toast-message";
import { useAlert } from "@/hook/useAlert";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Terms(): React.JSX.Element {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const userId = useRecoilValue(idState);
  const password = useRecoilValue(passwordState);
  const nickname = useRecoilValue(nicknameState);
  const userName = useRecoilValue(userNameState);
  const phoneNumber = useRecoilValue(phoneNumberState);
  const birthYear = useRecoilValue(birthYearState);
  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();
  const { setAlertState } = useAlert();

  const [allChecked, setAllChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);

  useEffect(() => {
    setAllChecked(isChecked1 && isChecked2 && isChecked3 && isChecked4 && isChecked5);
  }, [isChecked1, isChecked2, isChecked3, isChecked4, isChecked5]);

  const signUp = async () => {
    openLoadingScreen();
    try {
      const res = await fetch(`${authUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          password,
          nickname,
          userName,
          phoneNumber,
          birthYear,
        }),
      });
      console.log(await res.json());

      if (res.ok) {
        return 1;
      }
      return 0;
    } catch (err) {
      console.error("sign up error : ", err);
      return 0;
    } finally {
      closeLoadingScreen();
    }
  };

  const handlePressSignUpButton = async () => {
    const success = await signUp();

    if (success) {
      navigation.reset({ index: 0, routes: [{ name: "welcome" }] });
      Toast.show({ text1: "회원 가입 성공!" });
    } else {
      setAlertState({ open: true, title: "회원 가입 실패", desc: "입력한 정보를 다시 확인해주세요.", defaultText: "확인" });
    }
  };

  const handlePressAllChecked = () => {
    setAllChecked(!allChecked);
    setIsChecked1(!allChecked);
    setIsChecked2(!allChecked);
    setIsChecked3(!allChecked);
    setIsChecked4(!allChecked);
    setIsChecked5(!allChecked);
  };

  return (
    <View style={[commonStyles.container, { paddingTop: top }]}>
      <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
        <Title text="이용약관을 확인해주세요" />
        <View style={styles.checkboxContainer}>
          <CheckBoxField isChecked={allChecked} onPress={handlePressAllChecked}>
            <Text style={styles.t1}>아래 항목에 모두 동의합니다.</Text>
          </CheckBoxField>
          <View style={styles.detailCheckContainer}>
            <CheckBoxField isChecked={isChecked1} onPress={() => setIsChecked1(!isChecked1)}>
              <Text style={styles.t2}>
                (필수)개인정보(위치정보 포함)의 수집 및 이용에 동의합니다. <Text style={styles.link}>더 보기</Text>
              </Text>
            </CheckBoxField>
            <CheckBoxField isChecked={isChecked2} onPress={() => setIsChecked2(!isChecked2)}>
              <Text style={styles.t2}>
                (필수)<Text style={styles.link}>위치기반서비스 이용약관</Text>에 동의합니다.
              </Text>
            </CheckBoxField>
            <CheckBoxField isChecked={isChecked3} onPress={() => setIsChecked3(!isChecked3)}>
              <Text style={styles.t2}>
                (필수)<Text style={styles.link}>이용약관</Text>에 동의합니다.
              </Text>
            </CheckBoxField>
            <CheckBoxField isChecked={isChecked4} onPress={() => setIsChecked4(!isChecked4)}>
              <Text style={styles.t2}>
                (필수)개인정보의 제3자 제공에 동의합니다. <Text style={styles.link}>더 보기</Text>
              </Text>
            </CheckBoxField>
            <CheckBoxField isChecked={isChecked5} onPress={() => setIsChecked5(!isChecked5)}>
              <Text style={styles.t2}>
                (필수)개인정보의 국외 이전에 동의합니다. <Text style={styles.link}>더 보기</Text>
              </Text>
            </CheckBoxField>
          </View>
        </View>
      </ScrollView>
      <GradationButton text="가입하기" onPress={handlePressSignUpButton} disabled={!allChecked} />
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    marginHorizontal: 10,
  },

  detailCheckContainer: {
    marginLeft: 22,
  },

  t1: {
    color: "#141414",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Freesentation-4Regular",
  },

  t2: {
    color: "#141414",
    fontSize: 14,
    fontFamily: "Freesentation-1Thin",
    flexShrink: 1,
  },

  link: {
    color: "#7000ff",
    fontSize: 14,
    fontFamily: "Freesentation-6SemiBold",
    textDecorationLine: "underline",
  },
});
