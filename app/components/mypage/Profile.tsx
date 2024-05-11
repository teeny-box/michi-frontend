import { Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function Profile() {
  return (
    <View style={styles.outBox}>
      <View style={styles.image}>
        <Image source={{ uri: "https://i.pinimg.com/564x/b4/b4/5f/b4b45f38fb15427b0f609f011b44f384.jpg" }} style={styles.image} />
      </View>
      <View style={styles.nicknameBox}>
        <Text style={styles.nickname}>맹구콧물</Text>
        <MaterialCommunityIcons name="account-edit" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flexDirection: "row",
    backgroundColor:
      "linear-gradient(to right, rgba(15, 15, 15, 0.508) 0%, rgba(15, 15, 15, 0.697) 35%, rgba(15, 15, 15, 0.697) 65%, rgba(15, 15, 15, 0.508) 100%)",
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
  },
  nickname: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
  },
});
