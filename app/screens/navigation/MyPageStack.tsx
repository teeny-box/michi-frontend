import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyPage } from "../mypage/MyPage";
import { ChangeId } from "../mypage/ChangeId";

const Stack = createNativeStackNavigator();

export function MyPageStackNavigation() {
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
    <Stack.Navigator initialRouteName="mypage" screenOptions={{ headerTransparent: true }}>
      <Stack.Screen name="mypage" component={MyPage} options={{ headerShown: false }} />
      <Stack.Screen name="changeId" component={ChangeId} />
    </Stack.Navigator>
  );
}
