import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChangePasswordCredentials,
  LoginResponse,
} from "../../../config/interfaces";
import { changePasswordService } from "../../../services/auth/changePassword.service";

export const changePasswordThunk = createAsyncThunk<
  LoginResponse,
  ChangePasswordCredentials,
  { rejectValue: string }
>(
  "auth/login",
  async (
    changePasswordCredentials: ChangePasswordCredentials,
    { rejectWithValue }
  ) => {
    try {
      const userData = await changePasswordService(changePasswordCredentials);
      if (!userData.token) {
        return rejectWithValue("Error en inicio de sesión");
      } else {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      }
    } catch (error: unknown) {
      return rejectWithValue(error as string);
    }
  }
);
