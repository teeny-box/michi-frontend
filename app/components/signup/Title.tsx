import { StyleProp, StyleSheet, StyleSheetProperties, Text } from "react-native";

type TextProps = {
  text: string;
  marginBottom?: number;
};

export function Title({ text, marginBottom = 30 }: TextProps) {
  return <Text style={[styles.title, { marginBottom: marginBottom }]}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 30,
    fontFamily: "JalnanGothic",
  },
});
