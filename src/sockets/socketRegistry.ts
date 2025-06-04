import { io, Socket } from "socket.io-client";
import { SOCKETS, SocketKey } from "./socketConfig";
import { registerMessagesHandlers } from "./socketHandlers/messagesHandlers";
import { AppDispatch } from "../store/store";

const registry = new Map<SocketKey, Socket>();

const eventHandlers: Record<SocketKey, (socket: Socket, dispatch: AppDispatch) => void> = {
  messages: registerMessagesHandlers,
};

export const createSocket = (key: SocketKey, dispatch: AppDispatch) => {
  if (!registry.has(key)) {
    const socket = io(SOCKETS[key], {
      transports: ["polling", "websocket"],
      //transports: ["websocket"],
      query: { token: localStorage.getItem("token") || "" },
    });

    registry.set(key, socket);

    const handler = eventHandlers[key];
    if (handler) handler(socket, dispatch);
  }
};

export const getSocket = (key: SocketKey) => registry.get(key);

export const connectAllSockets = (dispatch: AppDispatch) => {
  Object.keys(SOCKETS).forEach((key) => {
    const k = key as SocketKey;
    createSocket(k, dispatch);
    registry.get(k)?.connect();
  });
};

export const disconnectAllSockets = () => {
  registry.forEach((socket) => socket.disconnect());
  registry.clear();
};
