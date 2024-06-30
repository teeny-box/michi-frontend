import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, SafeAreaView, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

import { postsUrl } from "@/utils/apiUrls";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useAlert } from "@/hooks/useAlert"; // useAlert 훅 임포트

export type RootStackParam = {
  homeMain: undefined;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function FeedCreat(): React.JSX.Element {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const { getAccessTokenFromAsyncStorage } = useAccessToken();
  const { setAlertState } = useAlert(); // useAlert 훅 사용
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const addpostsData = async () => {
    const token = await getAccessTokenFromAsyncStorage();
    const postData = {
      title: title,
      content: contents,
    };

    try {
      const res = await fetch(`${postsUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData), // 요청 데이터를 JSON 문자열로 변환하여 전송
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 201) {
        navigation.navigate("homeMain");
      } else {
        console.error("요청에 실패했습니다.", data);
      }
    } catch (err) {
      console.error("addposts error : ", err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = (e) => {
        e.preventDefault();
        setAlertState({ open: true, title: "경고", desc: "뒤로 가시겠습니까?", defaultText: "확인" });
        
        // Alert 사용하여 뒤로 가기 확인
        Alert.alert(
          "경고",
          "뒤로 가시겠습니까?",
          [
            {
              text: "취소",
              style: "cancel",
            },
            {
              text: "확인",
              onPress: () => navigation.goBack(),
            },
          ],
          { cancelable: false }
        );
      };

      navigation.addListener('beforeRemove', onBackPress);

      return () => {
        navigation.removeListener('beforeRemove', onBackPress);
      };
    }, [navigation, setAlertState])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <TextInput value={title} onChangeText={setTitle} style={styles.titleInput} placeholder="제목을 입력하세요." placeholderTextColor={"#111"} />
          <Text style={styles.titleInputInfo}>*제목 글자 수 26자 이내</Text>
          <TextInput
            editable
            multiline
            numberOfLines={12}
            maxLength={500}
            value={contents}
            onChangeText={setContents}
            style={styles.contentsInput}
            placeholder="내용을 입력하세요."
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.editBtn} onPress={addpostsData}>
            <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
              <Text style={styles.editBtnText}>
                작성하기 <Icon name="angle-right" size={20} />
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    width: "86%",
  },
  body: {
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: "#fff",
  },
  titleInput: {
    marginTop: "5%",
    height: "10%",
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
  footer: {
    height: SCREEN_HEIGHT * 0.5,
  },
  editBtn: {
    height: 50,
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