import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParam } from "../navigation/SignUpStackNavigation";
import { IMPCertification } from "@/components/common/IMPCertification";
import { commonStyles } from "./Common.styled";

export function Certification() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [state, setState] = useState<"waiting" | "running" | "success" | "fail">("waiting");

  const callback = (res: any) => {
    console.log(res);
    setState(res.success === "true" ? "success" : "fail");
  };

  return (
    <>
      {state !== "running" ? (
        <SafeAreaView style={styles.container}>
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
          <TouchableOpacity
            onPressIn={() => navigation.push("checkInfo")}
            disabled={state !== "success"}
            style={state === "success" ? commonStyles.nextButton : commonStyles.nextButtonDisabled}>
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
  container: {
    marginHorizontal: 40,
    marginVertical: 70,
    position: "relative",
    flexGrow: 1,
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
