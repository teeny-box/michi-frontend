import { accessTokenState } from "@/recoil/authAtoms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io, Socket } from "socket.io-client";

export let socket: Socket;

export function useSocket() {
  const accessToken = useRecoilValue(accessTokenState);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

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
      socket.emit('getOnlineUsers', { page: 1, pageSize: 10 });
    });

    socket.on("onError", e => {
      console.log(e);
    }); 

    socket.on('onGetOnlineUsers', (data) => {
      console.log('onGetOnlineUsers received:', data);
      setOnlineUsers(data.data);
    });
  };

  return { socket, connectSocket, onlineUsers };
}