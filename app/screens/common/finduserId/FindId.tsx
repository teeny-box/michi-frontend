import { idFoundState } from "@/recoil/authAtoms";
import { authUrl } from "@/utils/apiUrls";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FunctionComponent, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import { commonStyles } from "../../signup/Common.styled";
import { IMPCertification } from "@components/common/IMPCertification";
import { FindIDRootStackParam } from "@/screens/navigation/user/FindIdNavigation";
import { headerShowState } from "@/recoil/commonAtoms";
import { GradationButton } from "@/components/common/GradationButton";
import { Title } from "@/components/signup/Title";

type stateType = "waiting" | "running" | "fail";
type idFoundBodyType = {
  userName: string;
  phoneNumber: string;
  birthYear: string;
};

export function FindId() {
  const navigation = useNavigation<NativeStackNavigationProp<FindIDRootStackParam>>();
  const [state, setState] = useState<stateType>("waiting");
  const setIdFound = useSetRecoilState(idFoundState);
  const setHeaderShow = useSetRecoilState(headerShowState);

  useEffect(() => {
    setIdFound("");
  }, []);

  useEffect(() => {
    if (state === "running") {
      setHeaderShow(false);
    } else {
      setHeaderShow(true);
    }
  }, [state]);

  const getIdFound = async ({ userName, phoneNumber, birthYear }: idFoundBodyType) => {
    try {
      const res = await fetch(`${authUrl}/verification`, {
        method: "POST",
        headers: { "Content-Type": "applycation/json" },
        body: JSON.stringify({
          userName,
          phoneNumber,
          birthYear,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIdFound(data.data);
      } else {
        setIdFound("");
      }
    } catch (err) {
      console.error("ID found error : ", err);
      setIdFound("");
    }
  };

  const getPortOne = async (impUid: string) => {
    try {
      const res = await fetch(`${authUrl}/${impUid}`);
      if (res.ok) {
        const data = await res.json();
        await getIdFound(data.data);
        return 1;
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
      navigation.push("idFound");
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
          <ScrollView style={commonStyles.scrollBox}>
            <Title text="본인인증을 해주세요" />
            <TouchableOpacity style={styles.button} onPress={handlePressCertificationButton}>
              <GradationButton text="인증하기" />
            </TouchableOpacity>
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
    width: "100%",
    height: 45,
    backgroundColor: "lightgrey",
  },

  warning: {
    fontFamily: "Freesentation-5Medium",
    fontSize: 12,
    color: "#7000FF",
    marginTop: 10,
  },
});
