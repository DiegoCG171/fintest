import { createSlice } from "@reduxjs/toolkit";
import { TableRowData } from "../../../config/interfaces";
import {
  CreateSessionPayload,
  createSessionThunk,
  removeSessionThunk,
} from "./session.thunk";
import { mapRunSessionItems } from "../../../config/utils/sessions.utils";
import { setMessage } from "../messages/messages.slice";
import { mapSocketMessageToTableRowData } from "../../../config/utils/messages.utils";
import { IncomingSocketMessage } from "../../../config/interfaces/messages.interface";

interface sessionInitialState {
  isActive: boolean;
  isOpenDetails: boolean;
  runningSession: boolean;
  loading: boolean;
  activeSession: SessionItem[];
  completedCount: number;
  processedIncrementals: string[];
  id: string;
  prevConfigCreateSession: CreateSessionPayload;
}

export interface SessionItem {
  runnableId: string;
  status: string;
  name: string;
  message: TableRowData;
  incremental?: string;
}

const initialState: sessionInitialState = {
  id: "",
  isActive: false,
  loading: false,
  isOpenDetails: false,
  runningSession: false,
  activeSession: [],
  completedCount: 0,
  processedIncrementals: [],
  prevConfigCreateSession: {
    processingMethod: "",
    ip: '',
    portNumber: 0,
    toExecute: [],
  },
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    openSession: (state) => {
      state.isActive = true;
    },
    closeSession: (state) => {
      state.isActive = false;
    },
    toggleRunningSession: (state, action) => {
      state.runningSession = action.payload;
    },
    toggleSessionDetails: (state, action) => {
      state.isOpenDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSessionThunk.fulfilled, (state, action) => {
        state.isActive = action.payload.type === "DEFAULT" ? true : false;
        state.id = action.payload.data.uuid;
        state.activeSession = mapRunSessionItems(
          action.payload.type === "DEFAULT"
            ? action.payload.data.toExecute
            : action.payload.data.toExecute
        );
        state.completedCount = 0;
        state.prevConfigCreateSession = action.payload.sessionPayload;
      })
      .addCase(removeSessionThunk.fulfilled, (state) => {
        state.isActive = false;
        state.id = "";
        state.isOpenDetails = false;
        state.runningSession = false;
        state.loading = false;
        state.activeSession = [];
        state.completedCount = 0;
        state.processedIncrementals = [];
      })
      .addCase(setMessage, (state, action) => {
        const socketMsg = action.payload as IncomingSocketMessage;
        const message = mapSocketMessageToTableRowData(socketMsg);

        state.loading = true;

        if (state.processedIncrementals.includes(socketMsg.incremental)) {
          state.loading = false;
          return;
        }

        const currentIndex = state.activeSession.findIndex(
          (item) => item.status === "En progreso..."
        );

        if (currentIndex !== -1) {
          const currentItem = state.activeSession[currentIndex];

          currentItem.status = "Terminado";
          currentItem.message = message;
          currentItem.incremental = socketMsg.incremental;
          state.completedCount += 1;

          state.processedIncrementals.push(socketMsg.incremental);

          if (state.activeSession[currentIndex + 1]) {
            state.activeSession[currentIndex + 1].status = "En progreso...";
          }
        }

        state.loading = false;
      });
  },
});

export const {
  openSession,
  closeSession,
  toggleRunningSession,
  toggleSessionDetails,
  setLoading,
} = sessionSlice.actions;
