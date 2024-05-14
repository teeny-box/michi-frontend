import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Id } from "../signup/Id";
import { Password } from "../signup/Password";
import { Nickname } from "../signup/Nickname";
import { CheckInfo } from "../signup/CheckInfo";
import { Terms } from "../signup/Terms";
import { Certification } from "../signup/Certification";
import { Welcome } from "../signup/Welcome";

export type SignUpRootStackParam = {
  signup_certification: undefined;
  id: undefined;
  password: undefined;
  nickname: undefined;
  checkInfo: undefined;
  terms: undefined;
  welcome: undefined;
};

const Stack = createNativeStackNavigator<SignUpRootStackParam>();

export function SignUpStackNavigation() {
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
    <Stack.Navigator initialRouteName="signup_certification" screenOptions={{ headerTransparent: true }}>
      <Stack.Screen name="signup_certification" component={Certification} />
      <Stack.Screen name="checkInfo" component={CheckInfo} />
      <Stack.Screen name="id" component={Id} />
      <Stack.Screen name="password" component={Password} />
      <Stack.Screen name="nickname" component={Nickname} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
