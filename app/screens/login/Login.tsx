import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  main: undefined;
};

export function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>로그인 페이지</Text>
        <TextInput value={id} onChangeText={setId} style={styles.input} placeholder="ID" />
        <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} placeholder="PASSWORD" />
        <TouchableOpacity style={styles.longinButton} onPressIn={() => navigation.replace("main")}>
          <Text style={styles.longinButtonText}>LOGIN BUTTON</Text>
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
