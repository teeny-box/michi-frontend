import { StyleSheet, Text, View } from "react-native";

type DisableTextFieldProps = {
  label: string;
  value: string;
};

export function TextField({ label, value }: DisableTextFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "NotoSansKR-Regular",
    color: "#141414",
  },

  valueBox: {
    marginTop: 5,
    marginBottom: 25,
    height: 45,
    backgroundColor: "#E8ECF1",
    justifyContent: "center",
  },

  value: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "NotoSansKR-Medium",
    color: "#000",
    paddingHorizontal: 10,
  },
});
