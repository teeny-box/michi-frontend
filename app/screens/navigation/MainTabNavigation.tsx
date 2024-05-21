import { StyleSheet } from "react-native";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackNavigation } from "./HomeStackNavigation";
import { ChatroomsStackNavigation } from "./ChatroomStack";
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
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="home" component={HomeStackNavigation} />
        <Tab.Screen name="chatting" component={ChatroomsStackNavigation} />
        <Tab.Screen name="mypage/tab" component={MyPageStackNavigation} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
