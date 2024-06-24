import { idFoundState, oneTimeTokenState } from "@/recoil/authAtoms";
import { authUrl } from "@/utils/apiUrls";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { commonStyles } from "../../signup/Common.styled";
import { IMPCertification } from "@components/common/IMPCertification";
import { FindPasswordRootStackParam } from "@/screens/navigation/user/FindPasswordNavigation";
import { GradationButton } from "@/components/common/GradationButton";
import { Title } from "@/components/signup/Title";
import { headerShowState } from "@/recoil/commonAtoms";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import { NextButton } from "@/components/signup/NextButton";

type stateType = "waiting" | "running" | "fail" | "success";

export function FindPassword() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<FindPasswordRootStackParam>>();
  const [state, setState] = useState<stateType>("waiting");
  const id = useRecoilValue(idFoundState);
  const setHeaderShow = useSetRecoilState(headerShowState);
  const [oneTimeToken, setOneTimeToken] = useRecoilState(oneTimeTokenState);
  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();
  const intervalId = useRef<number | undefined>();
  const timeoutId = useRef<number | undefined>();

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
        if (intervalId.current) {
          clearInterval(intervalId.current);
          clearInterval(timeoutId.current);
        }
        const token = res.headers.get("authorization")?.split(" ")[1];
        if (token) {
          setOneTimeToken({ token, time: 1000 * 60 - 1000 });
          intervalId.current = +setInterval(() => {
            setOneTimeToken(cur => {
              return { ...cur, time: cur.time - 1000 };
            });
          }, 1000);
          timeoutId.current = +setTimeout(() => {
            clearInterval(intervalId.current);
          }, 1000 * 60);
          return 1;
        }
      }
      return 0;
    } catch (err) {
      console.error("get PortOne error : ", err);
      return 0;
    }
  };

  const IMPCertificationCallback = (res: any) => {
    console.log(res);
    if (res.success === "false") {
      setState("fail");
      return;
    }

    openLoadingScreen();
    getPortOneAndPasswordCheck(res.imp_uid).then(apiRes => {
      if (apiRes) {
        navigation.push("changePassword");
        setState("success");
      } else {
        setState("fail");
      }
    });
    closeLoadingScreen();
  };

  const handlePressCertificationButton = () => {
    setState("running");
  };

  useEffect(() => {
    if (oneTimeToken.time <= 0) {
      setState("waiting");
    }
  }, [oneTimeToken.time]);

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
        <View style={[commonStyles.container, { paddingTop: top }]}>
          <ScrollView style={commonStyles.scrollBox}>
            <Title text="본인인증을 해주세요" />
            <GradationButton text="인증하기" onPress={handlePressCertificationButton} />
            {state === "fail" && <Text style={styles.warning}>* 인증에 실패하였습니다. 다시 시도해주세요.</Text>}
          </ScrollView>
          <NextButton onPress={() => navigation.push("changePassword")} disabled={state !== "success"} />
        </View>
      ) : (
        <View style={[styles.container, { paddingTop: top }]}>
          <IMPCertification callback={IMPCertificationCallback} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  warning: {
    fontFamily: "Freesentation-5Medium",
    fontSize: 12,
    color: "#7000FF",
    marginTop: 10,
  },
});
