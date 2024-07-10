import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const TextInputComponent = () => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <LinearGradient style={styles.gradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
          <FontAwesomeIcon name="camera" size={16} style={styles.cameraIcon} />
        </LinearGradient>
      </View>
      <TextInput placeholder="메시지 보내기..." style={styles.textInput} autoCorrect={false} />

      <View style={{ flex: 1, flexDirection: "row" }}>
        <FontAwesomeIcon name="microphone" size={16} style={styles.icon} />
        <FontAwesomeIcon name="photo" size={16} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F5F7",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textInput: {
    flex: 3,
    padding: 10,
    borderWidth: 0,
  },
  icon: {
    flex: 1,
    color: "#939398",
    paddingRight: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    overflow: "hidden", // 이 속성을 추가하여 테두리가 아이콘과 겹치지 않도록 합니다.
  },
  gradient: {
    padding: 6, // 그라데이션 배경의 크기를 아이콘보다 약간 크게 설정합니다.
  },
  cameraIcon: {
    color: "#fff", // 아이콘 색상을 흰색으로 설정합니다.
  },
});

export default TextInputComponent;
