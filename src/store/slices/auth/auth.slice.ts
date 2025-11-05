import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../config/interfaces";
import { loginThunk, logoutThunk } from "./login.thunk";
import { renewTokenThunk } from "./renewTokenThunk.thunk";
import { isTokenValid } from "../../../config/utils/isTokenValid";

const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token,
  loading: false,
  error: null,
  isAuthenticated: isTokenValid(token),
  changePasswordActive: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    activeChangePassword: (state) => {
      state.changePasswordActive = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      })
      .addCase(renewTokenThunk.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.changePasswordActive = false;
        localStorage.clear();
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      });
  },
});

export const { clearAuthError, activeChangePassword } =
  authSlice.actions;
