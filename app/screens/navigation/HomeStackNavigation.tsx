import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { FeedCreat } from "../home/FeedCreat";
import { FeedEdit } from "../home/FeedEdit";
import { Home } from "../home/Home";

export type HomeRootStackParam = {
  homeMain: undefined;
  feedCreat: undefined;
  feedEdit: undefined;
};

const Stack = createNativeStackNavigator<HomeRootStackParam>();

export function HomeStackNavigation({ navigation, route }: { navigation: any; route: any }) {
  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: "",
    headerStyle: {
      backgroundColor: "#209bec",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName);
    if (routeName !== "homeMain") {
      //MyPage이외의 화면에 대해 tabBar none을 설정한다.
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="homeMain" screenOptions={{ headerTransparent: false, gestureEnabled: true }}>
      <Stack.Screen name="homeMain" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="feedCreat"
        component={FeedCreat}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitle: "피드 작성하기",
          headerBackTitleStyle: {
            fontFamily: "Freesentation-5Medium",
          },
          headerLargeStyle: false,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#111",
        }}
      />
      <Stack.Screen
        name="feedEdit"
        component={FeedEdit}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitle: "피드 수정하기",
          headerBackTitleStyle: {
            fontFamily: "Freesentation-5Medium",
          },
          headerLargeStyle: false,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#111",
        }}
      />
    </Stack.Navigator>
  );
}
