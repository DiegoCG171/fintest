import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSession, removeSession } from "../../../services/catalogs/session.service";
import { toggleConfirmSessionModal } from "../UI/confirmSession/modalCoinfirmSession.slice";

export interface CreateSessionPayload {
    processingMethod: string;
    ip?: string;
    portNumber?: number; 
    toExecute: RunnableToExecute[]
}

export interface RunnableToExecute {
    runnableId: string;
    runnableType: RunnableType;
}

export type RunnableType = 'collection' | 'testCase';

export const createSessionThunk = createAsyncThunk(
  "auth/createSession",
  async (createSessionPayload: CreateSessionPayload, { rejectWithValue, dispatch }) => {
    try {
      console.debug(createSessionPayload)
      const {type, data} = await createSession(createSessionPayload);

      if(type === 'SESSION_CONFLICT') {
        dispatch(toggleConfirmSessionModal(true));
      }
      return {type, data, sessionPayload: createSessionPayload};
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const removeSessionThunk = createAsyncThunk(
  "auth/removeSession",
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeSession(id);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
