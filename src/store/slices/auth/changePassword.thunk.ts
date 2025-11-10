import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChangePasswordCredentials } from "../../../config/interfaces";
import { changePasswordService } from "../../../services/auth/changePassword.service";
import { logoutThunk } from "./login.thunk";

export const changePasswordThunk = createAsyncThunk<
  void,
  ChangePasswordCredentials,
  { rejectValue: string }
>(
  "auth/changePassword",
  async (
    changePasswordCredentials: ChangePasswordCredentials,
    { dispatch, rejectWithValue }
  ) => {
    try {
      await changePasswordService(changePasswordCredentials);
      ;
    } catch (error: unknown) {
      let message = "Error desconocido";

      if (typeof error === "string") {
        message = error;
      } else if (error instanceof Error) {
        message = error.message;
      }

      if (message.includes("bloqueado")) {
        dispatch(logoutThunk());
      }

      return rejectWithValue(message);
    }
  }
);