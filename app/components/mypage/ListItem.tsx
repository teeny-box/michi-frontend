import { StyleSheet, Text, View } from "react-native";

type listItemProps = {
  label: string;
  value?: string;
  borderBottomColor?: string;
};

export function ListItem({ label, value, borderBottomColor }: listItemProps) {
  const borderStyle = borderBottomColor
    ? {
        borderBottomColor: borderBottomColor,
        borderBottomWidth: 1,
      }
    : {};

  return (
    <View style={[styles.list, borderStyle]}>
      <Text style={styles.listTitle}>{label}</Text>
      <Text style={styles.listText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 15,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  },

  listTitle: {
    flexGrow: 1,
    fontSize: 14,
    fontFamily: "NotoSansKR-Regular",
    color: "#141414",
  },

  listText: {
    fontSize: 14,
    fontFamily: "NotoSansKR-Light",
    color: "#141414",
  },
});
