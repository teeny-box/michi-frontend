import { ReactElement } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type gradationProps = {
  text: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  rightIcon?: ReactElement;
};

export function GradationButton({ text, size, disabled, onPress, rightIcon }: gradationProps) {
  return (
    <>
      {disabled ? (
        <View style={[styles.button, size === "small" ? { width: 100 } : size === "medium" ? { width: 200 } : { width: "100%" }]}>
          <View style={styles.innerBox}>
            <Text style={styles.text}>{text}</Text>
            {rightIcon}
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={onPress} style={[styles.button, size === "small" ? { width: 100 } : size === "medium" ? { width: 200 } : { width: "100%" }]}>
          <LinearGradient style={styles.innerBox} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
            <Text style={styles.text}>{text}</Text>
            {rightIcon}
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#E8ECF1",
  },

  innerBox: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Freesentation-5Medium",
  },
});
