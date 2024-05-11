import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  terms: undefined;
};

export function BirthYear(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [open, setOpen] = useState(false);
  const [birthYear, setBirthYear] = useState(2000);
  const [years, setYears] = useState<{ label: string; value: number }[] | []>([]);

  useEffect(() => {
    const yearsList = [];
    for (let i = 1990; i < 2006; i++) {
      yearsList.push({ label: i.toString(), value: i });
    }
    setYears(yearsList);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>출생년도를 알려주세요</Text>
        <DropDownPicker open={open} value={birthYear} items={years} setOpen={setOpen} setValue={setBirthYear} setItems={setYears} style={styles.input} />
        <TouchableOpacity onPressIn={() => navigation.navigate("terms")}>
          <Text>NEXT BUTTON</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 40,
    marginVertical: 20,
  },

  title: {
    color: "black",
    fontSize: 26,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },
});
