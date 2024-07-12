import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Chatrooms } from "../../chat/Chatrooms";
import ChatScreens from "../../chat/ChatScreens";
import { ScreenEnums as screens } from "../../chat/screenEnum";
import { RootStackParam } from "../../navigation/chat/ChatStartStackNavigation"; // 경로 수정

const Stack = createNativeStackNavigator<RootStackParam>();

export default function ChatNavigation() {
  return (
    <Stack.Navigator initialRouteName={screens.ChatRoom}>
      <Stack.Screen name={screens.ChatRoom} component={Chatrooms} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Chat} component={ChatScreens} />
    </Stack.Navigator>
  );
}
