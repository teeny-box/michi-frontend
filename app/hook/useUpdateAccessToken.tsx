import { setAsyncStorage, removeAsyncStorage } from "@/storage/AsyncStorage";
import { authUrl } from "../utils/apiUrls";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/recoil/authAtoms";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useUpdateAccessToken() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

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
      } else {
        setAccessToken("");
        removeAsyncStorage("accessToken");
        removeAsyncStorage("refreshToken");
      }
    } catch (err) {
      console.error("update access token error : ", err);
    }
  };

  return updateAccessToken;
}
