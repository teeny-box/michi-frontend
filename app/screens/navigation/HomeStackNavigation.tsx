import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feed } from "../home/Feed";
import { FeedEdit } from "../home/FeedEdit";

export type RootStackParam = {
  feed: undefined;
  feedEdit: undefined;
};

const Stack = createNativeStackNavigator();

export function HomeStackNavigation() {
  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: "피드 작성하기",
    headerTitle: "",
    headerLargeStyle: false,
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTintColor: "#111",
    headerBackTitleStyle: {
      fontFamily: "Freesentation-5Medium",
    },
  };

  return (
    <Stack.Navigator initialRouteName="feed" screenOptions={customStackNavigationOptions}>
      <Stack.Screen name="feed" component={Feed} options={{ headerShown: false }} />
      <Stack.Screen name="feedEdit" component={FeedEdit} />
    </Stack.Navigator>
  );
}
