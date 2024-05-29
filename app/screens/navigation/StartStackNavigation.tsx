import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start } from "../start/Start";
import { Login } from "../login/Login";
import { SignUpStackNavigation } from "./SignUpStackNavigation";
import { MainTabNavigation } from "./MainTabNavigation";
import { FindIdStackNavigation } from "./user/FindIdNavigation";
import { FindPasswordStackNavigation } from "./user/FindPasswordNavigation";
import { StatusBar } from "react-native";

export type StartRootStackParam = {
  start: undefined;
  login: undefined;
  signup: undefined;
  main: undefined;
  home: undefined;
  findId_login: undefined;
  findPassword_login: undefined;
};

const Stack = createNativeStackNavigator<StartRootStackParam>();

export function StartStackNavigation() {
  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    headerShown: false,
  };

  return (
    <>
      <StatusBar backgroundColor={"#fff"} />
      <Stack.Navigator initialRouteName="start" screenOptions={customStackNavigationOptions}>
        <Stack.Screen name="start" component={Start} options={{ animation: "fade" }} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={SignUpStackNavigation} />
        <Stack.Screen name="findId_login" component={FindIdStackNavigation} />
        <Stack.Screen name="findPassword_login" component={FindPasswordStackNavigation} />
      </Stack.Navigator>
    </>
  );
}
