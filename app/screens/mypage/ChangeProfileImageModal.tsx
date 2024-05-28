import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, StatusBar, StyleSheet, Text, View, Pressable } from "react-native";
import { Asset, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { MypageRootStackParam } from "../navigation/MyPageStack";
import { changeProfileImageState } from "@/recoil/mypageAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/recoil/authAtoms";
import { imagesUrl } from "@/utils/apiUrls";

export function ChangeProfileImageModal() {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const setNewProfileImage = useSetRecoilState(changeProfileImageState);
  const userData = useRecoilValue(userState);
  const [openModal, setOpenModal] = useState(true);
  const translateY = useRef(new Animated.Value(400)).current; // 초기 위치를 아래쪽으로 설정

  const uploadProfileImage = async (file: Asset) => {
    if (file.fileSize && file.fileSize > 1024 * 1024 * 5) {
      console.log("사진은 최대 5MB까지 업로드 가능합니다.");
      // toast 처리하기
      return;
    }

    const res = await fetch(imagesUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.fileName }),
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      console.error(data);
      return false;
    }

    const uploadRes = await fetch(data.data.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "image/png" },
      body: file.base64,
    });

    if (uploadRes.ok) {
      setNewProfileImage(data.public_url);
    } else {
      // Alert.alert("이미지 업로드에 실패했습니다.", "잠시 후 다시 시도해주세요.", [{ text: "ok" }]);
      console.log("image upload failed");
    }
  };

  const openCamera = async () => {
    closeModal();
    try {
      const res = await launchCamera({
        mediaType: "photo",
        includeBase64: true,
      });
      if (res.assets?.length) {
        const file = res.assets[0];
        console.log(file.fileName);
        await uploadProfileImage(file);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPhotos = async () => {
    closeModal();
    try {
      const res = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: true,
      });
      if (res.assets?.length) {
        const file = res.assets[0];
        console.log(file.fileName);
        await uploadProfileImage(file);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetImage = () => {
    closeModal();
    setNewProfileImage(userData.profileImage);
  };

  const setDefaultImage = () => {
    closeModal();
    setNewProfileImage(null);
  };

  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  };

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

  return (
    <>
      <StatusBar backgroundColor={"rgba(0, 0, 0, 0.3)"} />
      <View style={styles.modalScreen}>
        <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0, 0, 0, 0.3)" }]} onPress={closeModal} />
        <Animated.View style={[styles.modalBox, { transform: [{ translateY }] }]}>
          <TouchableOpacity onPress={openCamera} style={styles.listItem}>
            <Text style={styles.listText}>카메라로 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getPhotos} style={styles.listItem}>
            <Text style={styles.listText}>앨범에서 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetImage} style={styles.listItem}>
            <Text style={styles.listText}>원래대로</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={setDefaultImage} style={styles.listItem}>
            <Text style={styles.listText}>기본 이미지</Text>
          </TouchableOpacity>
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
