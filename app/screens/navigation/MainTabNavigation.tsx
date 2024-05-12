import { StyleSheet } from "react-native";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home } from "../home/Home";
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
      {/* <Tab.Screen name="chat" component={} /> */}
      <Tab.Screen name="mypage/tab" component={MyPageStackNavigation} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
