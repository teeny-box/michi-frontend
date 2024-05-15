import { GradationButton } from "@/components/common/GradationButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StartRootStackParam } from "../navigation/StartStackNavigation";

export function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { height: top }]}>
      <StatusBar backgroundColor="#fff" />
      <Image style={styles.logo} source={require("@assets/images/logo_ver2.png")} />
      <TouchableOpacity style={styles.buttonBox} onPressIn={() => navigation.navigate("login")}>
        <GradationButton text="로그인" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBox} onPressIn={() => navigation.navigate("signup")}>
        <GradationButton text="회원가입" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
