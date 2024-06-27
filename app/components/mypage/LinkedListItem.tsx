import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

type linkedListItemProps = {
  label: string;
  value?: string;
  onPress: () => void;
  color?: "gray" | "purple";
};

export function LinkedListItem({ label, value, onPress, color }: linkedListItemProps) {
  const borderStyle = {
    borderBottomColor: color === "purple" ? "#fff" : "#E8ECF1",
    borderBottomWidth: 1,
  };

  return (
    <TouchableOpacity style={[styles.list, borderStyle]} onPress={onPress}>
      <Text style={styles.listTitle}>{label}</Text>
      <Text style={styles.listText}>{value}</Text>
      <FontAwesome5 name="angle-right" size={19} color={color === "purple" ? "#7000FF" : "#9597A4"} style={styles.arrowIcon} />
    </TouchableOpacity>
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

  arrowIcon: {
    marginLeft: 14,
  },

  grayBorder: {
    borderBottomColor: "#E8ECF1",
    borderBottomWidth: 1,
  },
});
