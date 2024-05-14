import { ReactElement } from "react";
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type checkBoxFieldProps = {
  children: React.ReactNode;
  isChecked: boolean;
  onPressIn: (event: GestureResponderEvent) => void;
};

export function CheckBoxField({ children, isChecked, onPressIn }: checkBoxFieldProps) {
  return (
    <TouchableOpacity style={styles.container} onPressIn={onPressIn}>
      {isChecked ? <Image source={require("@assets/images/checkbox_purple.png")} /> : <Image source={require("@assets/images/checkbox_gray.png")} />}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    gap: 15,
  },

  text: {
    color: "black",
    fontSize: 16,
    fontFamily: "WavvePADO-Regular",
    marginBottom: 30,
  },
});
