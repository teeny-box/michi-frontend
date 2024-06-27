import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "@components/common/Button";
import { useAlert } from "@/hooks/useAlert";
import { useRecoilValue } from "recoil";
import { alertState } from "@/recoil/commonAtoms";
import { useState } from "react";
import ProgressDots from "./ProgressDots";

export function Alert() {
  const { closeAlert } = useAlert();
  const { open, title, desc, onPress, onClosed, defaultText, cancelText } = useRecoilValue(alertState);
  const [loading, setLoading] = useState(false);

  const onPressDefaultButton = async () => {
    setLoading(true);
    await onPress?.();
    closeAlert();
    setLoading(false);
  };

  const onPressCancelButton = async () => {
    await onClosed?.();
    closeAlert();
  };

  return (
    <Modal transparent visible={open}>
      <View style={styles.modalScreen}>
        {loading ? (
          <ProgressDots />
        ) : (
          <View style={styles.modalBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{desc}</Text>
            <View style={styles.buttonBox}>
              {cancelText && <Button text={cancelText} color="gray" onPress={onPressCancelButton} />}
              {defaultText && <Button text={defaultText} onPress={onPressDefaultButton} />}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalBox: {
    backgroundColor: "#fff",
    marginHorizontal: 25,
    marginVertical: "auto",
    borderWidth: 1,
    borderColor: "#7000ff",
    padding: 25,
    rowGap: 16,
  },

  title: {
    fontSize: 24,
    fontFamily: "JalnanGothic",
    textAlign: "center",
    color: "#141414",
  },

  description: {
    fontSize: 14,
    textAlign: "center",
    paddingBottom: 10,
  },

  buttonBox: {
    width: "100%",
    flexDirection: "row",
    columnGap: 16,
  },
});
