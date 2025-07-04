import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSession } from "../../../services/catalogs/session.service";

export interface CreateSessionPayload {
    toExecute: RunnableToExecute[]
}

export interface RunnableToExecute {
    runnableId: string;
    runnableType: RunnableType;
}

type RunnableType = 'collection' | 'testCase';

export const createSessionThunk = createAsyncThunk(
  "auth/createSession",
  async (createSessionPayload: CreateSessionPayload, { rejectWithValue }) => {
    try {
      return await createSession(createSessionPayload);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
