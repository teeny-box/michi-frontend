import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigation } from "./HomeStackNavigation";
import ChatNavigation from "./chat/ChatroomStack";
import { MyPageStackNavigation } from "./MyPageStack";
import HomeIcon from "react-native-vector-icons/Entypo";
import ChatIcon from "react-native-vector-icons/Ionicons";
import MypageIcon from "react-native-vector-icons/FontAwesome";
import { useSocket } from "@/hooks/useSocket";

const Tab = createBottomTabNavigator();

export function MainTabNavigation() {
  useSocket();

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
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "";
          let IconComponent: React.ComponentType<any> = HomeIcon;

          if (route.name === "home") {
            IconComponent = HomeIcon;
            iconName = "home";
          } else if (route.name === "chatting") {
            IconComponent = ChatIcon;
            iconName = "chatbubble-ellipses";
          } else if (route.name === "mypage/tab") {
            IconComponent = MypageIcon;
            iconName = "user-circle-o";
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7000Ff",
        tabBarInactiveTintColor: "gray",
      })}>
      <Tab.Screen name="home" component={HomeStackNavigation} />
      <Tab.Screen name="chatting" component={ChatNavigation} />
      <Tab.Screen name="mypage/tab" component={MyPageStackNavigation} />
    </Tab.Navigator>
  );
}
