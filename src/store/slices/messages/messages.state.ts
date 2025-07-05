import { MessagesState } from "../../../config/interfaces/messages.interface";

export const messagesInitialState: MessagesState = {
    activeMessage: {
      id: 0,
      detail: [],
      errors: [],
    },
    events: [],
  };