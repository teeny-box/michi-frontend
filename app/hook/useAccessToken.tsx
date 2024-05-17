import { setAsyncStorage, removeAsyncStorage } from "@/storage/AsyncStorage";
import { authUrl } from "../utils/apiUrls";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/recoil/authAtoms";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAccessToken() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const getTokenFromAsyncStorege = async () => {
    try {
      const storageAccessToken = await AsyncStorage.getItem("accessToken");
      if (storageAccessToken) {
        setAccessToken(JSON.parse(storageAccessToken));
        return 1;
      }
    } catch (err) {
      console.error("get token from AsyncStorage error : ", err);
    }
  };

  const deleteAccessToken = async () => {
    try {
      setAccessToken("");
      await removeAsyncStorage("accessToken");
      await removeAsyncStorage("refreshToken");
    } catch (err) {
      console.error("delete access token error : ", err);
    }
  };

  const updateAccessToken = async () => {
    try {
      const storageRefreshToken = await AsyncStorage.getItem("refreshToken");
      const res = await fetch(`${authUrl}/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${storageRefreshToken}` },
        body: JSON.stringify({ accessToken }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        const { accessToken, refreshToken } = data.data;
        setAccessToken(accessToken);
        setAsyncStorage("accessToken", accessToken);
        setAsyncStorage("refreshToken", refreshToken);
        return 1;
      } else {
        deleteAccessToken();
      }
    } catch (err) {
      console.error("update access token error : ", err);
    }
  };

  return { getTokenFromAsyncStorege, updateAccessToken, deleteAccessToken };
}
