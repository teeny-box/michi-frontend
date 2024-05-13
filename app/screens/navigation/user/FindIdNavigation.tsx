import { FindId } from "@/screens/common/finduserId/FindId";
import { IdFound } from "@/screens/common/finduserId/IdFound";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";

export type FindIDRootStackParam = {
  findId: undefined;
  idFound: undefined;
};

const Stack = createNativeStackNavigator<FindIDRootStackParam>();

export function FindIdStackNavigation() {
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
    <Stack.Navigator initialRouteName="findId" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="findId" component={FindId} />
      <Stack.Screen name="idFound" component={IdFound} />
    </Stack.Navigator>
  );
}
