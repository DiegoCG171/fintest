import { createSlice } from '@reduxjs/toolkit'
import { getTemplatesThunk, updateTemplateThunk } from './templates.thunk';
import { TemplateState } from '../../../config/interfaces';

const initialState: TemplateState = {
    templates: [],
    getStatus: 'idle',
    getError: null,
    updateStatus: 'idle',
    updateError: null,
};


export const templateSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        clearTemplates: (state) => {
            state.templates = [];
            state.getStatus = 'idle';
        },
        clearTemplateError(state) {
            state.getError = null
        },
        clearUpdateError(state) {
            state.updateError = null;
            state.updateStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTemplatesThunk.pending, (state) => {
                state.getError = null;
                state.getStatus = 'loading';
            })
            .addCase(getTemplatesThunk.fulfilled, (state, action) => {
                state.templates = action.payload
                state.getStatus = 'success';
            })
            .addCase(getTemplatesThunk.rejected, (state, action) => {
                state.getError = action.payload ?? "Error desconocido";
                state.getStatus = 'error';
            })
            .addCase(updateTemplateThunk.pending, (state) => {
                state.updateError = null;
                state.updateStatus = 'loading';
            })
            .addCase(updateTemplateThunk.fulfilled, (state) => {
                state.updateStatus = 'success';
            })
            .addCase(updateTemplateThunk.rejected, (state, action) => {
                state.updateError = action.payload ?? "Error desconocido";
                state.updateStatus = 'error';
            })
    }
})

export const { clearTemplates, clearTemplateError, clearUpdateError } = templateSlice.actions