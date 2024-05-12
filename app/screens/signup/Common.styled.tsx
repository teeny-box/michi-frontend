import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  nextButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: "plum",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonDisabled: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: "lightgrey",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
