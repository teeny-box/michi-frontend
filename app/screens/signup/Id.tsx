import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { useRecoilState } from "recoil";
import { idState } from "@/recoil/signupAtoms";
import { commonStyles } from "./Common.styled";
import { useEffect, useState } from "react";
import { userUrl } from "@/utils/apiUrls";
import { TextInputField } from "@/components/common/TextInputField";
import { Title } from "@/components/signup/Title";
import { NextButton } from "@/components/signup/NextButton";

// 영문자로 시작해야 합니다.
// 영문자, 숫자, 밑줄(_)로만 이루어져야 합니다.
// 길이는 4자 이상 20자 이하여야 합니다.
const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;
const defaultMessage = "* 영어, 숫자, 밑줄(_)만 사용해주세요.\n* 4자 이상 20자 이내로 입력해주세요.";

export function Id() {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [id, setId] = useRecoilState(idState);
  const [checkMessage, setCheckMessage] = useState(defaultMessage);
  const [isAvailable, setIsAvailable] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  useEffect(() => {
    if (id) idValidation(id);
  }, []);

  const idValidation = async (text: string) => {
    setIsAvailable(false);

    if (!regex.test(text)) {
      if (/[^a-zA-Z0-9_]/.test(text)) {
        setCheckMessage("* 밑줄(_)을 제외한 특수문자, 공백은 사용할 수 없습니다.");
      } else if (!/^[a-zA-Z]/.test(text)) {
        setCheckMessage("* 영문자로 시작해야 합니다.");
      } else if (text.length < 4) {
        setCheckMessage("* 4자 이상 20자 이내로 입력해주세요.");
      } else {
        setCheckMessage("* 사용할 수 없는 아이디입니다.");
      }
      return;
    }

    try {
      const res = await fetch(`${userUrl}/id-check/${text}`);
      if (res.ok) {
        setCheckMessage("사용 가능한 아이디입니다.");
        setIsAvailable(true);
      } else {
        setCheckMessage("* 이미 사용 중인 아이디입니다.");
      }
    } catch (e) {
      console.error("id duplicate check error", e);
      setCheckMessage("* 사용할 수 없는 아이디입니다.");
    }
  };

  const handleChangeId = (text: string) => {
    setId(text);

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
      await idValidation(text);
    }, 500);
    setTimer(newTimer);
  };

  const handlePressNextButton = () => {
    navigation.push("password");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
        <Title text="아이디를 입력해주세요" />
        <TextInputField
          label="아이디 ID"
          placeholder="아이디를 입력해주세요"
          value={id}
          setValue={handleChangeId}
          message={checkMessage}
          maxLength={20}
          isAvailable={isAvailable}
        />
      </ScrollView>
      <NextButton onPressIn={handlePressNextButton} disabled={!isAvailable} />
    </SafeAreaView>
  );
}
