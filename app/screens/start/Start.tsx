import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type RootStackParam = {
  signup: undefined;
  login: undefined;
};

export function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>michi</Text>
        <Icon name="forward" size={30} color="#4F8EF7" />
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPressIn={() => navigation.navigate("login")} style={styles.button}>
          <Text style={styles.buttonText}>login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => navigation.navigate("signup")} style={styles.button}>
          <Text style={styles.buttonText}>signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7000FF",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 50,
  },
  body: { flex: 1, flexDirection: "row", justifyContent: "center", gap: 10, alignItems: "center" },
  button: {
    width: 100,
    height: 40,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});
