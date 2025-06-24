import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from "../../../config/interfaces";
import { loginThunk } from './login.thunk';
import { renewTokenThunk } from './renewTokenThunk.thunk';
const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            state.isAuthenticated = false; 
        },
        clearAuthError(state) {
            state.error = null
        }
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
    },
});

export const { logout, clearAuthError } = authSlice.actions; 
