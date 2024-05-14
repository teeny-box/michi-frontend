import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type RootStackParam = {
  changeProfile: undefined;
};

export function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={styles.outBox}>
      <View style={styles.imageBox}>
        <Image source={require("@assets/images/circle_border.png")} style={styles.borderImage} />
        <Image source={{ uri: "https://i.pinimg.com/564x/b4/b4/5f/b4b45f38fb15427b0f609f011b44f384.jpg" }} style={styles.userImage} />
      </View>
      <View style={styles.nicknameBox}>
        <Text style={styles.nickname}>맹구콧물띄어쓰기없이</Text>
        <MaterialCommunityIcons name="account-edit" size={26} onPress={() => navigation.navigate("changeProfile")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flexDirection: "row",
    marginBottom: 25,
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
    alignSelf: "flex-end",
    paddingBottom: 10,
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
