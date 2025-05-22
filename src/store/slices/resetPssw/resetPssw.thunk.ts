import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPssw } from "../../../services";

export const resetPsswThunk = createAsyncThunk<
  void,
  { pssw: string; token: string },
  { rejectValue: string }
>(
  'resetPssw/postPssw',
  async ({ pssw, token }, { rejectWithValue }) => {
    try {
      await resetPssw(pssw, token);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

