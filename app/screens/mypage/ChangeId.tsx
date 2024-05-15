import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  mypage: undefined;
};

export function ChangeId() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [id, setId] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>아이디 변경하기</Text>
        <TextInput value={id} onChangeText={setId} style={styles.input} />
        <Text>사용 가능한 아이디입니다.</Text>
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
