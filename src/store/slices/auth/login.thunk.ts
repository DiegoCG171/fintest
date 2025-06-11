import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService } from "../../../services";
import { LoginCredentials, LoginResponse } from "../../../config/interfaces";

export const loginThunk = createAsyncThunk<
    LoginResponse,
    LoginCredentials,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const userData = await loginService(credentials);
            if(!userData.token) {return rejectWithValue('Error en inicio de sesión')} else {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('user', JSON.stringify(userData));
                return userData;
            }
        } catch (error: unknown) {
            return rejectWithValue(error as string);
        } 
    }
);
