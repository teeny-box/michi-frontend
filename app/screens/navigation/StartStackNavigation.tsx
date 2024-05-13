import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start } from "../start/Start";
import { Login } from "../login/Login";
import { SignUpStackNavigation } from "./SignUpStackNavigation";
import { MainTabNavigation } from "./MainTabNavigation";
import { FeedEdit } from "../home/FeedEdit";
import { FindIdStackNavigation } from "./user/FindIdNavigation";
import { FindPasswordStackNavigation } from "./user/FindPasswordNavigation";

export type StartRootStackParam = {
  start: undefined;
  login: undefined;
  signup: undefined;
  main: undefined;
  findId_login: undefined;
  findPassword_login: undefined;
  feedEdit: undefined;
};

const Stack = createNativeStackNavigator<StartRootStackParam>();

export function StartStackNavigation() {
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

  return (
    <Stack.Navigator initialRouteName="start" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="start" component={Start} options={{ animation: "fade" }} />
      <Stack.Screen name="login" component={Login} options={{ headerShown: true }} />
      <Stack.Screen name="feedEdit" component={FeedEdit} options={{ headerShown: false }} />
      <Stack.Screen name="signup" component={SignUpStackNavigation} />
      <Stack.Screen name="main" component={MainTabNavigation} />
      <Stack.Screen name="findId_login" component={FindIdStackNavigation} />
      <Stack.Screen name="findPassword_login" component={FindPasswordStackNavigation} />
    </Stack.Navigator>
  );
}
