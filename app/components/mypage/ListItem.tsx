import { StyleSheet, Text, View } from "react-native";

type listItemProps = {
  label: string;
  value?: string;
};

export function ListItem({ label, value }: listItemProps) {
  return (
    <View style={styles.list}>
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
    fontSize: 16,
    fontFamily: "Freesentation-4Regular",
    color: "#141414",
  },

  listText: {
    fontSize: 16,
    fontFamily: "Freesentation-3Light",
    color: "#141414",
  },
});
