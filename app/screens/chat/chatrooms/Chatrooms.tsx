import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";

export type RootStackParam = {
  inChat: undefined;
};

export function Chatrooms(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.chatBanner} onPress={() => navigation.navigate("inChat")}>
        <Text>실시간 랜덤채팅 배너</Text>
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <Icon name="search" size={16} style={{ color: "#939398", paddingRight: 4 }} />
        <TextInput placeholder="검색" />
      </View>
      <View style={styles.chatList}>
        <Text>메세지</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
  chatBanner: {
    flex: 3,

    backgroundColor: "#7000FF",

    alignItems: "center",
    justifyContent: "center",
  },

  searchBar: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "#F2F5F7",

    margin: 10,
    padding: 10,

    borderRadius: 10,

    alignItems: "center",
    justifyContent: "flex-start",
  },

  chatList: {
    flex: 10,
    backgroundColor: "#FFFFFF",
    margin: 10,
  },
});
