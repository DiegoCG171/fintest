import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootCategoryesInterface } from "../../../config/interfaces";
import { getCategories } from "../../../services";

export const getCategoriesByMethodThunk = createAsyncThunk<
    RootCategoryesInterface,
    string,
    { rejectValue: string }
>(
    'categories/getAll',
    async ( method, {rejectWithValue} ) => {
        try {
            const categories = await getCategories(method);
            return categories
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
)