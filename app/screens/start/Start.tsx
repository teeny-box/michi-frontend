import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type RootStackParam = {
  signup: undefined;
  login: undefined;
};

export function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>michi</Text>
        <TouchableOpacity onPressIn={() => navigation.navigate("login")}>
          <Text>login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => navigation.navigate("signup")}>
          <Text>signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  title: {
    flex: 1,
    color: "black",
    fontSize: 30,
  },
});
