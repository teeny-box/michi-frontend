import { ReactElement } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type buttonProps = {
  text: string;
  size?: "small" | "medium" | "large";
  color?: "black" | "gray";
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  rightIcon?: ReactElement;
};

export function Button({ text, size, color, disabled, onPress, rightIcon }: buttonProps) {
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, size === "small" ? { width: 100 } : size === "medium" ? { width: 200 } : { width: "100%" }]}>
        <View style={[styles.innerBox, color === "gray" && { backgroundColor: "##9597A4" }]}>
          <Text style={[styles.text, color === "gray" && { color: "#141414" }]}>{text}</Text>
          {rightIcon}
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#141414",
    flex: 1,
  },

  innerBox: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 4,
  },

  text: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansKR-Medium",
  },
});
