import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  signup: undefined;
  login: undefined;
};

export function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ color: "black", fontSize: 30 }}>michi</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
});
