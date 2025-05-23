import { createSlice } from '@reduxjs/toolkit'
import { RulesState } from '../../../config/interfaces'
import { getRulesThunk } from './rules.thunk'

const initialState: RulesState = {
    rules: [],
    status: 'idle',
    error: null,
}

export const rulesSlice = createSlice({
    name: 'rules',
    initialState,
    reducers: {
        clearRules: (state) => {
            state.rules = [];
            state.status = 'idle';
        },
        clearRulesError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(getRulesThunk.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getRulesThunk.fulfilled, (state, action) => {
                state.rules = action.payload
                state.status = 'success';
            })
            .addCase(getRulesThunk.rejected, (state, action) => {
                state.error = action.payload ?? "Error desconocido";
                state.status = 'error';
            })
    }
})

export const { clearRules, clearRulesError } = rulesSlice.actions