import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../config/interfaces";
import { loginThunk, logoutThunk } from "./login.thunk";
import { renewTokenThunk } from "./renewTokenThunk.thunk";
import { isTokenValid } from "../../../config/utils/isTokenValid";
import { updateUserThunk } from "../users/user.thunk";
import { updateConfigUserThunk } from "../users/userConfiguration.thunk";

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
    logout(state) {
      state.user = null;
      state.changePasswordActive = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("events");
      state.isAuthenticated = false;
    },
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
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.changePasswordActive = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user =
          state.user?.id === action.payload.id
            ? { ...state.user, ...action.payload }
            : state.user;
      })
      .addCase(updateConfigUserThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.userConfiguration = action.payload;
        }
      });
  },
});

export const { clearAuthError, activeChangePassword, logout } =
  authSlice.actions;
