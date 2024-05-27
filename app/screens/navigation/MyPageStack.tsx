import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyPage } from "@screens/mypage/MyPage";
import { ChangeId } from "@screens/mypage/ChangeId";
import { ChangePassword } from "@screens/mypage/ChangePassword";
import { ChangeProfile } from "../mypage/ChangeProfile";
import { Certification } from "../signup/Certification";
import { FindIdStackNavigation } from "./user/FindIdNavigation";
import { FindPasswordStackNavigation } from "./user/FindPasswordNavigation";
import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export type MypageRootStackParam = {
  mypage: undefined;
  changeId: undefined;
  changePassword: undefined;
  changeProfile: undefined;
  certification: undefined;
  findId: undefined;
  findPassword: undefined;
};

const Stack = createNativeStackNavigator<MypageRootStackParam>();

export function MyPageStackNavigation({ navigation, route }: { navigation: any; route: any }) {
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
    if (routeName !== "mypage") {
      //MyPage이외의 화면에 대해 tabBar none을 설정한다.
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="mypage" screenOptions={{ headerTransparent: false, gestureEnabled: true }}>
      <Stack.Screen name="mypage" component={MyPage} options={{ headerShown: false }} />
      {/* <Stack.Screen name="changeId" component={ChangeId} /> */}
      <Stack.Screen name="changePassword" component={ChangePassword} />
      <Stack.Screen name="changeProfile" component={ChangeProfile} />
      <Stack.Screen name="certification" component={Certification} />
      <Stack.Screen name="findId" component={FindIdStackNavigation} />
      <Stack.Screen name="findPassword" component={FindPasswordStackNavigation} />
    </Stack.Navigator>
  );
}
