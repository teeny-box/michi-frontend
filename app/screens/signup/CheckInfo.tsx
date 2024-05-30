import { birthYearState, phoneNumberState, userNameState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { SignUpRootStackParam } from "../navigation/SignUpStackNavigation";
import { commonStyles } from "./Common.styled";
import { Title } from "@/components/signup/Title";
import { TextField } from "@/components/signup/TextField";
import { NextButton } from "@/components/signup/NextButton";
import phoneNumberFormat from "@/utils/phoneNumberFormat";
import getCurrentAge from "@/utils/getCurrentAge";

export function CheckInfo(): React.JSX.Element {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<SignUpRootStackParam>>();
  const phoneNumber = useRecoilValue(phoneNumberState);
  const birthYear = useRecoilValue(birthYearState);
  const userName = useRecoilValue(userNameState);

  const handlePressNextButton = () => {
    navigation.push("id");
  };

  return (
    <View style={[commonStyles.container, { paddingTop: top }]}>
      <ScrollView contentContainerStyle={commonStyles.scrollBox} showsVerticalScrollIndicator={false}>
        <Title text="인증 정보를 확인해주세요." />
        <TextField label="이름" value={userName} />
        <TextField label="전화번호" value={phoneNumberFormat(phoneNumber)} />
        <TextField label="출생년도" value={`${birthYear} (만 ${getCurrentAge(birthYear)}세)`} />
      </ScrollView>
      <NextButton onPress={handlePressNextButton} />
    </View>
  );
}
