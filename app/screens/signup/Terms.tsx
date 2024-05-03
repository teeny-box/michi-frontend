import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export type RootStackParam = {
  start: undefined;
};

export function Terms(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  useEffect(() => {
    setIsChecked1(isChecked2 && isChecked3);
  }, [isChecked2, isChecked3]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>이용약관</Text>
        <BouncyCheckbox
          isChecked={isChecked1}
          size={20}
          text="아래 항목에 전부 동의합니다."
          iconStyle={styles.checkboxIcon}
          innerIconStyle={styles.checkboxInnerIcon}
          textStyle={styles.checkboxText}
          onPress={(isChecked: boolean) => {
            setIsChecked2(isChecked);
            setIsChecked3(isChecked);
          }}
          bounceEffectIn={0.95}
        />
        <View style={styles.detailCheckContainer}>
          <BouncyCheckbox
            isChecked={isChecked2}
            size={20}
            text="Custom Checkbox"
            iconStyle={styles.checkboxIcon}
            innerIconStyle={styles.checkboxInnerIcon}
            textStyle={styles.checkboxText}
            onPress={(isChecked: boolean) => {
              setIsChecked2(isChecked);
            }}
            bounceEffectIn={0.95}
          />
          <BouncyCheckbox
            isChecked={isChecked3}
            size={20}
            text="Custom Checkbox"
            iconStyle={styles.checkboxIcon}
            innerIconStyle={styles.checkboxInnerIcon}
            textStyle={styles.checkboxText}
            onPress={(isChecked: boolean) => {
              setIsChecked3(isChecked);
            }}
            bounceEffectIn={0.95}
          />
        </View>
        <TouchableOpacity onPressIn={() => navigation.replace("start")}>
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

  checkboxIcon: {
    borderColor: "red",
    borderRadius: 2,
  },

  checkboxInnerIcon: {
    borderRadius: 2,
  },

  checkboxText: {
    fontSize: 18,
    textDecorationLine: "none",
  },

  detailCheckContainer: {
    marginLeft: 10,
  },
});
