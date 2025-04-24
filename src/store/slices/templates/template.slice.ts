import { createSlice } from '@reduxjs/toolkit'
import { getTemplatesThunk } from './templates.thunk';
import { TemplateState } from '../../../config/interfaces';

const initialState: TemplateState = {
    templates: [],
    status: 'idle',
    error: null,
}

export const templateSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        clearTemplates: (state) => {
            state.templates = [];
            state.status = 'idle';
        },
        clearTemplateError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTemplatesThunk.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getTemplatesThunk.fulfilled, (state, action) => {
                state.templates = action.payload
                state.status = 'success';
            })
            .addCase(getTemplatesThunk.rejected, (state, action) => {
                state.error = action.payload ?? "Error desconocido";
                state.status = 'error';
            })
    }
})

export const { clearTemplates, clearTemplateError } = templateSlice.actions