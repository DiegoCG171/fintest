import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { onGetMessage, onGetMessages } from "../store/messages/messagesSlice";

interface Props {
  serverPath: string;
}

export const useSocket = ({ serverPath }: Props) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback(() => {
    const socketTemp = io(serverPath, {
      transports: ["websocket"],
      query: {
        token: localStorage.getItem('token')
      },
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const disconectSocket = useCallback(() => {
    socket?.disconnect();
  }, [serverPath]);

  useEffect(() => {
    socket?.on("send-message", (message) => {
      dispatch(onGetMessage(message));
      dispatch(onGetMessages(message));
    });
  }, [socket]);

  return {
    socket,
    connectSocket,
    disconectSocket,
  };
};
