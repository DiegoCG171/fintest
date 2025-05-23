import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService } from "../../../services";
import { LoginCredentials, LoginResponse } from "../../../config/interfaces";
import { setLoading } from "../UI/loader/loader.slice";

export const loginThunk = createAsyncThunk<
    LoginResponse,
    LoginCredentials,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));
            const userData = await loginService(credentials);
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error: unknown) {
            return rejectWithValue(error as string);
        } finally {
            dispatch(setLoading(false));
        }
    }
);
