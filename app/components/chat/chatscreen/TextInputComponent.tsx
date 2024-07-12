import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

interface TextInputComponentProps {
  messageText: string;
  setMessageText: (text: string) => void;
  sendMessage: () => void;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({ messageText, setMessageText, sendMessage }) => {
  const [isTyping, setIsTyping] = useState(false);
  const scale = useSharedValue(0);

  useEffect(() => {
    setIsTyping(messageText.length > 0);
    scale.value = withSpring(messageText.length > 0 ? 1 : 0, {
      damping: 15, // 낮추면 애니메이션이 더 빠르게 진행됩니다
      stiffness: 200, // 높이면 애니메이션이 더 빠르게 진행됩니다
    });
  }, [messageText]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: scale.value,
    };
  });

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <LinearGradient style={styles.gradient} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
          <FontAwesomeIcon name="camera" size={16} style={styles.cameraIcon} />
        </LinearGradient>
      </View>
      <TextInput
        placeholder="메시지 보내기..."
        style={styles.textInput}
        autoCorrect={false}
        value={messageText}
        onChangeText={setMessageText}
        onSubmitEditing={sendMessage}
      />
      <View style={styles.iconGroup}>
        {isTyping ? (
          <Pressable onPress={sendMessage} style={styles.sendIconContainer}>
            <Animated.View style={[styles.sendIconBackground, animatedStyle]}>
              <LinearGradient style={styles.sendIconBackground} colors={["#AA94F7", "#759AF3"]} useAngle={true} angle={170} angleCenter={{ x: 0.5, y: 0.5 }}>
                <FontAwesomeIcon name="send" size={16} style={styles.sendIcon} />
              </LinearGradient>
            </Animated.View>
          </Pressable>
        ) : (
          <>
            <FontAwesomeIcon name="microphone" size={16} style={styles.icon} />
            <FontAwesomeIcon name="photo" size={16} style={styles.icon} />
          </>
        )}
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
    flex: 1, // 전체 영역을 채우도록 설정
    padding: 10,
    borderWidth: 0,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center", // 세로 중앙 정렬
    justifyContent: "flex-end",
  },
  icon: {
    color: "#939398",
    paddingHorizontal: 5,
    marginRight: 10, // 텍스트 입력과 아이콘 사이의 간격을 조정
  },
  iconContainer: {
    marginRight: 10, // 텍스트 입력과 아이콘 사이의 간격을 조정
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  gradient: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIconContainer: {
    marginLeft: 10, // 아이콘과 텍스트 입력 사이의 간격을 조정
  },
  sendIconBackground: {
    width: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  sendIcon: {
    color: "#fff",
  },
  cameraIcon: {
    color: "#fff",
  },
});

export default TextInputComponent;
