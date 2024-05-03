import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  id: undefined;
  password: undefined;
  birthyear: undefined;
};

export function Nickname(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [nickname, setNickname] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>닉네임을 입력하세요</Text>
        <TextInput value={nickname} onChangeText={setNickname} style={styles.input} />
        <TouchableOpacity onPressIn={() => navigation.navigate("birthyear")}>
          <Text>NEXT BUTTON</Text>
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
});
