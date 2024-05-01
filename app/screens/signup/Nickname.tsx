import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

export type RootStackParam = {
  id: undefined;
  password: undefined;
  birthyear: undefined;
};

export function Nickname(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View>
      <Text>출생년도 페이지</Text>
      <TouchableOpacity onPressIn={() => navigation.navigate("birthyear")}>
        <Text>go to pass</Text>
      </TouchableOpacity>
    </View>
  );
}
