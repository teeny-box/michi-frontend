import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MypageRootStackParam } from "../navigation/MyPageStack";

export function ChangeProfileImageModal() {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const [openModal, setOpenModal] = useState(true);
  const translateY = useRef(new Animated.Value(400)).current; // 초기 위치를 아래쪽으로 설정

  useEffect(() => {
    if (openModal) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [openModal]);

  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  };

  return (
    <>
      <View style={styles.modalScreen}>
        <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0, 0, 0, 0.3)" }]} onPress={closeModal} />
        <Animated.View style={[styles.modalBox, { transform: [{ translateY }] }]}>
          <Pressable style={styles.listItem}>
            <Text style={styles.listText}>카메라로 찍기</Text>
          </Pressable>
          <Pressable style={styles.listItem}>
            <Text style={styles.listText}>앨범에서 선택</Text>
          </Pressable>
          <Pressable style={styles.listItem}>
            <Text style={styles.listText}>원래대로</Text>
          </Pressable>
          <Pressable style={styles.listItem}>
            <Text style={styles.listText}>기본 이미지</Text>
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalScreen: {
    height: "100%",
  },

  modalBox: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    rowGap: 10,
  },

  listItem: {
    height: 40,
  },

  listText: {
    margin: "auto",
    fontSize: 16,
    fontFamily: "Freesentation-6SemiBold",
  },
});
