import { useState } from "react";
import { SocketKey } from "../../sockets/socketConfig";
import { connectAllSockets, disconnectAllSockets, getSocket } from "../../sockets/socketRegistry";


export const useMultiSocket = () => {
  const [connected, setConnected] = useState(false);

  const connect = () => {
    connectAllSockets();
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
