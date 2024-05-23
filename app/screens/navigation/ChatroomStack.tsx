import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chatrooms } from "@screens/chat/chatrooms/Chatrooms";
import { Chatting } from "@screens/chat/chatting/Chatting";
import Feathericons from "react-native-vector-icons/Feather";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export function ChatroomsStackNavigation() {
  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: "",
    headerStyle: {
      backgroundColor: "#FFFFFF",
    },
    headerTintColor: "#0C1014",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 14, // 폰트 사이즈 조정
    },
    headerBackTitleVisible: false, // 뒤로 가기 버튼의 텍스트 숨김
  };

  return (
    <Stack.Navigator initialRouteName="chatrooms" screenOptions={customStackNavigationOptions}>
      <Stack.Screen name="chatrooms" component={Chatrooms} options={{ headerShown: false }} />
      <Stack.Screen
        name="inChat"
        component={Chatting}
        options={({ navigation }) => ({
          headerRight: () => <Feathericons name="log-out" size={25} color="#0C1014" onPress={() => alert("아이콘 클릭됨")} />,
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feathericons name="arrow-left" size={25} color="#0C1014" onPress={() => navigation.goBack()} />
              <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "bold" }}>랜덤매칭된 user</Text>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
