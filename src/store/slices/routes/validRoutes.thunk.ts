import { createAsyncThunk } from "@reduxjs/toolkit";

export const setCollectionsRoutesThunk = createAsyncThunk<
    string[],
    string[],
    { rejectValue: string }
>(
    'routes/collections',
    async (fromCollections: string[], { rejectWithValue }) => {
        try {
            localStorage.setItem('fromCollections', JSON.stringify(fromCollections))
            return fromCollections
        } catch (error: unknown) {
            return rejectWithValue(error as string);
        }
    }
);

export const setCategoriesRoutesThunk = createAsyncThunk<
    string[],
    string[],
    { rejectValue: string }
>(
    'routes/categories',
    async (fromCategories: string[], { rejectWithValue }) => {
        try {
            localStorage.setItem('fromCategories', JSON.stringify(fromCategories))
            return fromCategories
        } catch (error: unknown) {
            return rejectWithValue(error as string);
        }
    }
);

export const addCollectionsRouteThunk = createAsyncThunk<
    string[], 
    string,
    { rejectValue: string }
>(
    'routes/addCollectionsRoute',
    async (newRoute, { rejectWithValue }) => {
        try {
            const existingRoutes = JSON.parse(localStorage.getItem('fromCollections') || '[]') as string[];
            const updatedRoutes = existingRoutes.includes(newRoute)
                ? existingRoutes
                : [...existingRoutes, newRoute];

            localStorage.setItem('fromCollections', JSON.stringify(updatedRoutes));

            return updatedRoutes;
        } catch (error: unknown) {
            return rejectWithValue(error as string);
        }
    }
);


export const removeCategoriesRoutesThunk = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    'routes/removeCategoriesRoutes',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('fromCategories');
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const removeCollectionsRoutesThunk = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    'routes/removeCollectionsRoutes',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('fromCollections');
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);