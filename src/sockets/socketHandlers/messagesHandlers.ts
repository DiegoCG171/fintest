import { Socket } from "socket.io-client";
import { AppDispatch } from "../../store/store";
import { setMessage } from "../../store/slices/messages/messages.slice";
import { clearServer, setServer } from "../../store/slices/server/server.slice";

export const registerMessagesHandlers = (
  socket: Socket,
  dispatch: AppDispatch
) => {
  socket.on("send-message", (msg) => {
    dispatch(setMessage( msg));
  });
  
  socket.on("server-started", (server) => {
     dispatch(setServer(server));
  });

  socket.on("server-stopped", () => {
    dispatch(clearServer())
  });
};