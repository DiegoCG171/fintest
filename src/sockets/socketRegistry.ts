import { io, Socket } from "socket.io-client";
import { SOCKETS, SocketKey } from "./socketConfig";
import { registerMessagesHandlers } from "./socketHandlers/messagesHandlers";

const registry = new Map<SocketKey, Socket>();

const eventHandlers = {
    messages: registerMessagesHandlers
};

export const createSocket = (key: SocketKey) => {
  if (!registry.has(key)) {
    const socket = io(SOCKETS[key], {
      transports: ["websocket"],
      query: { token: localStorage.getItem("token") || "" },
    });

    registry.set(key, socket);

    const handler = eventHandlers[key];
    if (handler) handler(socket);
  }
};

export const getSocket = (key: SocketKey) => registry.get(key);

export const connectAllSockets = () => {
  Object.keys(SOCKETS).forEach((key) => {
    const k = key as SocketKey;
    createSocket(k);
    registry.get(k)?.connect();
  });
};

export const disconnectAllSockets = () => {
  registry.forEach((socket) => socket.disconnect());
  registry.clear();
};
