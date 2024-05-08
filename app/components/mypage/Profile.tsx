import { Image, StyleSheet, Text, View } from "react-native";

export function Profile() {
  return (
    <View style={styles.outBox}>
      <View style={styles.image}>
        <Image source={{ uri: "https://i.pinimg.com/564x/b4/b4/5f/b4b45f38fb15427b0f609f011b44f384.jpg" }} style={styles.image} />
      </View>
      <View style={styles.nicknameBox}>
        <Text style={styles.nickname}>맹구귀여워</Text>
        {/* <MaterialIcons name="edit" size={24} color="black" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flexDirection: "row",
    backgroundColor: "red",
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
