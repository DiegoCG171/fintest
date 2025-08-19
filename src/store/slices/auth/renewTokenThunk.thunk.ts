import { createAsyncThunk } from "@reduxjs/toolkit";
import { renewToken } from "../../../services/auth/renewToken.service";

export const renewTokenThunk = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/renewToken", async (_, { rejectWithValue }) => {
  try {
    const token = await renewToken();
    console.log("📬 Token received in thunk:", token);
    return token;
  } catch (error) {
    console.log("❌ Error in renewTokenThunk:", error);
    return rejectWithValue("Sesión expirada");
  }
});
