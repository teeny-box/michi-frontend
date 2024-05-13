import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type gradationProps = {
  children: React.ReactNode;
};

export function Gradation({ children }: gradationProps) {
  return (
    <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
