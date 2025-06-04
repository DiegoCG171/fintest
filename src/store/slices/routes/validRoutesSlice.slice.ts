import { createSlice } from "@reduxjs/toolkit";
import { RoutesState } from "../../../config/interfaces";

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
    }
});

export const { setCategoriesRoutes, setCollectionsRoutes } = validRoutesSlice .actions