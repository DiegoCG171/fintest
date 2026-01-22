import { createSlice } from "@reduxjs/toolkit";
import { TableRowData } from "../../../config/interfaces";
import {
  CreateSessionPayload,
  createSessionThunk,
  removeSessionThunk,
} from "./session.thunk";
import {
  mapRunSessionItems,
  RunnableToExecuteItem,
} from "../../../config/utils/sessions.utils";
import { setMessage } from "../messages/messages.slice";
import { mapSocketMessageToTableRowData } from "../../../config/utils/messages.utils";
import { IncomingSocketMessage } from "../../../config/interfaces/messages.interface";
import { resolveTargetFromRoute } from "../../../config/utils/resolveTargetFromRoute";

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
    ip: "",
    portNumber: 0,
    toExecute: [],
  },
};

const saveResultToLocalStorage = (result: {
  caseId: string;
  status: string;
  message: TableRowData;
}) => {
  const key = "session-results";

  const existing = localStorage.getItem(key);
  const parsed = existing ? JSON.parse(existing) : [];

  parsed.push(result);

  localStorage.setItem(`session-results-${resolveTargetFromRoute()}`, JSON.stringify(parsed));
};

const loadResultsFromLocalStorage = (): RunnableToExecuteItem[] => {
  const raw = localStorage.getItem(`session-results-${resolveTargetFromRoute()}`);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    return parsed.map((r: any) => ({
      message: r.message,
      caseId: r.caseId ?? r.incremental,
      status: r.status,
    }));
  } catch {
    return [];
  }
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
        state.isActive = action.payload.type === "DEFAULT";
        state.id = action.payload.data.uuid;

        const storedResults = loadResultsFromLocalStorage();
        state.activeSession = mapRunSessionItems(
          action.payload.data.toExecute,
          storedResults.length > 0 ? storedResults : action.payload.data.result,
        );
        state.completedCount = state.activeSession.filter(
          (item) =>
            item.status !== "Pendiente..." && item.status !== "En progreso...",
        ).length;

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
          (item) => item.status === "En progreso...",
        );

        if (currentIndex !== -1) {
          const currentItem = state.activeSession[currentIndex];

          const status = message.estado
            ? message.estado.toLowerCase()
            : "Terminado";

          currentItem.status = status;
          currentItem.message = message;
          currentItem.incremental = socketMsg.incremental;

          state.completedCount += 1;
          state.processedIncrementals.push(socketMsg.incremental);

          saveResultToLocalStorage({
            caseId: currentItem.runnableId,
            status,
            message,
          });

          if (state.activeSession[currentIndex + 1]) {
            state.activeSession[currentIndex + 1].status = "En progreso...";
          }
        }

        if (state.completedCount >= state.activeSession.length) {
          localStorage.removeItem(`session-results-${resolveTargetFromRoute()}`);
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
