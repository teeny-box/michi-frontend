import { ChangePassword } from "@/screens/common/findPassword/ChangePassword";
import { IdCheck } from "@/screens/common/findPassword/IdCheck";
import { IdFound } from "@/screens/common/finduserId/IdFound";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";

export type FindPasswordRootStackParam = {
  idCheck: undefined;
  findPassword: undefined;
  changePassword: undefined;
};

const Stack = createNativeStackNavigator<FindPasswordRootStackParam>();

export function FindPasswordStackNavigation() {
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
    <Stack.Navigator initialRouteName="idCheck" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="idCheck" component={IdCheck} />
      <Stack.Screen name="findPassword" component={IdFound} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}