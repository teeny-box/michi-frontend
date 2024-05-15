import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  mypage: undefined;
};

export function ChangePassword() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [id, setId] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>비밀번호 변경하기</Text>
        <Text style={styles.label}>현재 비밀번호</Text>
        <TextInput value={id} secureTextEntry={true} onChangeText={setId} style={styles.input} />
        <Text>비밀번호가 일치하지 않습니다.</Text>

        <Text style={styles.label}>새 비밀번호</Text>
        <TextInput value={id} secureTextEntry={true} onChangeText={setId} style={styles.input} />
        <Text>영어/숫자/특수문자를 포함해 주세요.</Text>

        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput value={id} secureTextEntry={true} onChangeText={setId} style={styles.input} />
        <Text>비밀번호가 일치하지 않습니다.</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("mypage")}>
          <Text>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 40,
    marginVertical: 20,
  },

  title: {
    color: "black",
    fontSize: 26,
  },

  label: {
    fontSize: 12,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },

  button: {
    backgroundColor: "pink",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
});
