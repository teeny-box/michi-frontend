import { accessTokenState, userState } from "@/recoil/authAtoms";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { MainTabNavigation } from "./MainTabNavigation";
import { StartStackNavigation } from "./StartStackNavigation";
import { useEffect, useState } from "react";
import { userUrl } from "@/utils/apiUrls";
import SplashScreen from "react-native-splash-screen";
import { useAccessToken } from "@/hook/useAccessToken";

export function AppNavigation() {
  const accessToken = useRecoilValue(accessTokenState);
  const { getTokenFromAsyncStorege, updateAccessToken } = useAccessToken();
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
    if (accessToken) {
      getUserData();
    } else if (accessToken !== null || accessToken !== undefined) {
      resetUser();
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 100); //스플래시 활성화 시간
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
        await updateAccessToken();
      }
    } catch (err) {
      console.error("get user data error : ", err);
    }
  };

  return <>{accessToken ? <MainTabNavigation /> : <StartStackNavigation />}</>;
}
