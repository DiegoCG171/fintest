import { createSlice } from "@reduxjs/toolkit";
import { getDependsOnTransactionFunctionsThunk, getGenetationFunctionsThunk, getSelectionFunctionsThunk, getValidationFunctionsThunk } from "./functionsSelect.thunk";
import { AsyncStatus } from "../../../config/interfaces";

interface InitialState {
    generation: FunctionSelect[];
    generationState: AsyncStatus;
    validation: FunctionSelect[];
    validationState: AsyncStatus;
    selection: FunctionSelect[];
    selectionState: AsyncStatus;
    dependsOn: FunctionSelect[];
    dependsOnState: AsyncStatus;
}

interface FunctionSelect {
    label: string;
    value: string;
}

const initialState: InitialState = {
    generation: [],
    generationState: 'idle',
    validation: [],
    validationState: 'idle',
    selection: [],
    selectionState: 'idle',
    dependsOn: [],
    dependsOnState: 'idle',
}

export const functionsSelectSlice = createSlice({
    name: 'functionsSelect',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            // Generation
            .addCase(getGenetationFunctionsThunk.pending, (state) => {
                state.generationState = 'loading';
            })
            .addCase(getGenetationFunctionsThunk.fulfilled, (state, action) => {
                state.generation = action.payload;
                state.generationState = 'success';
            })
            .addCase(getGenetationFunctionsThunk.rejected, (state) => {
                state.generationState = 'error';
            })

            // Validation
            .addCase(getValidationFunctionsThunk.pending, (state) => {
                state.validationState = 'loading';
            })
            .addCase(getValidationFunctionsThunk.fulfilled, (state, action) => {
                state.validation = action.payload;
                state.validationState = 'success';
            })
            .addCase(getValidationFunctionsThunk.rejected, (state) => {
                state.validationState = 'error';
            })

            // Selection
            .addCase(getSelectionFunctionsThunk.pending, (state) => {
                state.selectionState = 'loading';
            })
            .addCase(getSelectionFunctionsThunk.fulfilled, (state, action) => {
                state.selection = action.payload;
                state.selectionState = 'success';
            })
            .addCase(getSelectionFunctionsThunk.rejected, (state) => {
                state.selectionState = 'error';
            })

            // DependsOn
            .addCase(getDependsOnTransactionFunctionsThunk.pending, (state) => {
                state.selectionState = 'loading';
            })
            .addCase(getDependsOnTransactionFunctionsThunk.fulfilled, (state, action) => {
                state.dependsOn = action.payload;
                state.dependsOnState = 'success';
            })
            .addCase(getDependsOnTransactionFunctionsThunk.rejected, (state) => {
                state.dependsOnState = 'error';
            });
    }

})