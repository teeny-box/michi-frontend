import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { commonStyles } from "@/screens/signup/Common.styled";
import { useRecoilState } from "recoil";
import { idFoundState } from "@/recoil/authAtoms";
import { userUrl } from "@/utils/apiUrls";
import { FindPasswordRootStackParam } from "@/screens/navigation/user/FindPasswordNavigation";
import { TextInputField } from "@/components/common/TextInputField";
import { Title } from "@/components/signup/Title";
import { GradationButton } from "@/components/common/GradationButton";
import { useLoadingScreen } from "@/hook/useLoadingScreen";
import { useAlert } from "@/hook/useAlert";
import { StartRootStackParam } from "@/screens/navigation/StartStackNavigation";

// 영문자로 시작해야 합니다.
// 영문자, 숫자, 밑줄(_)로만 이루어져야 합니다.
// 길이는 4자 이상 20자 이하여야 합니다.
const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export function IdExistCheck() {
  const navigation = useNavigation<NativeStackNavigationProp<FindPasswordRootStackParam>>();
  const navigationStart = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
  const [id, setId] = useRecoilState(idFoundState);
  const [checkMessage, setCheckMessage] = useState("");
  const { setAlertState } = useAlert();
  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();

  const handleChangeId = async (text: string) => {
    if (!text) setId("");
    else if (!regex.test(text)) {
      setCheckMessage("ID 규칙에 맞게 작성해주세요.");
    } else {
      setCheckMessage("");
      setId(text);
    }
  };

  const checkIdExist = async () => {
    openLoadingScreen();
    try {
      const res = await fetch(`${userUrl}/id-exists/${id}`);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        return 1;
      }
      return 0;
    } catch (err) {
      console.error("id exists check error : ", err);
      return 0;
    } finally {
      closeLoadingScreen();
    }
  };

  const handlePressNextButton = async () => {
    const isExist = await checkIdExist();
    setId("");

    if (isExist) {
      navigation.push("findPassword");
    } else {
      setAlertState({
        open: true,
        title: "아이디가 존재하지 않습니다.",
        desc: "다시 입력하시겠습니까?",
        defaultText: "확인",
        cancelText: "취소",
        onClosed: () => navigationStart.reset({ index: 1, routes: [{ name: "login" }] }),
      });
    }
  };

  useEffect(() => {
    return () => {
      setId("");
    };
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.scrollBox}>
        <Title text="비밀번호를 찾을 아이디 정보를 입력하세요" />
        <TextInputField label="아이디 ID" value={id} setValue={handleChangeId} placeholder="가입한 아이디를 입력하세요." message={checkMessage} />
        <GradationButton text="확인" onPress={handlePressNextButton} disabled={id.length < 4} />
      </ScrollView>
    </SafeAreaView>
  );
}
