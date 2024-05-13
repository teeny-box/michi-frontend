import { birthYearState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { commonStyles } from "./Common.styled";

export function CheckInfo(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const phoneNumber = useRecoilValue(phoneNumberState);
  const birthYear = useRecoilValue(birthYearState);
  const userName = useRecoilValue(userNameState);

  const handlePressNextButton = () => {
    navigation.push("id");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>인증 정보를 확인해주세요.</Text>
      <Text style={styles.label}>이름</Text>
      <Text style={styles.value}>{userName}</Text>
      <Text style={styles.label}>전화번호</Text>
      <Text style={styles.value}>{phoneNumber}</Text>
      <Text style={styles.label}>출생년도</Text>
      <Text style={styles.value}>{birthYear}</Text>
      <TouchableOpacity style={commonStyles.nextButton} onPressIn={handlePressNextButton}>
        <Text>NEXT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 26,
  },

  label: {
    fontSize: 12,
    marginTop: 30,
  },

  value: {
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },
});
