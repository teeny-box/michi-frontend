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
import Toast from "react-native-toast-message";
import { decode } from "base64-arraybuffer";
import { useLoadingScreen } from "@/hook/useLoadingScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ChangeProfileImageModal() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const setNewProfileImage = useSetRecoilState(changeProfileImageState);
  const userData = useRecoilValue(userState);
  const [openModal, setOpenModal] = useState(true);
  const translateY = useRef(new Animated.Value(400)).current; // 초기 위치를 아래쪽으로 설정
  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();

  const uploadProfileImage = async (file: Asset) => {
    openLoadingScreen();
    try {
      if (file.fileSize && file.fileSize > 1024 * 1024 * 5) {
        Toast.show({ text1: "사진은 최대 5MB까지 업로드 가능합니다." });
        return;
      }

      if (!file.base64) {
        Toast.show({ text1: "사진 업로드에 실패했습니다." });
        return;
      }

      // get presignedURL
      const res = await fetch(imagesUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.fileName, fileSize: file.fileSize }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return false;
      }

      // Upload
      const arrayBuffer = decode(file.base64);

      const uploadRes = await fetch(data.data.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": "image/jpeg" },
        body: arrayBuffer,
      });

      if (uploadRes.ok) {
        setNewProfileImage(data.data.publicUrl);
      } else {
        Toast.show({ text1: "사진 업로드에 실패했습니다. 다시 시도해주세요." });
        console.log("image upload failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      closeLoadingScreen();
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
      <View style={[styles.modalScreen, { paddingTop: top }]}>
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
