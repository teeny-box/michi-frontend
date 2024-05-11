import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Id } from "../signup/Id";
import { Start } from "../start/Start";
import { Login } from "../login/Login";
import { SignUpStackNavigation } from "./SignUpStackNavigation";
import { Home } from "../home/Home";
import { MainTabNavigation } from "./MainTabNavigation";

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="signup" component={SignUpStackNavigation} />
      <Stack.Screen name="main" component={MainTabNavigation} />
    </Stack.Navigator>
  );
}
