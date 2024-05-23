import React from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import TextInputComponent from "../../../components/chat/TextInputComponent";

export function Chatting() {
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: top }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainchat}>
          <Text>메인 채팅</Text>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInputComponent />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainchat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: "#ffffff",
  },
});
