import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../home/Home";
import { MyPage } from "../mypage/MyPage";

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
      {/* <Tab.Screen name="chat" component={} /> */}
      <Tab.Screen name="mypage" component={MyPage} />
    </Tab.Navigator>
  );
}
