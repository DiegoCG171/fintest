import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootRecoveryPssw } from "../../../config/interfaces";
import { recoveryPssw } from "../../../services";

export const recoveryPsswThunk = createAsyncThunk<
    RootRecoveryPssw,
    string,
    { rejectValue: string }
>(
    'recoveryPssw/postEmail',
    async (email, {rejectWithValue}) => {
        try {
            const user = await recoveryPssw(email);
            return user
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
)