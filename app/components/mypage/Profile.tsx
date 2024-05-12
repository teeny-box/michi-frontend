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
      <View style={styles.image}>
        <Image source={{ uri: "https://i.pinimg.com/564x/b4/b4/5f/b4b45f38fb15427b0f609f011b44f384.jpg" }} style={styles.image} />
      </View>
      <View style={styles.nicknameBox}>
        <Text style={styles.nickname}>맹구콧물</Text>
        <MaterialCommunityIcons name="account-edit" size={26} onPress={() => navigation.navigate("changeProfile")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flexDirection: "row",
    padding: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  nicknameBox: {
    alignSelf: "center",
    marginLeft: 10,
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  nickname: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
  },
});
