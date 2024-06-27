import { NativeStackNavigationOptions, NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyPage } from "@screens/mypage/MyPage";
import { ChangeId } from "@screens/mypage/ChangeId";
import { ChangePassword } from "@screens/mypage/ChangePassword";
import { ChangeProfile } from "../mypage/ChangeProfile";
import { Certification } from "../signup/Certification";
import { FindIdStackNavigation } from "./user/FindIdNavigation";
import { FindPasswordStackNavigation } from "./user/FindPasswordNavigation";
import { useLayoutEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native";
import { ChangeProfileImageModal } from "../mypage/ChangeProfileImageModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type MypageRootStackParam = {
  mypage: undefined;
  changeId: undefined;
  changePassword: undefined;
  changeProfile: undefined;
  changeProfileImageModal: undefined;
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
      backgroundColor: "#fff",
    },
    headerShadowVisible: false,
    headerTintColor: "#141414",
    headerTitleStyle: {
      fontFamily: "NotoSansKR-SemiBold",
      fontSize: 18,
      color: "#141414",
    },
  };

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName !== "mypage" && routeName !== "mypage/tab" && routeName !== undefined) {
      //MyPage이외의 화면에 대해 tabBar none을 설정한다.
      navigation.setOptions({ tabBarStyle: { display: "none", backgroundColor: "#fff" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: undefined, backgroundColor: "#fff" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="mypage" screenOptions={{ headerTransparent: false, ...customStackNavigationOptions }}>
      <Stack.Screen name="mypage" component={MyPage} options={{ headerShown: false }} />
      {/* <Stack.Screen name="changeId" component={ChangeId} /> */}
      <Stack.Screen name="changePassword" component={ChangePassword} options={{ title: "비밀번호 변경" }} />
      <Stack.Screen name="changeProfile" component={ChangeProfile} options={{ title: "프로필 수정" }} />
      <Stack.Screen name="certification" component={Certification} />
      <Stack.Screen name="findId" component={FindIdStackNavigation} />
      <Stack.Screen name="findPassword" component={FindPasswordStackNavigation} />
      <Stack.Screen
        name="changeProfileImageModal"
        component={ChangeProfileImageModal}
        options={{ presentation: "containedTransparentModal", animation: "fade", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
