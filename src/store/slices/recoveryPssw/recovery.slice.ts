import { createSlice } from "@reduxjs/toolkit";
import { PassRecoveryState } from "../../../config/interfaces";
import { recoveryPsswThunk } from "./recovery.thunk";

const initialState: PassRecoveryState = {
    user: null,
    status: 'idle',
    error: null,
}

export const recoveryPsswSlice = createSlice({
    name: 'recoveryPssw',
    initialState,
    reducers: {
        clearRecoveryState: (state) => {
            state.user = null;
            state.status = 'idle';
        },
        clearRecoveryError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(recoveryPsswThunk.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(recoveryPsswThunk.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'success';
            })
            .addCase(recoveryPsswThunk.rejected, (state, action) => {
                state.error = action.payload ?? "Error desconocido";
                state.status = 'error';
            })
            
    }
})

export const { clearRecoveryState, clearRecoveryError } = recoveryPsswSlice.actions