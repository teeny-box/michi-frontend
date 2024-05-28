import { headerShowState } from "@/recoil/commonAtoms";
import { ChangePassword } from "@/screens/common/findPassword/ChangePassword";
import { FindPassword } from "@/screens/common/findPassword/FindPassword";
import { IdExistCheck } from "@/screens/common/findPassword/IdExistCheck";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";

export type FindPasswordRootStackParam = {
  idCheck: undefined;
  findPassword: undefined;
  changePassword: undefined;
};

const Stack = createNativeStackNavigator<FindPasswordRootStackParam>();

export function FindPasswordStackNavigation() {
  const headerShow = useRecoilValue(headerShowState);

  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: "비밀번호 찾기",
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTintColor: "#141414",
    headerTitleStyle: {
      fontWeight: "bold",
      fontFamily: "Freesentation-6SemiBold",
      fontSize: 20,
      color: "#141414",
    },
    headerBackTitleVisible: false,
    headerTransparent: true,
    headerShown: true,
  };

  return (
    <Stack.Navigator initialRouteName="idCheck" screenOptions={customStackNavigationOptions}>
      <Stack.Screen name="idCheck" component={IdExistCheck} />
      <Stack.Screen name="findPassword" component={FindPassword} options={{ headerShown: headerShow }} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
