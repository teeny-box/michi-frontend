import { userState } from "@/recoil/authAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRecoilValue } from "recoil";

export type RootStackParam = {
  changeProfile: undefined;
};

export function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const userData = useRecoilValue(userState);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(require("@assets/images/user_default_image.png"));

  const handlePressChangeProfile = () => {
    navigation.navigate("changeProfile");
  };

  useEffect(() => {
    userData.profileImage && setProfileImage({ uri: userData.profileImage });
  }, []);

  return (
    <View style={styles.outBox}>
      <TouchableOpacity style={styles.imageBox} onPress={handlePressChangeProfile}>
        <Image source={require("@assets/images/circle_border.png")} style={styles.borderImage} />
        <Image
          source={profileImage}
          onError={() => {
            setProfileImage(require("@assets/images/user_default_image.png"));
          }}
          style={styles.userImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nicknameBox} onPress={handlePressChangeProfile}>
        <Text style={styles.nickname}>{userData.nickname}</Text>
        <MaterialCommunityIcons name="account-edit" size={26} />
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
    justifyContent: "space-between",
  },
  nickname: {
    color: "#141414",
    fontSize: 24,
    fontFamily: "WavvePADO-Regular",
    lineHeight: 26,
  },
});
