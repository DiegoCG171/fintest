import { MessagesState } from "../../../config/interfaces/messages.interface";

export const messagesInitialState: MessagesState = {
  activeMessage: {
    id: 0,
    detail: [],
    errors: [],
  },
  eventsEmmisor: JSON.parse(
    localStorage.getItem(`events-emmisor`) || "[]"
  ),
  eventsAcquirer: JSON.parse(
    localStorage.getItem(`events-acquirer`) || "[]"
  ),
};
