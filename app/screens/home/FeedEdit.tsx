import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

import { postsUrl } from "@/utils/apiUrls";
import { useAccessToken } from "@/hooks/useAccessToken";

export type RootStackParam = {
  homeMain: undefined;
  feedEdit: { postNumber: number };
};

// const goAlert = () =>
//   Alert.alert(
//     // 말그대로 Alert를 띄운다
//     "해당 피드를", // 첫번째 text: 타이틀 제목
//     "삭제하시겠어요?", // 두번째 text: 그 밑에 작은 제목
//     [
//       // 버튼 배열
//       {
//         text: "아니요", // 버튼 제목
//         onPress: () => console.log("아니라는데"), //onPress 이벤트시 콘솔창에 로그를 찍는다
//         style: "cancel",
//       },
//       { text: "네", onPress: () => console.log("그렇다는데") }, //버튼 제목
//       // 이벤트 발생시 로그를 찍는다
//     ],
//     { cancelable: false },
//   );

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Post {
  content: string;
  createdAt: string;
  deletedAt: string | null;
  postNumber: number;
  title: string;
  user: {
    birthYear: string;
    createdAt: string;
    deletedAt: string | null;
    nickname: string;
    phoneNumber: string;
    profileImage: string | null;
    role: string;
    state: string;
    updatedAt: string;
    userId: string;
  };
}

interface Props {
  route: {
    params: {
      postNumber: number;
    };
  };
}

export function FeedEdit({ route }: Props): React.JSX.Element {
  const { postNumber } = route.params;
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [postsData, setPostsData] = useState();
  const { getAccessTokenFromAsyncStorage } = useAccessToken();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  useEffect(() => {
    getPostData(postNumber);
  }, [postNumber]);

  const getPostData = async (postNumber: number) => {
    const token = await getAccessTokenFromAsyncStorage();
    try {
      const res = await fetch(`${postsUrl}/${postNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        setTitle(data.data.title);
        setContents(data.data.content);
      } else {
        console.error("데이터를 가져오는데 실패했습니다.", data);
      }
    } catch (err) {
      console.error("getposts error : ", err);
    }
  };

  const editPostsData = async () => {
    const token = await getAccessTokenFromAsyncStorage();
    const postData = {
      title: title,
      content: contents,
    };

    try {
      const res = await fetch(`${postsUrl}/${postNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData), // 요청 데이터를 JSON 문자열로 변환하여 전송
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        navigation.navigate("homeMain");
      } else {
        console.error("요청에 실패했습니다.", data);
      }
    } catch (err) {
      console.error("addposts error : ", err);
    }
  };

  console.log(postNumber);

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
          <TouchableOpacity style={styles.editBtn} onPress={editPostsData}>
            <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
              <Text style={styles.editBtnText}>
                수정하기 <Icon name="angle-right" size={20} />
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
