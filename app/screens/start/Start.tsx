import { GradationButton } from "@/components/common/GradationButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StartRootStackParam } from "../navigation/StartStackNavigation";

export function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("@assets/images/logo_ver2.png")} />
      <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("login")}>
        <GradationButton text="로그인" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("signup")}>
        <GradationButton text="회원가입" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    marginBottom: 60,
    marginLeft: 16,
  },

  buttonBox: {
    marginTop: 20,
    width: 200,
    height: 45,
  },
});
