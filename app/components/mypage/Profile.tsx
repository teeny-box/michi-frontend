import { userState } from "@/recoil/authAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";

const defaultImage = require("@assets/images/user_default_image.png");

export type RootStackParam = {
  changeProfile: undefined;
};

export function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const userData = useRecoilValue(userState);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(defaultImage);

  const handlePressChangeProfile = () => {
    navigation.navigate("changeProfile");
  };

  useEffect(() => {
    setProfileImage(userData.profileImage ? { uri: userData.profileImage } : defaultImage);
  }, [userData]);

  return (
    <View style={styles.outBox}>
      <TouchableOpacity style={styles.imageBox} onPress={handlePressChangeProfile}>
        <Image source={require("@assets/images/circle/circle_border.png")} style={styles.borderImage} alt="프로필 이미지 링" />
        <Image
          source={profileImage}
          onError={() => {
            setProfileImage(defaultImage);
          }}
          style={styles.userImage}
          alt="프로필 이미지"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nicknameBox} onPress={handlePressChangeProfile}>
        <Text style={styles.nickname}>{userData.nickname}</Text>
        <Image source={require("@assets/images/icon/edit.png")} alt="수정 아이콘" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    marginVertical: 25,
    alignItems: "center",
  },
  imageBox: {
    width: 80,
    height: 80,
    borderRadius: 100,
    position: "relative",
  },
  borderImage: {
    width: 80,
    height: 80,
    position: "absolute",
  },
  userImage: {
    width: 80 - 8 * 2,
    height: 80 - 8 * 2,
    borderRadius: 100,
    margin: "auto",
  },
  nicknameBox: {
    paddingBottom: 10,
    marginTop: 16,
    marginLeft: 10,
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    columnGap: 6,
  },
  nickname: {
    color: "#141414",
    fontSize: 24,
    fontFamily: "JalnanGothic",
  },
});
