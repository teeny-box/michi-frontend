import { tokenState, userState } from "@/recoil/authAtoms";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { MainTabNavigation } from "./MainTabNavigation";
import { StartStackNavigation } from "./StartStackNavigation";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userUrl } from "@/utils/apiUrls";

export function AppNavigation() {
  const [token, setToken] = useRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);

  useEffect(() => {
    const getTokenFromAsyncStorege = async () => {
      try {
        const storageToken = await AsyncStorage.getItem("token");
        if (storageToken) {
          setToken(storageToken);
        }
      } catch (err) {
        console.error("get token from AsyncStorage error : ", err);
      }
    };

    getTokenFromAsyncStorege();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`${userUrl}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
        }
      } catch (err) {
        console.error("get user data error : ", err);
      }
    };

    if (token) {
      // getUserData();
    } else {
      resetUser();
    }
  }, [token]);

  return <>{token ? <MainTabNavigation /> : <StartStackNavigation />}</>;
}
