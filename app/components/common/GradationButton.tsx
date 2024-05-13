import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type gradationProps = {
  text: string;
};

export function GradationButton({ text }: gradationProps) {
  return (
    <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
      <Text style={styles.text}>{text}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  text: {
    color: "#fff",
    margin: "auto",
    fontSize: 16,
  },
});
