import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../config/interfaces";
import { createUserThunk } from "./user.thunk";
import { getConfigUserThunk, updateConfigUserThunk } from "./userConfiguration.thunk";

const initialState: UserState = {
    status: 'idle',
    error: null,
    configuration: {
        portNumber: 0,
        targetHost: "",
        targetPort: 0
    }
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
            .addCase(getConfigUserThunk.fulfilled, (state, action) => {
                state.configuration = action.payload;
            })
            .addCase(updateConfigUserThunk.fulfilled, (state, action) => {
                state.configuration = action.payload;
            })
    }
})