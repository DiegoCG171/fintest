import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createTemplateThunk, getTemplateByIdThunk, getTemplatesThunk, updateTemplateThunk } from './templates.thunk';
import { TemplateContextType, TemplateState } from '../../../config/interfaces';

const initialState: TemplateState = {
    templates: [] as TemplateContextType[],
    getStatus: 'idle',
    getError: null,
    updateStatus: 'idle',
    updateError: null,
    createError: null,
    createStatus: 'idle',
    getStatusById: 'idle',
    getErrorById: null,
    templateById: null as TemplateContextType | null,
};

export const templateSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        clearTemplates: (state) => {
            state.templates = [];
            state.getStatus = 'idle';
        },
        clearTemplateError: (state) => {
            state.getError = null
        },
        clearUpdateError: (state) => {
            state.updateError = null;
            state.updateStatus = 'idle';
        },
        clearCreateError: (state) => {
            state.createError = null;
            state.createStatus = 'idle';
        },
        clearByIdTemplate: (state) => {
            state.templateById = null
            state.getStatusById = 'idle'
        },
        clearByIdTemplateError: (state) => {
            state.getErrorById = null;
            state.getStatusById = 'idle'
        },
        addOrUpdateTemplate: (state, action: PayloadAction<TemplateContextType>) => {
            const newTemplate = action.payload;
            const index = state.templates.findIndex(t => t.uuid === newTemplate.uuid);

            if (index !== -1) {
                state.templates[index] = newTemplate;
            } else {
                state.templates.push(newTemplate);
            }
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
            .addCase(createTemplateThunk.pending, (state) => {
                state.createError = null;
                state.createStatus = 'loading';
            })
            .addCase(createTemplateThunk.fulfilled, (state, action) => {
                state.createStatus = 'success';
                state.templates.push(action.payload)
            })
            .addCase(createTemplateThunk.rejected, (state, action) => {
                state.createError = action.payload ?? "Error desconocido";
                state.createStatus = 'error';
            })
            .addCase(getTemplateByIdThunk.pending, (state) => {
                state.getErrorById = null;
                state.getStatusById = 'loading';
            })
            .addCase(getTemplateByIdThunk.fulfilled, (state, action) => {
                state.getStatusById = 'success';
                state.templateById = action.payload
            })
            .addCase(getTemplateByIdThunk.rejected, (state, action) => {
                state.getErrorById = action.payload ?? "Error desconocido";
                state.getStatusById = 'error';
            })
    }
})

export const { clearTemplates, clearTemplateError, clearUpdateError, clearCreateError, clearByIdTemplate, clearByIdTemplateError, addOrUpdateTemplate } = templateSlice.actions