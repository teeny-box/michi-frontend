import { birthYearState, phoneNumberState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { commonStyles } from "./Common.styled";
import { StartRootStackParam } from "../navigation/StartStackNavigation";

export function Welcome(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();

  const handlePressNextButton = () => {
    navigation.replace("login");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={styles.title}>MICHI에 오신 것을 환영합니다!</Text>
      <Text>클린한 채팅을 위해 꼭 지켜주세요.</Text>
      <TouchableOpacity style={styles.nextButton} onPressIn={handlePressNextButton}>
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

  nextButton: {
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
});
