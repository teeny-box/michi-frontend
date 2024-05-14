import { tokenState } from "@/recoil/authAtoms";
import { setAsyncStorage } from "@/storage/AsyncStorage";
import { authUrl } from "@/utils/apiUrls";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import { StartRootStackParam } from "../navigation/StartStackNavigation";
import { Gradation } from "@/components/common/Gradation";
import LinearGradient from "react-native-linear-gradient";
import { TextInputField } from "@/components/signup/TextInputField";
import { GradationButton } from "@/components/common/GradationButton";

export function Login() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useSetRecoilState(tokenState);

  const login = async () => {
    try {
      const res = await fetch(`${authUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: id,
          password,
        }),
      });

      if (res.ok) {
        console.log("login success");
        const authorizationHeader = res.headers.get("Authorization");
        if (authorizationHeader) {
          const accessToken = authorizationHeader.split(" ")[1];
          setToken(accessToken);
          setAsyncStorage("token", accessToken);
          return 1;
        }
      }
      return 0;
    } catch (err) {
      console.error("login error : ", err);
      return 0;
    }
  };

  const handlePressLoginButton = async () => {
    // const success = await login();

    // --- 개발용 ---
    const success = true;
    setToken("qwer");
    setAsyncStorage("token", "qwer");
    // --------------

    if (!success) {
      Alert.alert("로그인 실패", "아이디 또는 비밀번호를 다시 확인해주세요.", [{ text: "OK" }]);
    }
  };

  const handlePressFindID = () => {
    navigation.push("findId_login");
  };

  const handlePressFindPassword = () => {
    navigation.push("findPassword_login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.bgCircle, { width: width * 1.8, top: -(width / 1.8) }]}></View>
      <LinearGradient style={styles.bgBottom} colors={["#AA94F7", "#759AF3"]}></LinearGradient>
      <ScrollView style={styles.scrollBox}>
        <View style={styles.contentsBox}>
          <Image source={require("@assets/images/logo_ver2.png")} style={styles.logoImage} />
          <View style={{ width: "100%" }}>
            <TextInputField label="아이디 ID" value={id} setValue={setId} placeholder="아이디를 입력하세요" />
            <TextInputField label="비밀번호 P/W" value={password} setValue={setPassword} placeholder="비밀번호를 입력하세요" secureTextEntry={true} />
          </View>
          <TouchableOpacity style={styles.longinButton} onPressIn={handlePressLoginButton}>
            <GradationButton text="로그인" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomBox}>
        <TouchableOpacity onPressIn={handlePressFindID} style={styles.findButton}>
          <Text>아이디 ID 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={handlePressFindPassword}>
          <Text>비밀번호 P/W 찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 180,
    height: 120,
    objectFit: "contain",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  scrollBox: {
    width: "100%",
    flexGrow: 0,
  },

  contentsBox: {
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 90,
    alignItems: "center",
    gap: 22,
  },

  bottomBox: {
    flex: 1,
    flexDirection: "row",
    gap: 33,
  },

  findButton: {
    height: 20,
  },

  longinButton: {
    width: 250,
    height: 45,
  },

  bgCircle: {
    position: "absolute",
    backgroundColor: "#fff",
    aspectRatio: 1 / 1,
    borderRadius: 1000,
    zIndex: -1,
  },

  bgBottom: {
    position: "absolute",
    width: "100%",
    height: "40%",
    bottom: 0,
    zIndex: -2,
  },
});
