import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";

export type RootStackParam = {
  inChat: undefined;
};

export function Chatrooms(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const { height, width } = Dimensions.get("window");
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: top }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? top : 0}>
      <View style={styles.fixedContainer}>
        <TouchableOpacity style={[styles.chatBanner, { height: height * 0.15 }]} onPress={() => navigation.navigate("inChat")}>
          <Text>실시간 랜덤채팅 배너</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.searchBar, { height: height * 0.05 }]}>
          <Icon name="search" size={16} style={{ color: "#939398", paddingRight: 4 }} />
          <TextInput placeholder="검색" />
        </View>
        <Text style={styles.textStyle}>새 매칭</Text>
        <View></View>

        <Text style={styles.textStyle}>메세지</Text>
        <View></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  fixedContainer: {
    backgroundColor: "#FFFFFF",
  },

  chatBanner: {
    backgroundColor: "#7000FF",
    alignItems: "center",
    justifyContent: "center",
  },

  searchBar: {
    flexDirection: "row",
    backgroundColor: "#F2F5F7",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  scrollInnerContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  textStyle: {
    fontWeight: "bold",
  },
});
