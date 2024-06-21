import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { userUrl } from "@/utils/apiUrls";
import { TextInputField } from "@/components/common/TextInputField";
import { Image, StyleSheet, TouchableOpacity, View, Platform, Pressable, Text, Keyboard } from "react-native";
import { useRecoilState } from "recoil";
import { GradationButton } from "@/components/common/GradationButton";
import { MypageRootStackParam } from "../navigation/MyPageStack";
import { userState } from "@/recoil/authAtoms";

import { PERMISSIONS, RESULTS, requestMultiple } from "react-native-permissions";
import { useAccessToken } from "@/hooks/useAccessToken";
import { changeProfileImageState } from "@/recoil/mypageAtoms";
import Toast from "react-native-toast-message";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";

// 영문자, 숫자, 한글로만 이루어져야 합니다.
// 길이는 2자 이상 10자 이하여야 합니다.
const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
const defaultMessage = "* 한글, 영어, 숫자만 사용해주세요.\n* 2자 이상 10자 이내로 입력해주세요.";

export function ChangeProfile() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MypageRootStackParam>>();
  const { updateToken, getAccessTokenFromAsyncStorage } = useAccessToken();
  const [userData, setUserData] = useRecoilState(userState);
  const [newNickname, setNewNickname] = useState<string>(userData.nickname || "");
  const [checkMessage, setCheckMessage] = useState(defaultMessage);
  const [isAvailable, setIsAvailable] = useState(true);
  const [newProfileImage, setNewProfileImage] = useRecoilState(changeProfileImageState);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>(); // 디바운싱 타이머

  const { openLoadingScreen, closeLoadingScreen } = useLoadingScreen();

  const handleChangeProfileImage = async () => {
    Keyboard.dismiss();
    if (Platform.OS !== "ios" && Platform.OS !== "android") {
      return;
    }

    const platformPermissions =
      Platform.OS === "ios" ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY] : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];

    const granted = await requestMultiple(platformPermissions);

    const allGranted = platformPermissions.reduce((bool, item) => bool && granted[item] === RESULTS.GRANTED, true);

    if (allGranted) {
      navigation.navigate("changeProfileImageModal");
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
    openLoadingScreen();
    const token = await getAccessTokenFromAsyncStorage();

    try {
      const res = await fetch(userUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          nickname: newNickname || userData.nickname,
          profileImage: newProfileImage,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setUserData(data.data);
        return 1;
      } else if (res.status === 401) {
        const success = await updateToken();
        if (success) return await updateUserData();
      }
    } catch (err) {
      console.error("update user error : ", err);
    } finally {
      closeLoadingScreen();
    }
  };

  const handlePressSubmitButton = async () => {
    const success = await updateUserData();

    if (success) {
      navigation.pop();
      Toast.show({ text1: "프로필이 변경되었습니다." });
    }
  };

  useEffect(() => {
    setNewProfileImage(userData.profileImage);
  }, [userData]);

  useEffect(() => {
    const disabled = !((userData.nickname !== newNickname && isAvailable) || userData.profileImage !== newProfileImage);
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handlePressSubmitButton} disabled={disabled}>
          <Text style={[styles.headerRightText, disabled ? { color: "gray" } : { color: "#7000ff" }]}>완료</Text>
        </Pressable>
      ),
    });
  }, [newNickname, newProfileImage]);

  return (
    <View style={[styles.outBox, { paddingTop: top }]}>
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
      <GradationButton
        text="수정완료"
        onPress={handlePressSubmitButton}
        disabled={!((userData.nickname !== newNickname && isAvailable) || userData.profileImage !== newProfileImage)}
      />
    </View>
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

  headerRightText: {
    fontFamily: "NotoSansKR-SemiBold",
    fontSize: 20,
  },
});
