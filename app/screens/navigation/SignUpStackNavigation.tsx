import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Id } from "../signup/Id";
import { Password } from "../signup/Password";
import { Nickname } from "../signup/Nickname";
import { BirthYear } from "../signup/BirthYear";
import { Terms } from "../signup/Terms";
import { Certification } from "../signup/Certification";

const Stack = createNativeStackNavigator();

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
    <Stack.Navigator initialRouteName="id" screenOptions={{ headerTransparent: true }}>
      <Stack.Screen name="certification" component={Certification} />
      <Stack.Screen name="id" component={Id} />
      <Stack.Screen name="password" component={Password} />
      <Stack.Screen name="nickname" component={Nickname} />
      <Stack.Screen name="birthyear" component={BirthYear} />
      <Stack.Screen name="terms" component={Terms} />
    </Stack.Navigator>
  );
}
