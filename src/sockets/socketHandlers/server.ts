import { Socket } from "socket.io-client";
import { AppDispatch } from "../../store/store";

export const registerServerHandlers = (
  socket: Socket,
  dispatch: AppDispatch
) => {
  socket.on("server-started", (server) => {
    console.log(server)
  });

  socket.on("server-stopped", (server) => {
    console.log(server)
  });
};