import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableRowData } from "../../../config/interfaces";
import { messagesInitialState } from "./messages.state";
import {
  mapSocketMessageToTableRowData,
  mapToActiveFields,
  mapToErroredFields,
} from "../../../config/utils/messages.utils";
import { IncomingSocketMessage } from "../../../config/interfaces/messages.interface";
import { logoutThunk } from "../auth/login.thunk";
import { resolveTargetFromRoute } from "../../../config/utils/resolveTargetFromRoute";

interface ActiveMessage {
  id?: number | string;
  data: TableRowData[];
}

type MessageTarget = "emmisor" | "acquirer";


export const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesInitialState,
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<IncomingSocketMessage>
    ) => {
      const message = action.payload;
      const MAX_EVENTS = 100;

      const mapped = mapSocketMessageToTableRowData(message);

      const bucket =
        resolveTargetFromRoute() === "emmisor"
          ? state.eventsEmmisor
          : state.eventsAcquirer;

      bucket.unshift(mapped);

      if (bucket.length > MAX_EVENTS) {
        bucket.length = MAX_EVENTS;
      }

      localStorage.setItem(
        `events-${resolveTargetFromRoute()}`,
        JSON.stringify(bucket)
      );
    },

    setActiveMessage: (
      state,
      action: PayloadAction<ActiveMessage>
    ) => {
      state.activeMessage.id = action.payload.id || 0;
      state.activeMessage.detail = mapToActiveFields(
        action.payload.data
      );
      state.activeMessage.errors = mapToErroredFields(
        action.payload.data
      );
    },

    clearMessages: (
      state,
      action: PayloadAction<MessageTarget>
    ) => {
      const target = action.payload;

      if (target === "emmisor") {
        state.eventsEmmisor = [];
        localStorage.removeItem("events-emmisor");
      } else {
        state.eventsAcquirer = [];
        localStorage.removeItem("events-acquirer");
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.eventsEmmisor = [];
      state.eventsAcquirer = [];
      localStorage.removeItem("events-emmisor");
      localStorage.removeItem("events-acquirer");
    });
  },
});

export const {
  setMessage,
  setActiveMessage,
  clearMessages,
} = messagesSlice.actions;
