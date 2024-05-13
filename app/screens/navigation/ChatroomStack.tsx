import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chatrooms } from "@screens/chat/chatrooms/Chatrooms";
import { Chatting } from "@screens/chat/chatting/Chatting";

const Stack = createNativeStackNavigator();

export function ChatroomsStackNavigation() {
  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: "랜덤매칭된 {user} || chatroom에서 선택된 {user}",
    headerStyle: {
      backgroundColor: "#FFFFFF",
    },
    headerTintColor: "#0C1014",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 15,
    },
  };

  return (
    <Stack.Navigator initialRouteName="chatrooms" screenOptions={customStackNavigationOptions}>
      <Stack.Screen name="chatrooms" component={Chatrooms} options={{ headerShown: false }} />
      <Stack.Screen
        name="inChat"
        component={Chatting}
        options={
          {
            // headerRight: () => "기능 추기",
          }
        }
      />
    </Stack.Navigator>
  );
}
