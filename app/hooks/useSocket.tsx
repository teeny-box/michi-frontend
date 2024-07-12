import { accessTokenState } from "@/recoil/authAtoms";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { io, Socket } from "socket.io-client";

export let socket: Socket;

export function useSocket() {
  const accessToken = useRecoilValue(accessTokenState);

  useEffect(() => {
    if (socket) {
      console.log("disconnect ", socket.id, socket.connected);
      socket.disconnect();
    }
    accessToken && connectSocket();
  }, [accessToken]);

  const connectSocket = () => {
    socket = io(`${process.env.BASE_URL}/socket/chat`, {
      extraHeaders: {
        Authorization: `${accessToken}`,
      },
    });

    socket.on("connect", () => {
      console.log("is connected :", socket.connected);
    });

    socket.on("onError", e => {
      console.log(e);
    });
  };

  return { socket, connectSocket };
}
