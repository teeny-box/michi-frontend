import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

type linkedListItemProps = {
  label: string;
  value?: string;
  onPressIn: () => void;
  showIcon?: boolean;
};

export function LinkedListItem({ label, value, onPressIn, showIcon }: linkedListItemProps) {
  return (
    <TouchableOpacity style={styles.list} onPressIn={onPressIn}>
      <Text style={styles.listTitle}>{label}</Text>
      <Text style={styles.listText}>{value}</Text>
      {showIcon && <FontAwesome5 name="angle-right" size={19} color="#7000FF" style={styles.arrowIcon} />}
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
    fontSize: 16,
    fontFamily: "Freesentation-4Regular",
    color: "#141414",
  },

  listText: {
    fontSize: 16,
    fontFamily: "Freesentation-3Light",
    color: "#141414",
  },

  arrowIcon: {
    marginLeft: 14,
  },
});
