import { birthYearState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { commonStyles } from "./Common.styled";
import { Title } from "@/components/signup/Title";
import { DisableTextField } from "@/components/signup/DisableTextField";

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
      <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
        <Title text="인증 정보를 확인해주세요." />
        <DisableTextField label="이름" value={userName} />
        <DisableTextField label="전화번호" value={phoneNumber} />
        <DisableTextField label="출생년도" value={birthYear} />
      </ScrollView>
      <TouchableOpacity style={commonStyles.nextButton} onPressIn={handlePressNextButton}>
        <Text>NEXT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
