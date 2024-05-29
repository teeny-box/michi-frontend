import { setAsyncStorage, removeAsyncStorage } from "@/storage/AsyncStorage";
import { authUrl } from "../utils/apiUrls";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/recoil/authAtoms";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAccessToken() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const getAccessTokenFromAsyncStorage = async () => {
    try {
      const storageAccessToken = await AsyncStorage.getItem("accessToken");
      return storageAccessToken && JSON.parse(storageAccessToken);
    } catch (err) {
      console.error("get token from AsyncStorage error : ", err);
    }
  };

  const updateAccessTokenFromAsyncStorage = async () => {
    try {
      const storageAccessToken = await getAccessTokenFromAsyncStorage();
      if (storageAccessToken) {
        setAccessToken(storageAccessToken);
      }
      return storageAccessToken;
    } catch (err) {
      console.error("get token from AsyncStorage error : ", err);
    }
  };

  const deleteToken = async () => {
    console.log("deleteToken");
    try {
      setAccessToken("");
      await removeAsyncStorage("accessToken");
      await removeAsyncStorage("refreshToken");
    } catch (err) {
      console.error("delete access token error : ", err);
    }
  };

  const updateToken = async () => {
    console.log("updateToken");
    try {
      const storageRefreshToken = await AsyncStorage.getItem("refreshToken");
      if (!storageRefreshToken) return;

      const res = await fetch(`${authUrl}/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${JSON.parse(storageRefreshToken)}` },
        body: JSON.stringify({ accessToken }),
      });

      if (res.ok) {
        const data = await res.json();
        const { accessToken, refreshToken } = data.data;
        setAccessToken(accessToken);
        await setAsyncStorage("accessToken", accessToken);
        await setAsyncStorage("refreshToken", refreshToken);
        return 1;
      } else {
        await deleteToken();
      }
    } catch (err) {
      console.error("update access token error : ", err);
    }
  };

  return { getAccessTokenFromAsyncStorage, updateAccessTokenFromAsyncStorage, updateToken, deleteToken };
}
