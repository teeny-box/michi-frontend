import { StyleProp, StyleSheet, StyleSheetProperties, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, { ToastConfigParams } from "react-native-toast-message";

export function ToastCustom() {
  const { top } = useSafeAreaInsets();

  const toastConfig = {
    success: ({ text1, text1Style }: ToastConfigParams<null>) => (
      <View style={styles.box}>
        <Text style={[styles.text, text1Style]}>{text1}</Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} topOffset={top + 14} visibilityTime={3000} />;
}

const styles = StyleSheet.create({
  box: {
    width: "94%",
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,

    // shadowColor: "#000000",
    // // ios
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // // android
    // elevation: 4,
  },

  text: {
    fontSize: 16,
    fontFamily: "Freesentation-5Medium",
    color: "#fff",
    marginVertical: "auto",
  },
});
