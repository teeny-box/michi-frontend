import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Profile } from "@components/mypage/Profile.tsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParam = {
  main: undefined;
  home: undefined;
};

export function MyPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={styles.outBox}>
      <Profile />
      <TouchableOpacity style={styles.list} onPressIn={() => navigation.navigate("main")}>
        <Text>내가 쓴 글</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.list} onPressIn={() => navigation.navigate("home")}>
        <Text>이용약관</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outBox: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
