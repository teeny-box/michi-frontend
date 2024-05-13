import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 25,
    position: "relative",
    flexGrow: 1,
  },

  scrollBox: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  nextButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    borderRadius: 50,
    backgroundColor: "plum",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  nextButtonDisabled: {
    position: "absolute",
    bottom: 25,
    right: 25,
    borderRadius: 50,
    backgroundColor: "lightgrey",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
