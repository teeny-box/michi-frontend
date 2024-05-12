import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { commonStyles } from "./Common.styled";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { useRecoilValue } from "recoil";
import { birthYearState, idState, nicknameState, passwordState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { authUrl } from "@/utils/apiUrls";

export function Terms(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const userId = useRecoilValue(idState);
  const password = useRecoilValue(passwordState);
  const nickname = useRecoilValue(nicknameState);
  const userName = useRecoilValue(userNameState);
  const phoneNumber = useRecoilValue(phoneNumberState);
  const birthYear = useRecoilValue(birthYearState);

  const [allChecked, setAllChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  useEffect(() => {
    setAllChecked(isChecked2 && isChecked3);
  }, [isChecked2, isChecked3]);

  const signUp = async () => {
    try {
      // const res = await fetch(`${authUrl}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     userId,
      //     password,
      //     nickname,
      //     userName,
      //     phoneNumber,
      //     birthYear,
      //   }),
      // });
      const res = { ok: true };

      if (res.ok) {
        Alert.alert("회원 가입 완료!", "", [
          {
            text: "OK",
          },
        ]);
        return 1;
      }
      Alert.alert("⚠️ 회원가입 실패", "입력한 정보를 다시 확인해주세요.", [
        {
          text: "OK",
        },
      ]);
      return 0;
    } catch (err) {
      console.error("sign up error : ", err);
      Alert.alert("⚠️ 회원가입 실패", "회원 가입에 실패하였습니다. 잠시 후 다시 시도해주세요.", [
        {
          text: "OK",
        },
      ]);
      return 0;
    }
  };

  const handlePressSignUpButton = async () => {
    const success = await signUp();

    if (success) {
      navigation.push("welcome");
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>이용약관</Text>
      <BouncyCheckbox
        isChecked={allChecked}
        size={20}
        fillColor="plum"
        text="아래 항목에 전부 동의합니다."
        iconStyle={styles.checkboxIcon}
        innerIconStyle={styles.checkboxInnerIcon}
        textStyle={styles.checkboxText}
        onPress={(isChecked: boolean) => {
          setIsChecked2(isChecked);
          setIsChecked3(isChecked);
        }}
        bounceEffectIn={1}
      />
      <View style={styles.detailCheckContainer}>
        <BouncyCheckbox
          isChecked={isChecked2}
          size={20}
          fillColor="plum"
          text="Custom Checkbox"
          iconStyle={styles.checkboxIcon}
          innerIconStyle={styles.checkboxInnerIcon}
          textStyle={styles.checkboxText}
          onPress={(isChecked: boolean) => {
            setIsChecked2(isChecked);
          }}
          bounceEffectIn={1}
        />
        <BouncyCheckbox
          isChecked={isChecked3}
          size={20}
          fillColor="plum"
          text="Custom Checkbox"
          iconStyle={styles.checkboxIcon}
          innerIconStyle={styles.checkboxInnerIcon}
          textStyle={styles.checkboxText}
          onPress={(isChecked: boolean) => {
            setIsChecked3(isChecked);
          }}
          bounceEffectIn={1}
        />
      </View>
      <TouchableOpacity onPressIn={handlePressSignUpButton} disabled={!allChecked} style={allChecked ? styles.signUpButton : styles.signUpButtonDisabled}>
        <Text>가입하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 26,
  },

  checkboxIcon: {
    borderRadius: 2,
  },

  checkboxInnerIcon: {
    borderRadius: 2,
  },

  checkboxText: {
    fontSize: 18,
    textDecorationLine: "none",
  },

  detailCheckContainer: {
    marginLeft: 10,
  },

  signUpButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: "plum",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  signUpButtonDisabled: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: "lightgrey",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
