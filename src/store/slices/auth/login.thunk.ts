import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService, logout as logoutService } from "../../../services";
import { LoginCredentials, LoginResponse } from "../../../config/interfaces";
import { logout } from "./auth.slice";

export const loginThunk = createAsyncThunk<
    LoginResponse,
    LoginCredentials,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const userData = await loginService(credentials);
            if (!userData.token) { return rejectWithValue('Error en inicio de sesión') } else {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('user', JSON.stringify(userData));
                return userData;
            }
        } catch (error: unknown) {
            return rejectWithValue(error as string);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return rejectWithValue("No hay sesión activa para cerrar.");
            } else {

                const response = await logoutService();
                if (response.success) {
                    dispatch(logout());
                    return "Logout exitoso";
                }
            }

        } catch (error: unknown) {
            return rejectWithValue(error as string || "Error desconocido");
        }
    }
);


