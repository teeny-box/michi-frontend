import { StyleSheet, Text } from "react-native";

type TextProps = {
  text: string;
};

export function Title({ text }: TextProps) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 30,
    fontFamily: "WavvePADO-Regular",
    marginBottom: 20,
  },
});
