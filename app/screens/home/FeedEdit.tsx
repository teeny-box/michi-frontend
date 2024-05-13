import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";

export type RootStackParam = {
  main: undefined;
};

export function FeedEdit(): React.JSX.Element {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("main")}>
          <Icon name="arrow-left" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerText}>피드 작성하기</Text>
      </View>
      <View style={styles.body}>
        <TextInput value={title} onChangeText={setTitle} style={styles.titleInput} placeholder="제목을 입력하세요." placeholderTextColor={"#111"} />
        <Text style={styles.titleInputInfo}>*제목 글자 수 26자 이내</Text>
        <TextInput value={contents} onChangeText={setContents} style={styles.contentsInput} placeholder="내용을 입력하세요." />
      </View>
      <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("main")}>
        <Text style={styles.editBtnText}>
          작성하기 <Icon name="angle-right" size={20} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "86%",
    height: "10%",
  },
  headerText: {
    fontSize: 20,
    marginLeft: "3%",
  },
  body: {
    width: "86%",
    height: "65%",
  },
  titleInput: {
    height: "8%",
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#9597A4",
  },
  titleInputInfo: {
    marginTop: "2%",
    color: "#7000FF",
  },
  contentsInput: {
    height: "75%",
    borderBottomWidth: 1,
    borderBottomColor: "#9597A4",
  },
  editBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "86%",
    height: "7%",
    backgroundColor: "#AB94F7",
  },
  editBtnText: {
    fontSize: 20,
    color: "#fff",
  },
});
