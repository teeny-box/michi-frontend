import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../home/Home";
import { Chatrooms } from "../chatrooms/Chatrooms";
import { MyPageStackNavigation } from "./MyPageStack";

const Tab = createBottomTabNavigator();

export function MainTabNavigation() {
  const customTabNavigationOptions: BottomTabNavigationOptions = {
    title: "",
    headerStyle: {
      backgroundColor: "#209bec",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="chatting" component={Chatrooms} />
      <Tab.Screen name="mypage/tab" component={MyPageStackNavigation} />
    </Tab.Navigator>
  );
}
