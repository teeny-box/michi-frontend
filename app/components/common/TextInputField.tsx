import { useEffect } from "react";
import { InputAccessoryView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type textInputFieldProps = {
  label?: string;
  value: string;
  setValue: (text: string) => void;
  message?: string;
  maxLength?: number;
  isAvailable?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: boolean;
};

export function TextInputField({ label, value, setValue, message, maxLength, isAvailable, placeholder, secureTextEntry, error }: textInputFieldProps) {
  useEffect(() => {
    if (isAvailable === null || isAvailable === undefined) {
      isAvailable = true;
    }
  }, []);

  const components = (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor="rgba(0, 0, 0, 0.1)"
          secureTextEntry={secureTextEntry}
        />
        {isAvailable !== null &&
          isAvailable !== undefined &&
          (isAvailable ? <Entypo name="check" size={22} color="#7000FF" /> : <Entypo name="cross" size={28} color="#DD0000" />)}
        {error && <MaterialIcons name="error-outline" size={24} color={"#DD0000"} />}
      </View>
      {message && <Text style={[styles.message, error && { color: "#DD0000" }]}>{message}</Text>}
    </>
  );

  // return <>{Platform.OS === "ios" ? <InputAccessoryView>{components}</InputAccessoryView> : components}</>;
  return components;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: "NotoSansKR-Regular",
    color: "#141414",
    lineHeight: 19,
  },

  inputBox: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 45,

    flexDirection: "row",
    backgroundColor: "#E8ECF1",
    alignItems: "center",
  },

  input: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "NotoSansKR-Medium",
    includeFontPadding: false,
    height: 45,
  },

  value: {
    fontSize: 12,
    fontFamily: "NotoSansKR-Medium",
    color: "#000",
    paddingHorizontal: 10,
  },

  message: {
    color: "#7000FF",
    fontSize: 12,
    fontFamily: "NotoSansKR-Medium",
    lineHeight: 16,
    marginBottom: 30,
  },
});
