import { Socket } from "socket.io-client";
import { AppDispatch } from "../../store/store";
import { setMessage } from "../../store/slices/messages/messages.slice";

export const registerMessagesHandlers = (
  socket: Socket,
  dispatch: AppDispatch
) => {
  socket.on("send-message", (msg) => {
    dispatch(setMessage( msg));
  });
};
 