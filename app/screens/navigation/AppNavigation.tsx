import { tokenState, userState } from "@/recoil/authAtoms";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { MainTabNavigation } from "./MainTabNavigation";
import { StartStackNavigation } from "./StartStackNavigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { userUrl } from "@/utils/apiUrls";

export function AppNavigation() {
  const [state, setState] = useState("loading");
  const [token, setToken] = useRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);

  useEffect(() => {
    const getTokenFromAsyncStorege = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("token : ", token);
        if (token) {
          setToken(token);
        }
      } catch (err) {
        console.error("get token from AsyncStorage error : ", err);
      } finally {
        setState("done");
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
      getUserData();
    } else {
      resetUser();
    }
  }, [token]);

  return (
    <>
      {state === "loading" ? (
        // loading 이미지 splash 화면이랑 동일하게 변경하기
        <View>
          <Text>loading</Text>
        </View>
      ) : token ? (
        <MainTabNavigation />
      ) : (
        <StartStackNavigation />
      )}
    </>
  );
}
