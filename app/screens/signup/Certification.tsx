import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { IMPCertification } from "@/components/common/IMPCertification";
import { commonStyles } from "./Common.styled";
import { useSetRecoilState } from "recoil";
import { birthYearState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { authUrl } from "@/utils/apiUrls";
import { GradationButton } from "@/components/common/GradationButton";
import { Title } from "@/components/signup/Title";
import { NextButton } from "@/components/signup/NextButton";

type stateType = "waiting" | "running" | "success" | "fail";

export function Certification() {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const [state, setState] = useState<stateType>("waiting");
  const setUserName = useSetRecoilState(userNameState);
  const setPhoneNumber = useSetRecoilState(phoneNumberState);
  const setBirthYear = useSetRecoilState(birthYearState);

  useEffect(() => {
    if (state !== "success") {
      setUserName("");
      setPhoneNumber("");
      setBirthYear("");
    }
  }, [state]);

  const handlePressCertificationButton = () => {
    setState("running");
  };

  const getPortOne = async (impUid: string): Promise<{ state: stateType }> => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // try {
    //   const res = await fetch(`${authUrl}/${impUid}`);

    //   if (res.ok) {
    //     const data = await res.json();

    //     if (currentYear - parseInt(data.data.birthYear) > 18) {
    //       setUserName(data.data.userName);
    //       setPhoneNumber(data.data.phoneNumber);
    //       setBirthYear(data.data.birthYear);
    //       navigation.push("checkInfo");
    //       return { state: "success" };
    //     } else {
    //       Alert.alert("⚠️ 미성년자는 가입할 수 없습니다.", "", [{ text: "OK", style: "cancel" }]);
    //     }
    //   }
    //   return { state: "fail" };
    // } catch (err) {
    //   console.error("get portone error : ", err);
    //   return { state: "fail" };
    // }

    setUserName("이진이");
    setPhoneNumber("01077440745");
    setBirthYear("2000");
    navigation.push("checkInfo");
    return { state: "success" };
  };

  const callback = async (res: any) => {
    console.log(res);
    if (res.success === "false") {
      setState("fail");
      return;
    }
    const apiRes = await getPortOne(res.imp_uid);
    setState(apiRes.state);
  };

  const handlePressNextButton = () => {
    navigation.push("checkInfo");
  };

  return (
    <>
      {state !== "running" ? (
        <SafeAreaView style={commonStyles.container}>
          <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
            <Title text="본인인증을 해주세요" />
            {state === "success" ? (
              <View style={styles.buttonSuccess}>
                <Text>인증완료</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.button} onPressIn={handlePressCertificationButton}>
                <GradationButton text="인증하기" />
              </TouchableOpacity>
            )}
            {state === "fail" && <Text>인증에 실패하였습니다. 다시 시도해주세요.</Text>}
          </ScrollView>
          <NextButton onPressIn={handlePressNextButton} disabled={state !== "success"} />
        </SafeAreaView>
      ) : (
        <IMPCertification callback={callback} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 45,
  },

  buttonSuccess: {
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    marginVertical: 4,
    alignItems: "center",
  },
});
