import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { userUrl } from "@/utils/apiUrls";
import { TextInputField } from "@/components/common/TextInputField";
import { StyleSheet, View } from "react-native";
import { GradationButton } from "@/components/common/GradationButton";
import { MypageRootStackParam } from "../navigation/MyPageStack";

// 영문자, 숫자, 한글로만 이루어져야 합니다.
// 길이는 2자 이상 10자 이하여야 합니다.
const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
const defaultMessage = "* 한글, 영어, 숫자만 사용해주세요.\n* 2자 이상 10자 이내로 입력해주세요.";

export function ChangeId() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const [inputId, setInputId] = useState("");
  const [checkMessage, setCheckMessage] = useState(defaultMessage);
  const [isAvailable, setIsAvailable] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

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
    setInputId(text);

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

  const handlePressSubmitButton = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.outBox, { paddingTop: top }]}>
      <View style={styles.nicknameBox}>
        <TextInputField
          label="아이디 ID"
          placeholder="아이디를 입력해주세요"
          value={inputId}
          setValue={handleChangeId}
          message={checkMessage}
          maxLength={20}
          isAvailable={isAvailable}
        />
      </View>
      <GradationButton text="수정완료" onPress={handlePressSubmitButton} disabled={isAvailable} />
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  nicknameBox: {
    width: "100%",
    marginTop: 30,
  },
});
