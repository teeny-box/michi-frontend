import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

export type RootStackParam = {
  start: undefined;
};

export function BirthYear(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View>
      <Text>출생년도 페이지</Text>
      <TouchableOpacity onPressIn={() => navigation.replace("start")}>
        <Text>go to pass</Text>
      </TouchableOpacity>
    </View>
  );
}
