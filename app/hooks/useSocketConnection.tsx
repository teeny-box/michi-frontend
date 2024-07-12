import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRecoilState } from "recoil";
import { socketState } from "../recoil/socketAtom";
import { accessTokenState } from "../recoil/authAtoms";

const useSocketConnection = (url: string) => {
  const [socket, setSocket] = useRecoilState<Socket | null>(socketState);
  const accessToken = useRecoilState(accessTokenState);

  useEffect(() => {
    if (!accessToken) return;

    const socketConnection = io(url, {
      transports: ["websocket"],
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [url, accessToken]);

  return socket;
};

export default useSocketConnection;
