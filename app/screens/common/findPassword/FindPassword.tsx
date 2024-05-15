import { idFoundState } from "@/recoil/authAtoms";
import { authUrl } from "@/utils/apiUrls";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { commonStyles } from "../../signup/Common.styled";
import { IMPCertification } from "@components/common/IMPCertification";
import { FindPasswordRootStackParam } from "@/screens/navigation/user/FindPasswordNavigation";

type stateType = "waiting" | "running" | "fail";
type passwordFoundBodyType = {
  userName: string;
  phoneNumber: string;
  birthYear: string;
};

export function FindPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<FindPasswordRootStackParam>>();
  const [state, setState] = useState<stateType>("waiting");
  const id = useRecoilValue(idFoundState);

  const passwordCheck = async ({ userName, phoneNumber, birthYear }: passwordFoundBodyType) => {
    try {
      const res = await fetch(`${authUrl}/verification/${id}`, {
        method: "POST",
        headers: { "Content-Type": "applycation/json" },
        body: JSON.stringify({
          userName,
          phoneNumber,
          birthYear,
        }),
      });

      if (res.ok) {
        return 1;
      }
      return 0;
    } catch (err) {
      console.error("ID found error : ", err);
      return 0;
    }
  };

  const getPortOne = async (impUid: string) => {
    try {
      const res = await fetch(`${authUrl}/${impUid}`);
      if (res.ok) {
        const data = await res.json();
        return await passwordCheck(data.data);
      }
      return 0;
    } catch (err) {
      console.error("get PortOne error : ", err);
      return 0;
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
      navigation.push("changePassword");
      setState("waiting");
    } else {
      setState("fail");
    }
  };

  const handlePressCertificationButton = () => {
    setState("running");
  };

  return (
    <>
      {state !== "running" ? (
        <SafeAreaView style={commonStyles.container}>
          <Text style={styles.title}>본인인증을 해주세요</Text>
          <TouchableOpacity style={styles.button} onPress={handlePressCertificationButton}>
            <Text>인증하기</Text>
          </TouchableOpacity>
          {state === "fail" && <Text>인증에 실패하였습니다. 다시 시도해주세요.</Text>}
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
