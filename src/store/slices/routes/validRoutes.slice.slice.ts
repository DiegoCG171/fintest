import { createSlice } from "@reduxjs/toolkit";
import { RoutesState } from "../../../config/interfaces";
import { removeCategoriesRoutesThunk, removeCollectionsRoutesThunk, setCategoriesRoutesThunk, setCollectionsRoutesThunk } from "./validRoutes.thunk";

const initialState: RoutesState = {
    fromCollections: [],
    fromCategories: [],
};

export const validRoutesSlice  = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setCollectionsRoutes(state, action) {
            state.fromCollections = action.payload;
        },
        setCategoriesRoutes(state, action) {
            state.fromCategories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(setCollectionsRoutesThunk.fulfilled, (state, action) => {
            state.fromCollections = action.payload
        })
        .addCase(setCategoriesRoutesThunk.fulfilled, (state, action) => {
            state.fromCategories = action.payload
        })
        .addCase(removeCategoriesRoutesThunk.fulfilled, (state) => {
            state.fromCollections = []
        })
        .addCase(removeCollectionsRoutesThunk.fulfilled, (state) => {
            state.fromCategories = []
        })
    }
});

export const { setCategoriesRoutes, setCollectionsRoutes } = validRoutesSlice .actions