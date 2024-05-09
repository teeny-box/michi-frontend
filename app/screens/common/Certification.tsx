import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IMP from "iamport-react-native";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  id: undefined;
};

export function Certification() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [state, setState] = useState<"waiting" | "running" | "success" | "fail">("waiting");

  /* [필수입력] 본인인증 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response: any) {
    console.log(response);
    setState(response.success === "true" ? "success" : "fail");
  }

  /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: "아임포트",
    carrier: "",
    name: "",
    phone: "",
    min_age: "",
  };

  return (
    <>
      {state === "running" ? (
        <IMP.Certification
          userCode={"imp18262154"} // 가맹점 식별코드
          loading={<Text>loading...</Text>} // 로딩 컴포넌트
          data={data} // 본인인증 데이터
          callback={callback} // 본인인증 종료 후 콜백
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.title}>본인인증을 해주세요</Text>
            {state === "success" ? (
              <View style={styles.buttonSuccess}>
                <Text>인증완료</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.button} onPressIn={() => setState("running")}>
                <Text>인증하기</Text>
              </TouchableOpacity>
            )}
            {state === "fail" && <Text>인증에 실패하였습니다. 다시 시도해주세요.</Text>}
            <TouchableOpacity onPressIn={() => navigation.navigate("id")}>
              {/* disabled={state !== "success"} */}
              <Text>NEXT BUTTON</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 40,
    marginVertical: 20,
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
    paddingVertical: 10,
    backgroundColor: "pink",
    marginVertical: 4,
    alignItems: "center",
  },

  buttonSuccess: {
    paddingVertical: 10,
    backgroundColor: "green",
    marginVertical: 4,
    alignItems: "center",
  },
});
