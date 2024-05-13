import { commonStyles } from "@screens/signup/Common.styled";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { FindIDRootStackParam } from "@/screens/navigation/user/FindIdNavigation";
import { idFoundState } from "@/recoil/authAtoms";
import { SignUpRootStackParam } from "@/screens/navigation/SignUpStackNavigation";

export function IdFound(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<FindIDRootStackParam>>();
  const navigationSignup = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const IDFound = useRecoilValue(idFoundState);

  const handlePressReturnButton = () => {
    navigation.pop(2);
  };

  const handlePressSignupButton = () => {
    navigationSignup.replace("signup_certification");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {IDFound ? (
        <>
          <Text style={styles.title}>아이디를 확인해주세요.</Text>
          <Text style={styles.label}>아이디</Text>
          <Text style={styles.value}>{IDFound}</Text>
          <TouchableOpacity onPressIn={handlePressReturnButton}>
            <Text>확인</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>가입 정보가 없습니다.</Text>
          <Text style={styles.label}>회원가입 하시겠습니까?</Text>
          <TouchableOpacity onPressIn={handlePressSignupButton}>
            <Text>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPressIn={handlePressReturnButton}>
            <Text>취소</Text>
          </TouchableOpacity>
        </>
      )}
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
