import { nicknameState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userUrl } from "@/utils/apiUrls";
import { TextInputField } from "@/components/common/TextInputField";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { GradationButton } from "@/components/common/GradationButton";
import { MypageRootStackParam } from "../navigation/MyPageStack";

// 영문자, 숫자, 한글로만 이루어져야 합니다.
// 길이는 2자 이상 10자 이하여야 합니다.
const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
const defaultMessage = "* 한글, 영어, 숫자만 사용해주세요.\n* 2자 이상 10자 이내로 입력해주세요.";

export function ChangeProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const [inputNickname, setInputNickname] = useState("원래닉네임");
  const [checkMessage, setCheckMessage] = useState(defaultMessage);
  const [isAvailable, setIsAvailable] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  useEffect(() => {
    if (inputNickname) nicknameValidation(inputNickname);
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
    setInputNickname(text);

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

  const handlePressSubmitButton = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.outBox}>
      <View style={styles.imageBox}>
        <Image source={require("@assets/images/circle_border.png")} style={styles.borderImage} />
        <Image source={{ uri: "https://i.pinimg.com/564x/b4/b4/5f/b4b45f38fb15427b0f609f011b44f384.jpg" }} style={styles.userImage} />
      </View>
      <View style={styles.nicknameBox}>
        <TextInputField
          label="닉네임"
          value={inputNickname}
          setValue={handleChangeNickname}
          maxLength={10}
          message={checkMessage}
          isAvailable={isAvailable}
          placeholder="닉네임을 입력하세요" // 원래 닉네임 보여주기
        />
      </View>
      {isAvailable ? (
        <TouchableOpacity onPress={handlePressSubmitButton} style={styles.submitButton}>
          <GradationButton text="수정완료" />
        </TouchableOpacity>
      ) : (
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText}>수정완료</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "relative",
  },

  borderImage: {
    width: 100,
    height: 100,
    position: "absolute",
  },

  userImage: {
    width: 100 - 10 * 2,
    height: 100 - 10 * 2,
    borderRadius: 100,
    margin: "auto",
  },

  nicknameBox: {
    width: "100%",
    marginTop: 30,
  },

  nickname: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
  },

  submitButton: {
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
