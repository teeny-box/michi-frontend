import { commonStyles } from "@screens/signup/Common.styled";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { FindIDRootStackParam } from "@/screens/navigation/user/FindIdNavigation";
import { idFoundState } from "@/recoil/authAtoms";
import { SignUpRootStackParam } from "@/screens/navigation/SignUpStackNavigation";
import { Title } from "@/components/signup/Title";
import { TextField } from "@/components/signup/TextField";
import { GradationButton } from "@/components/common/GradationButton";

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
      <ScrollView style={commonStyles.scrollBox}>
        {IDFound ? (
          <>
            <Title text="아이디를 확인해주세요." />
            <TextField label="아이디 ID" value={IDFound} />
            <TouchableOpacity style={styles.button} onPress={handlePressReturnButton}>
              <Text>확인</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Title text="가입 정보가 없습니다." />
            <GradationButton text="회원 가입 하기" onPress={handlePressSignupButton} />
            <TouchableOpacity style={styles.button} onPress={handlePressReturnButton}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#000",
  },

  buttonText: {
    margin: "auto",
    color: "#fff",
  },
});
