import { headerShowState } from "@/recoil/commonAtoms";
import { FindId } from "@/screens/common/finduserId/FindId";
import { IdFound } from "@/screens/common/finduserId/IdFound";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";

export type FindIDRootStackParam = {
  findId: undefined;
  idFound: undefined;
};

const Stack = createNativeStackNavigator<FindIDRootStackParam>();

export function FindIdStackNavigation() {
  const headerShow = useRecoilValue(headerShowState);
  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: "아이디 찾기",
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: "Freesentation-5Medium",
    },
    headerTransparent: true,
    headerShown: true,
  };

  return (
    <Stack.Navigator initialRouteName="findId" screenOptions={customStackNavigationOptions}>
      <Stack.Screen name="findId" component={FindId} options={{ headerShown: headerShow }} />
      <Stack.Screen name="idFound" component={IdFound} />
    </Stack.Navigator>
  );
}
