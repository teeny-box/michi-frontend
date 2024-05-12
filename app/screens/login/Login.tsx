import { tokenState } from "@/recoil/authAtoms";
import { setAsyncStorage } from "@/storage/AsyncStorage";
import { authUrl } from "@/utils/apiUrls";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";

export type RootStackParam = {
  main: undefined;
};

export function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
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
    const success = true;
    setToken("qwer");
    setAsyncStorage("token", "qwer");

    if (!success) {
      Alert.alert("로그인 실패", "아이디 또는 비밀번호를 다시 확인해주세요.", [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>로그인 페이지</Text>
        <TextInput value={id} onChangeText={setId} style={styles.input} placeholder="ID" />
        <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} placeholder="PASSWORD" />
        <TouchableOpacity style={styles.longinButton} onPressIn={handlePressLoginButton}>
          <Text style={styles.longinButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPressIn={() => navigation.replace("main")}>
            <Text>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPressIn={() => navigation.replace("main")}>
            <Text>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "black",
    fontSize: 26,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
  },

  longinButton: {
    width: 250,
    padding: 10,
    backgroundColor: "purple",
  },

  longinButtonText: {
    color: "white",
    textAlign: "center",
  },
});
