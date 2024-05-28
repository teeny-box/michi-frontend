import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { accessTokenState, userState } from "@/recoil/authAtoms";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { MainTabNavigation } from "./MainTabNavigation";
import { StartStackNavigation } from "./StartStackNavigation";
import { FeedEdit } from "../home/FeedEdit";
import { useEffect, useState } from "react";
import { userUrl } from "@/utils/apiUrls";
import SplashScreen from "react-native-splash-screen";
import { useAccessToken } from "@/hook/useAccessToken";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  main: undefined;
  feedEdit: undefined;
};

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  const accessToken = useRecoilValue(accessTokenState);
  const { getTokenFromAsyncStorege, updateToken } = useAccessToken();
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const success = await getTokenFromAsyncStorege();
      if (!success) setLoading(false);
    })();
  }, []);

  useEffect(() => {
    console.log("accessToken : ", accessToken);
    if (accessToken) {
      getUserData();
    } else if (accessToken !== null && accessToken !== undefined) {
      resetUser();
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 200); //스플래시 활성화 시간
    }
  }, [loading]);

  const getUserData = async () => {
    try {
      const res = await fetch(`${userUrl}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
        setLoading(false);
      } else {
        // 엑세스 토큰 재발급 받기
        await updateToken();
      }
    } catch (err) {
      console.error("get user data error : ", err);
    }
  };

  return (
    <>
      {accessToken ? (
        <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="main" component={MainTabNavigation} options={{ headerShown: false }} />
          <Stack.Screen
            name="feedEdit"
            component={FeedEdit}
            options={{
              headerShown: true,
              gestureEnabled: false,
              headerTitle: "",
              headerBackTitle: "피드 작성하기",
              headerBackTitleStyle: {
                fontFamily: "Freesentation-5Medium",
              },
              headerLargeStyle: false,
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTintColor: "#111",
            }}
          />
        </Stack.Navigator>
      ) : (
        <StartStackNavigation />
      )}
    </>
  );
}
