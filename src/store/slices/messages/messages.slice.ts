import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableRowData } from "../../../config/interfaces";
import { messagesInitialState } from "./messages.state";
import { mapSocketMessageToTableRowData, mapToActiveFields, mapToErroredFields } from "../../../config/utils/messages.utils";
import { IncomingSocketMessage } from "../../../config/interfaces/messages.interface";

interface ActiveMessage {
  id?: number | string;
  data: TableRowData[]
}

export const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesInitialState,
  reducers: {
    setMessage: (state, action: PayloadAction<IncomingSocketMessage>) => {
      const message = mapSocketMessageToTableRowData(action.payload)
      state.events.unshift(message as TableRowData);
    },
    setActiveMessage: (state, action: PayloadAction<ActiveMessage>) => {
      state.activeMessage.id = action.payload.id || 0;
      state.activeMessage.detail = mapToActiveFields(action.payload.data);
      state.activeMessage.errors = mapToErroredFields(action.payload.data);
      console.log(action.payload.data)
      console.log(action.payload.id)
      console.log(state.activeMessage.detail)
      console.log(state.activeMessage.errors)
    },
  },
});

export const { setMessage,  setActiveMessage } = messagesSlice.actions;
