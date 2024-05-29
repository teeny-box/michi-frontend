import { idFoundState, oneTimeTokenStat } from "@/recoil/authAtoms";
import { authUrl } from "@/utils/apiUrls";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { commonStyles } from "../../signup/Common.styled";
import { IMPCertification } from "@components/common/IMPCertification";
import { FindPasswordRootStackParam } from "@/screens/navigation/user/FindPasswordNavigation";
import { GradationButton } from "@/components/common/GradationButton";
import { Title } from "@/components/signup/Title";
import { headerShowState } from "@/recoil/commonAtoms";

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
  const setHeaderShow = useSetRecoilState(headerShowState);
  const setOneTimeToken = useSetRecoilState(oneTimeTokenStat);

  const getPortOneAndPasswordCheck = async (impUid: string) => {
    try {
      const res = await fetch(`${authUrl}/verification/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          impUid: impUid,
          userId: id,
        }),
      });

      if (res.ok) {
        const token = res.headers.get("authorization")?.split(" ")[1];
        setOneTimeToken(token || "");
        return 1;
      }
      return 0;
    } catch (err) {
      console.error("get PortOne error : ", err);
      return 0;
    }
  };

  const callback = (res: any) => {
    console.log(res);
    if (res.success === "false") {
      setState("fail");
      return;
    }

    getPortOneAndPasswordCheck(res.imp_uid).then(apiRes => {
      if (apiRes) {
        navigation.push("changePassword");
        setState("waiting");
      } else {
        setState("fail");
      }
    });
  };

  const handlePressCertificationButton = () => {
    setState("running");
  };

  useEffect(() => {
    if (state === "running") {
      setHeaderShow(false);
    } else {
      setHeaderShow(true);
    }
  }, [state]);

  return (
    <>
      {state !== "running" ? (
        <SafeAreaView style={commonStyles.container}>
          <ScrollView style={commonStyles.scrollBox}>
            <Title text="본인인증을 해주세요" />
            <GradationButton text="인증하기" onPress={handlePressCertificationButton} />
            {state === "fail" && <Text style={styles.warning}>* 인증에 실패하였습니다. 다시 시도해주세요.</Text>}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <IMPCertification callback={callback} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  warning: {
    fontFamily: "Freesentation-5Medium",
    fontSize: 12,
    color: "#7000FF",
    marginTop: 10,
  },
});
