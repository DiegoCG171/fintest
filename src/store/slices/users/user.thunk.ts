import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserInterface } from "../../../config/interfaces";
import { createUser } from "../../../services";

export const createUserThunk = createAsyncThunk<
    void,
    createUserInterface,
    { rejectValue: string }
>(
    'users/create',
    async (user: createUserInterface, { rejectWithValue }) => {
        try {
            await createUser(user)
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
)