import { commonStyles } from "@screens/signup/Common.styled";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { idFoundState } from "@/recoil/authAtoms";
import { Title } from "@/components/signup/Title";
import { TextField } from "@/components/signup/TextField";
import { GradationButton } from "@/components/common/GradationButton";
import { Button } from "@/components/common/Button";
import { StartRootStackParam } from "@/screens/navigation/StartStackNavigation";

export function IdFound(): React.JSX.Element {
  const navigationStart = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
  const IDFound = useRecoilValue(idFoundState);

  const handlePressReturnButton = () => {
    navigationStart.reset({ index: 1, routes: [{ name: "login" }] });
  };

  const handlePressSignupButton = () => {
    navigationStart.replace("signup");
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
            <View style={styles.buttonBox}>
              <GradationButton text="회원 가입 하기" onPress={handlePressSignupButton} />
              <Button onPress={handlePressReturnButton} text="취소" />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    rowGap: 16,
  },

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
