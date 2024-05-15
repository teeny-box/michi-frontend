import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type RootStackParam = {
  changeProfile: undefined;
};

export function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const handlePressChangeProfile = () => {
    navigation.navigate("changeProfile");
  };

  return (
    <View style={styles.outBox}>
      <TouchableOpacity style={styles.imageBox} onPress={handlePressChangeProfile}>
        <Image source={require("@assets/images/circle_border.png")} style={styles.borderImage} />
        <Image source={{ uri: "https://i.pinimg.com/564x/b4/b4/5f/b4b45f38fb15427b0f609f011b44f384.jpg" }} style={styles.userImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nicknameBox} onPress={handlePressChangeProfile}>
        <Text style={styles.nickname}>맹구콧물띄어쓰기없이</Text>
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
