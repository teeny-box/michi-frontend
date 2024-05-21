import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userUrl } from "@/utils/apiUrls";
import { TextInputField } from "@/components/common/TextInputField";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { GradationButton } from "@/components/common/GradationButton";
import { MypageRootStackParam } from "../navigation/MyPageStack";
import { accessTokenState, userState } from "@/recoil/authAtoms";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, RESULTS, requestMultiple } from "react-native-permissions";
import { useAccessToken } from "@/hook/useAccessToken";

// 영문자, 숫자, 한글로만 이루어져야 합니다.
// 길이는 2자 이상 10자 이하여야 합니다.
const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
const defaultMessage = "* 한글, 영어, 숫자만 사용해주세요.\n* 2자 이상 10자 이내로 입력해주세요.";

export function ChangeProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const { updateToken, getTokenFromAsyncStorege } = useAccessToken();
  const [userData, setUserData] = useRecoilState(userState);
  const [newNickname, setNewNickname] = useState<string>(userData.nickname || "");
  const [checkMessage, setCheckMessage] = useState(defaultMessage);
  const [isAvailable, setIsAvailable] = useState(true);
  const [newProfileImage, setNewProfileImage] = useState<string | null>(userData.profileImage);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  const uploadProfileImage = async () => {
    return ""; // return URL or ""
  };

  const openCamera = async () => {
    try {
      const res = await launchCamera({
        mediaType: "photo",
        includeBase64: true,
      });
      if (res.assets) {
        const uri = res.assets[0].uri || null;
        console.log(uri);
        setNewProfileImage(uri);
        // const uploadURL = await uploadProfileImage();
        // if (uploadURL) {
        //   setNewProfileImage(uploadURL);
        // } else {
        //   Alert.alert("이미지 업로드에 실패했습니다.", "잠시 후 다시 시도해주세요.", [{ text: "ok" }]);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPhotos = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: "photo",
      });
      if (res.assets) {
        const uri = res.assets[0].uri || null;
        console.log(uri);
        setNewProfileImage(uri);
        // const uploadURL = await uploadProfileImage();
        // if (uploadURL) {
        //   setNewProfileImage(uploadURL);
        // } else {
        //   Alert.alert("이미지 업로드에 실패했습니다.", "잠시 후 다시 시도해주세요.", [{ text: "ok" }]);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetImage = () => {
    setNewProfileImage(userData.profileImage);
  };

  const setDefaultImage = () => {
    setNewProfileImage(null);
  };

  const handleChangeProfileImage = async () => {
    if (Platform.OS !== "ios" && Platform.OS !== "android") {
      return;
    }

    const platformPermissions =
      Platform.OS === "ios" ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY] : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];

    const granted = await requestMultiple(platformPermissions);

    const allGranted = platformPermissions.reduce((bool, item) => bool && granted[item] === RESULTS.GRANTED, true);
    console.log(granted, allGranted);

    if (allGranted) {
      Alert.alert("골라", "", [
        // { text: "카메라로 찍기", onPress: openCamera },
        { text: "앨범에서 선택", onPress: getPhotos },
        { text: "원래대로", onPress: resetImage },
        { text: "기본 이미지", onPress: setDefaultImage },
      ]);
    }
  };

  const nicknameValidation = async (text: string) => {
    setIsAvailable(false);

    if (!regex.test(text)) {
      if (/[^a-zA-Z0-9가-힣]/.test(text)) {
        setCheckMessage("* 한글, 영어, 숫자만 사용해주세요.");
      } else {
        setCheckMessage("* 2자 이상 입력해주세요.");
      }
      return;
    }

    try {
      const res = await fetch(`${userUrl}/nickname-check/${text}`);
      if (res.ok) {
        setCheckMessage("사용 가능한 닉네임입니다.");
        setIsAvailable(true);
      } else {
        setCheckMessage("* 이미 사용 중인 닉네임입니다.");
      }
    } catch (e) {
      console.error("error", e);
      setCheckMessage("* 사용할 수 없는 닉네임입니다.");
    }
  };

  const handleChangeNickname = (text: string) => {
    setNewNickname(text);

    // 유효성 검사
    if (!text) {
      clearTimeout(timer);
      setCheckMessage(defaultMessage);
      setIsAvailable(false);
      return;
    }

    if (text === userData.nickname) {
      clearTimeout(timer);
      setCheckMessage(defaultMessage);
      setIsAvailable(true);
      return;
    }

    setCheckMessage("...");
    setIsAvailable(false);

    // 중복 검사(api) 디바운싱
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      nicknameValidation(text);
    }, 500);
    setTimer(newTimer);
  };

  const updateUserData = async (): Promise<1 | undefined> => {
    const token = await getTokenFromAsyncStorege();

    try {
      const res = await fetch(userUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          nickname: newNickname || userData.nickname,
          profileImage: newProfileImage,
        }),
      });

      if (res.ok) {
        setUserData({ ...userData, nickname: newNickname, profileImage: newProfileImage });
        return 1;
      } else if (res.status === 401) {
        const success = await updateToken();
        if (success) return await updateUserData();
      }
    } catch (err) {
      console.error("update user error : ", err);
    }
  };

  const handlePressSubmitButton = async () => {
    const success = await updateUserData();

    if (success) {
      navigation.pop();
    }
  };

  return (
    <SafeAreaView style={styles.outBox}>
      <TouchableOpacity onPress={handleChangeProfileImage} style={styles.imageBox}>
        <Image source={require("@assets/images/circle_border.png")} style={styles.borderImage} />
        <Image source={newProfileImage ? { uri: newProfileImage } : require("@assets/images/user_default_image.png")} style={styles.userImage} />
      </TouchableOpacity>
      <View style={styles.nicknameBox}>
        <TextInputField
          label="닉네임"
          value={newNickname}
          setValue={handleChangeNickname}
          maxLength={10}
          message={checkMessage}
          isAvailable={userData.nickname !== newNickname ? isAvailable : undefined}
          placeholder={userData.nickname || "닉네임을 입력하세요"}
        />
      </View>
      {(userData.nickname !== newNickname && isAvailable) || userData.profileImage !== newProfileImage ? (
        <TouchableOpacity onPress={handlePressSubmitButton} style={styles.submitButton}>
          <GradationButton text="수정완료" />
        </TouchableOpacity>
      ) : (
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText}>수정완료</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "relative",
  },

  borderImage: {
    width: 100,
    height: 100,
    position: "absolute",
  },

  userImage: {
    width: 100 - 10 * 2,
    height: 100 - 10 * 2,
    borderRadius: 100,
    margin: "auto",
  },

  nicknameBox: {
    width: "100%",
    marginTop: 30,
  },

  nickname: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
  },

  submitButton: {
    backgroundColor: "lightgrey",
    width: "100%",
    height: 45,
  },

  submitButtonText: {
    color: "#fff",
    margin: "auto",
    fontSize: 16,
    fontFamily: "Freesentation-5Medium",
  },
});
