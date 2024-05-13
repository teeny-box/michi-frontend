import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export function Chatting(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainchat}>
        <Text>메인 채팅</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="메시지 보내기..." />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  mainchat: {
    flex: 5,
  },

  textInput: {
    flex: 0.3,
    flexDirection: "row",
    backgroundColor: "#F2F5F7",

    marginHorizontal: 16,
    marginVertical: 6,
    paddingHorizontal: 14,

    borderRadius: 50,

    alignItems: "center",
    justifyContent: "flex-start",
  },
});
