import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  main: undefined;
};

export function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red" }}>
      <View>
        <Text style={{ color: "black", fontSize: 30 }}>id</Text>
        <TouchableOpacity onPressIn={() => navigation.replace("main")}>
          <Text>go to pass</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
