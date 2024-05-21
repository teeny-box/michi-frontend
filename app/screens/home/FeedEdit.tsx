import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

export type RootStackParam = {
  feed: undefined;
};

export function FeedEdit(): React.JSX.Element {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <TextInput value={title} onChangeText={setTitle} style={styles.titleInput} placeholder="제목을 입력하세요." placeholderTextColor={"#111"} />
        <Text style={styles.titleInputInfo}>*제목 글자 수 26자 이내</Text>
        <TextInput
          editable
          multiline
          numberOfLines={10}
          maxLength={300}
          value={contents}
          onChangeText={setContents}
          style={styles.contentsInput}
          placeholder="내용을 입력하세요."
        />
      </View>
      <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("feed")}>
        <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
          <Text style={styles.editBtnText}>
            작성하기 <Icon name="angle-right" size={20} />
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  body: {
    width: "86%",
    height: "70%",
  },
  titleInput: {
    height: "12%",
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#9597A4",
  },
  titleInputInfo: {
    marginTop: "2%",
    marginBottom: "8%",
    color: "#7000FF",
  },
  contentsInput: {
    height: "60%",
    borderBottomWidth: 1,
    borderBottomColor: "#9597A4",
  },
  editBtn: {
    width: "86%",
    height: "7%",
    backgroundColor: "#AB94F7",
  },
  linearGradient: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  editBtnText: {
    fontSize: 20,
    color: "#fff",
  },
});
