import { GradationButton } from "@/components/common/GradationButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StartRootStackParam } from "../navigation/StartStackNavigation";
import { useResetRecoilState } from "recoil";
import { birthYearState, certificationState, idState, nicknameState, passwordState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { useEffect } from "react";

export function Start() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();

  // reset user data state
  const resetUserId = useResetRecoilState(idState);
  const resetPassword = useResetRecoilState(passwordState);
  const resetNickname = useResetRecoilState(nicknameState);
  const resetUserName = useResetRecoilState(userNameState);
  const resetPhoneNumber = useResetRecoilState(phoneNumberState);
  const resetBirthYear = useResetRecoilState(birthYearState);
  const resetCertificationState = useResetRecoilState(certificationState);

  useEffect(() => {
    resetAllState();
  }, []);

  const resetAllState = () => {
    resetUserId();
    resetPassword();
    resetNickname();
    resetUserName();
    resetPhoneNumber();
    resetBirthYear();
    resetCertificationState();
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <View style={[styles.container, { paddingTop: top }]}>
        <Image style={styles.logo} source={require("@assets/images/logo_ver2.png")} />
        <GradationButton text="로그인" onPress={() => navigation.navigate("login")} size="medium" />
        <GradationButton text="회원가입" onPress={() => navigation.navigate("signup")} size="medium" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    rowGap: 30,
  },

  logo: {
    marginBottom: 30,
    marginLeft: 16,
  },
});
