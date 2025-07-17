import { createSlice } from "@reduxjs/toolkit";
import { getGenetationFunctionsThunk, getSelectionFunctionsThunk, getValidationFunctionsThunk } from "./functionsSelect.thunk";

interface InitialState {
    generation: FunctionSelect[];
    validation: FunctionSelect[];
    selection: FunctionSelect[];
}

interface FunctionSelect {
    label: string;
    value: string;
}

const initialState: InitialState = {
    generation: [],
    validation: [],
    selection: []
}

export const functionsSelectSlice = createSlice({
    name: 'functionsSelect',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getGenetationFunctionsThunk.fulfilled, (state, action) => {
            state.generation = action.payload
        })
        build.addCase(getValidationFunctionsThunk.fulfilled, (state, action) => {
            state.validation = action.payload
        })
        build.addCase(getSelectionFunctionsThunk.fulfilled, (state, action) => {
            state.selection = action.payload
        })
    }
})