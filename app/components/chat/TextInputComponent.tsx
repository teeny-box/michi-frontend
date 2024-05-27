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

      <View style={styles.iconGroup}>
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
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 3,
    padding: 10,
    borderWidth: 0,
  },
  iconGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", // 아이콘 사이에 균등한 간격을 추가
    paddingHorizontal: 5,
  },
  icon: {
    color: "#939398",
    paddingHorizontal: 5,
    flex: 1, // 아이콘을 균등한 공간에 배치
    textAlign: "center", // 아이콘을 중앙에 배치
  },
  iconContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // 둥근 테두리 적용
    overflow: "hidden", // 이 속성을 추가하여 테두리가 아이콘과 겹치지 않도록 합니다.
  },
  gradient: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    color: "#fff", // 아이콘 색상을 흰색으로 설정합니다.
  },
});

export default TextInputComponent;
