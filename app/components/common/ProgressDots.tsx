import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

interface ProgressDotsProps {
  duration?: number;
  initialDelay?: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ duration = 1000, initialDelay = 0 }) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.stagger(duration / 2, [
          Animated.loop(
            Animated.sequence([
              Animated.timing(dot1, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
              }),
              Animated.timing(dot1, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
              }),
            ]),
          ),
          Animated.loop(
            Animated.sequence([
              Animated.timing(dot2, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
              }),
              Animated.timing(dot2, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
              }),
            ]),
          ),
          Animated.loop(
            Animated.sequence([
              Animated.timing(dot3, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
              }),
              Animated.timing(dot3, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
              }),
            ]),
          ),
        ]),
      ]).start();
    };

    animateDots();
  }, [dot1, dot2, dot3, duration, initialDelay]);

  const getDotStyle = (dot: Animated.Value) => ({
    opacity: dot,
    transform: [
      {
        scale: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, getDotStyle(dot1)]} />
      <Animated.View style={[styles.dot, getDotStyle(dot2)]} />
      <Animated.View style={[styles.dot, getDotStyle(dot3)]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
});

export default ProgressDots;
