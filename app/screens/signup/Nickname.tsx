import { nicknameState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { commonStyles } from "./Common.styled";
import { userUrl } from "@/utils/apiUrls";
import { TextInputField } from "@components/signup/TextInputField";
import { Title } from "@components/signup/Title";
import { NextButton } from "@components/signup/NextButton";

// 영문자, 숫자, 한글로만 이루어져야 합니다.
// 길이는 2자 이상 10자 이하여야 합니다.
const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
const defaultMessage = "* 한글, 영어, 숫자만 사용해주세요.\n* 2자 이상 10자 이내로 입력해주세요.";

export function Nickname(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [checkMessage, setCheckMessage] = useState(defaultMessage);
  const [isAvailable, setIsAvailable] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  useEffect(() => {
    if (nickname) nicknameValidation(nickname);
  }, []);

  const nicknameValidation = async (text: string) => {
    setIsAvailable(false);

    if (!regex.test(text)) {
      if (/[^a-zA-Z0-9가-힣]/.test(text)) {
        setCheckMessage("* 한글, 영어, 숫자만 사용해주세요.");
      } else {
        setCheckMessage("* 2자 이상 입력해주세요.");
      }
      return;
    }
    try {
      const res = await fetch(`${userUrl}/nickname-check/${text}`);
      if (res.ok) {
        setCheckMessage("사용 가능한 닉네임입니다.");
        setIsAvailable(true);
      } else {
        setCheckMessage("* 이미 사용 중인 닉네임입니다.");
      }
    } catch (e) {
      console.error("error", e);
      setCheckMessage("* 사용할 수 없는 닉네임입니다.");
    }
  };

  const handleChangeNickname = (text: string) => {
    setNickname(text);

    // 유효성 검사
    if (!text) {
      clearTimeout(timer);
      setCheckMessage(defaultMessage);
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
      <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
        <Title text="닉네임을 입력해주세요" />
        <TextInputField label="닉네임" value={nickname} setValue={handleChangeNickname} maxLength={10} message={checkMessage} isAvailable={isAvailable} />
      </ScrollView>
      <NextButton onPressIn={handlePressNextButton} disabled={!isAvailable} />
    </SafeAreaView>
  );
}
