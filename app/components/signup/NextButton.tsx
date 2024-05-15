import React, { useEffect } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gradation } from "../common/Gradation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

type nextButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export function NextButton({ onPress, disabled }: nextButtonProps) {
  useEffect(() => {
    if (disabled === null || disabled === undefined) {
      disabled = true;
    }
  }, []);

  return (
    <>
      {disabled ? (
        <View style={styles.nextButton}>
          <FontAwesome5 name="angle-right" size={44} style={styles.icon} color={"#fff"} />
        </View>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.nextButton}>
          <Gradation>
            <FontAwesome5 name="angle-right" size={44} style={styles.icon} color={"#fff"} />
          </Gradation>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    borderRadius: 50,
    backgroundColor: "lightgrey",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  icon: {
    margin: "auto",
    paddingLeft: 4,
  },
});
