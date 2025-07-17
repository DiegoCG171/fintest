import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, RootCategoryesInterface } from "../../../config/interfaces";
import { getCategoriesByMethodThunk } from "./categories.thunk";

const initialState: CategoriesState = {
    categories:  null,
    status: 'idle',
    error: null,
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearCategoriesState(state) {
            state.categories = null;
            state.status = 'idle'
        },
        clearCategoriesErrorState(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesByMethodThunk.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getCategoriesByMethodThunk.fulfilled, (state, action: PayloadAction<RootCategoryesInterface>) => {
                state.categories = action.payload
                state.status = 'success';
            })
            .addCase(getCategoriesByMethodThunk.rejected, (state, action) => {
                state.error = action.payload ?? "Error desconocido";
                state.status = 'error';
            })
    }
})

export const { clearCategoriesState, clearCategoriesErrorState } = categoriesSlice.actions