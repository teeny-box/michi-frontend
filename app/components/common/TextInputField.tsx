import { useEffect } from "react";
import { InputAccessoryView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

type textInputFieldProps = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  message?: string;
  maxLength?: number;
  isAvailable?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export function TextInputField({ label, value, setValue, message, maxLength, isAvailable, placeholder, secureTextEntry }: textInputFieldProps) {
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
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
    </>
  );

  // return <>{Platform.OS === "ios" ? <InputAccessoryView>{components}</InputAccessoryView> : components}</>;
  return components;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Freesentation-4Regular",
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
    fontFamily: "Freesentation-5Medium",
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Freesentation-5Medium",
    color: "#000",
    paddingHorizontal: 10,
  },

  message: {
    color: "#7000FF",
    fontSize: 12,
    fontFamily: "Freesentation-5Medium",
    lineHeight: 12,
    marginBottom: 30,
  },
});
