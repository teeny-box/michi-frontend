import { tokenState } from "@/recoil/authAtoms";
import { useRecoilState } from "recoil";
import { MainTabNavigation } from "./MainTabNavigation";
import { StartStackNavigation } from "./StartStackNavigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";

export function AppNavigation() {
  const [state, setState] = useState("loading");
  const [token, setToken] = useRecoilState(tokenState);

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
