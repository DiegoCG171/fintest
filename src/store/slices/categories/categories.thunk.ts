import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootCategoryesInterface } from "../../../config/interfaces";
import { getAllCategories } from "../../../services";

export const getAllCategoriesThunk = createAsyncThunk<
    RootCategoryesInterface,
    void,
    { rejectValue: string }
>(
    'categories/getAll',
    async ( _, {rejectWithValue} ) => {
        try {
            const categories = await getAllCategories();
            return categories
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
)