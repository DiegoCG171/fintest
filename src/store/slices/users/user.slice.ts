import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../config/interfaces";
import { createUserThunk } from "./user.thunk";

const initialState: UserState = {
    status: 'idle',
    error: null
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(createUserThunk.pending, (state) => {
                state.error = null;
                state.status = 'loading'
            })
            .addCase(createUserThunk.fulfilled, (state) => {
                state.status = 'success'
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.error = action.payload ?? "Error desconocido";
                state.status = 'error'
            })
    }
})