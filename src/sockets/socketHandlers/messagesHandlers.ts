import { Socket } from "socket.io-client";

export const registerMessagesHandlers = (socket: Socket) => {
  socket.on("send-message", (msg) => {
    console.log(msg)
  });
};
