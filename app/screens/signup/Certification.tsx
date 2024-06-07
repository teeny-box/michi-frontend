import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { IMPCertification } from "@/components/common/IMPCertification";
import { commonStyles } from "./Common.styled";
import { useSetRecoilState } from "recoil";
import { birthYearState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { authUrl } from "@/utils/apiUrls";
import { GradationButton } from "@/components/common/GradationButton";
import { Title } from "@/components/signup/Title";
import { NextButton } from "@/components/signup/NextButton";
import getCurrentAge from "@/utils/getCurrentAge";
import { useAlert } from "@/hook/useAlert";
import { useLoadingScreen } from "@/hook/useLoadingScreen";

type stateType = "waiting" | "running" | "success" | "fail";

export function Certification() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [state, setState] = useState<stateType>("waiting");
  const setUserName = useSetRecoilState(userNameState);
  const setPhoneNumber = useSetRecoilState(phoneNumberState);
  const setBirthYear = useSetRecoilState(birthYearState);
  const { setAlertState } = useAlert();
  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();

  useEffect(() => {
    if (state !== "success") {
      setUserName("");
      setPhoneNumber("");
      setBirthYear("");
    }
  }, [state]);

  const handlePressCertificationButton = () => {
    setState("running");
    navigation.setOptions({ headerShown: false });
  };

  const getPortOne = async (impUid: string): Promise<true | undefined> => {
    openLoadingScreen();
    try {
      const res = await fetch(`${authUrl}/${impUid}`);

      if (res.ok) {
        const data = await res.json();

        if (getCurrentAge(data.data.birthYear) > 18) {
          setUserName(data.data.userName);
          setPhoneNumber(data.data.phoneNumber);
          setBirthYear(data.data.birthYear);
          navigation.push("checkInfo");
          return true;
        }
      }
    } catch (err) {
      console.error("get portone error : ", err);
    } finally {
      closeLoadingScreen();
    }
  };

  const callback = async (res: any) => {
    console.log(res);
    if (res.success === "false") {
      setState("fail");
      return;
    }
    const apiRes = await getPortOne(res.imp_uid);
    if (apiRes) {
      setState("success");
    } else {
      setState("fail");
      setAlertState({ open: true, title: "미성년자는 가입할 수 없습니다.", defaultText: "확인" });
    }
    navigation.setOptions({ headerShown: true });
  };

  const handlePressNextButton = () => {
    navigation.push("checkInfo");
  };

  return (
    <>
      {state !== "running" ? (
        <View style={[commonStyles.container, { paddingTop: top }]}>
          <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
            <Title text="본인인증을 해주세요" />
            <GradationButton text="인증하기" onPress={handlePressCertificationButton} disabled={state === "success"} />
            {state === "fail" && <Text>인증에 실패하였습니다. 다시 시도해주세요.</Text>}
          </ScrollView>
          <NextButton onPress={handlePressNextButton} disabled={state !== "success"} />
        </View>
      ) : (
        <IMPCertification callback={callback} />
      )}
    </>
  );
}
