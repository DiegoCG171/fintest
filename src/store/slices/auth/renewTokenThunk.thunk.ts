import { createAsyncThunk } from "@reduxjs/toolkit";
import { renewToken } from "../../../services/auth/renewToken.service";

export const renewTokenThunk = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/renewToken", async (_, { rejectWithValue }) => {
  try {
    const token = await renewToken();
    return token;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Sesión expirada");
  }
});
