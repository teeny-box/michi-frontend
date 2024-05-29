import ProgressDots from "@/components/common/ProgressDots";
import { loadingState } from "@/recoil/commonAtoms";
import { Modal, StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";

export function Loading() {
  const loading = useRecoilValue(loadingState);

  return (
    <Modal transparent visible={loading}>
      <View style={styles.screen}>
        <ProgressDots />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
