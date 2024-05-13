import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../home/Home";
import { FeedEdit } from "../home/FeedEdit";

export type RootStackParam = {
    home: undefined;
    feedEdit: undefined;
  };

const Stack = createNativeStackNavigator();

export function HomeStackNavigation() {
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
    <Stack.Navigator initialRouteName="home" screenOptions={{ headerTransparent: false }}>
      <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="feedEdit" component={FeedEdit} />
    </Stack.Navigator>
  );
}
