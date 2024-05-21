import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type gradationProfileProps = {
  children: React.ReactNode;
};

export function GradationProfile({ children }: gradationProfileProps) {
  return (
    <LinearGradient style={styles.linearGradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 100,
  },
});
