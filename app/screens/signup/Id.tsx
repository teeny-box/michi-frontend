import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  id: undefined;
  password: undefined;
  nickname: undefined;
};

export function Id() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView>
      <View>
        <Text style={{ color: "black", fontSize: 30 }}>id</Text>
        <TouchableOpacity onPressIn={() => navigation.navigate("password")}>
          <Text>go to pass</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
