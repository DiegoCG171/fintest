import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCategoryInterface, RootCategoryesInterface, UpdateCategoriePayload } from "../../../config/interfaces";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../../services";

export const getCategoriesByMethodThunk = createAsyncThunk<
    RootCategoryesInterface,
    string,
    { rejectValue: string }
>(
    'categories/getAll',
    async (method, { rejectWithValue }) => {
        try {
            const categories = await getCategories(method);
            return categories
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const deleteCategorieThunk = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>(
    'categories/delete',
    async (id, { rejectWithValue }) => {
        try {
            await deleteCategory(id);
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const createCategorieThunk = createAsyncThunk<
    void,
    createCategoryInterface,
    { rejectValue: string }
>(
    'categories/create',
    async (body, { rejectWithValue }) => {
        try {
            await createCategory(body);
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const updateCategorieThunk = createAsyncThunk<
    void,
    UpdateCategoriePayload,
    { rejectValue: string }
>(
    'categories/update',
    async ({ data, id }, { rejectWithValue }) => {
        try {
            await updateCategory(data, id);
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);
