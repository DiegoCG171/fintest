import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResetPassword } from "../../../config/interfaces";
import { resetPassword as resetPasswordService } from "../../../services/auth/resetPassword.service";

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (resetPassword: ResetPassword, { rejectWithValue }) => {
    try {
      return await resetPasswordService(resetPassword);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
