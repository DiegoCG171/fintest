import { useState } from "react";
import { SocketKey } from "../../sockets/socketConfig";
import { connectAllSockets, disconnectAllSockets, getSocket } from "../../sockets/socketRegistry";
import { useAppDispatch } from "../../store/hooks";


export const useMultiSocket = () => {
  const dispatch = useAppDispatch();
  const [connected, setConnected] = useState(false);

  const connect = () => {
    connectAllSockets(dispatch);
    setConnected(true);
  };

  const disconnect = () => {
    disconnectAllSockets();
    setConnected(false);
  };

  const socket = (key: SocketKey) => getSocket(key);

  return {
    connect,
    disconnect,
    socket,
    connected,
  };
};
