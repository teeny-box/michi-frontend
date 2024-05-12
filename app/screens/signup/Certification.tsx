import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { IMPCertification } from "@/components/common/IMPCertification";
import { commonStyles } from "./Common.styled";
import { useSetRecoilState } from "recoil";
import { birthYearState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { authUrl } from "@/utils/apiUrls";

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
          <Text style={styles.title}>본인인증을 해주세요</Text>
          {state === "success" ? (
            <View style={styles.buttonSuccess}>
              <Text>인증완료</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPressIn={handlePressCertificationButton}>
              <Text>인증하기</Text>
            </TouchableOpacity>
          )}
          {state === "fail" && <Text>인증에 실패하였습니다. 다시 시도해주세요.</Text>}
          <TouchableOpacity
            onPressIn={handlePressNextButton}
            // disabled={state !== "success"}
            // style={state === "success" ? commonStyles.nextButton : commonStyles.nextButtonDisabled}
            style={commonStyles.nextButton}>
            <Text>NEXT</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <IMPCertification callback={callback} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 26,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },

  button: {
    paddingVertical: 10,
    backgroundColor: "plum",
    marginVertical: 4,
    alignItems: "center",
  },

  buttonSuccess: {
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    marginVertical: 4,
    alignItems: "center",
  },
});
