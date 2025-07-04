import { createSlice } from "@reduxjs/toolkit";
import { PassResetState } from "../../../config/interfaces";

const initialState: PassResetState = {
    status: 'idle',
    error: null,
}

export const resetPsswSlice = createSlice({
    name: 'resetPssw',
    initialState,
    reducers: {
        clearResetStatus: (state) => {
            state.status = 'idle';
        },
        clearResetError: (state) => {
            state.error = null;
        },
    }
})