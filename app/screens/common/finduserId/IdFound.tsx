import { commonStyles } from "@screens/signup/Common.styled";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { idFoundState } from "@/recoil/authAtoms";
import { Title } from "@/components/signup/Title";
import { TextField } from "@/components/signup/TextField";
import { GradationButton } from "@/components/common/GradationButton";
import { Button } from "@/components/common/Button";
import { StartRootStackParam } from "@/screens/navigation/StartStackNavigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export function IdFound(): React.JSX.Element {
  const { top } = useSafeAreaInsets();
  const navigationStart = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
  const IDFound = useRecoilValue(idFoundState);

  const handlePressReturnButton = () => {
    navigationStart.reset({ index: 1, routes: [{ name: "start" }, { name: "login" }] });
  };

  const handlePressPWFindButton = () => {
    navigationStart.reset({ index: 2, routes: [{ name: "start" }, { name: "login" }, { name: "findPassword_login" }] });
  };

  const handlePressSignupButton = () => {
    navigationStart.reset({ index: 1, routes: [{ name: "start" }, { name: "signup" }] });
  };

  return (
    <View style={[commonStyles.container, { paddingTop: top }]}>
      <ScrollView style={commonStyles.scrollBox}>
        {IDFound ? (
          <>
            <Title text="아이디를 확인해주세요." />
            <TextField label="아이디 ID" value={IDFound} />
            <View style={styles.buttonBox}>
              <GradationButton onPress={handlePressReturnButton} text="로그인 하기" rightIcon={<FontAwesome5 name="angle-right" color={"white"} size={14} />} />
              <Button onPress={handlePressPWFindButton} text="비밀번호 찾기" rightIcon={<FontAwesome5 name="angle-right" color={"white"} size={14} />} />
            </View>
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
    </View>
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
