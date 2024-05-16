import { accessTokenState, userState } from "@/recoil/authAtoms";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { MainTabNavigation } from "./MainTabNavigation";
import { StartStackNavigation } from "./StartStackNavigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authUrl, userUrl } from "@/utils/apiUrls";
import { removeAsyncStorage, setAsyncStorage } from "@/storage/AsyncStorage";
import SplashScreen from "react-native-splash-screen";
import { useUpdateAccessToken } from "@/hook/useUpdateAccessToken";

export function AppNavigation() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const updateAccessToken = useUpdateAccessToken();
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokenFromAsyncStorege = async () => {
      try {
        const storageAccessToken = await AsyncStorage.getItem("accessToken");
        if (storageAccessToken) {
          setAccessToken(JSON.parse(storageAccessToken));
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("get token from AsyncStorage error : ", err);
      }
    };

    getTokenFromAsyncStorege();
  }, []);

  useEffect(() => {
    if (accessToken) {
      getUserData();
    } else {
      resetUser();
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
