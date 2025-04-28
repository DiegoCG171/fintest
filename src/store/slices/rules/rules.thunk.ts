import { createAsyncThunk } from "@reduxjs/toolkit"
import { FieldRules } from "../../../config/interfaces"
import { getRules } from "../../../services"
import { setLoading } from "../loader/loader.slice";

export const getRulesThunk = createAsyncThunk<
    FieldRules[],
    void,
    { rejectValue: string }
>(
    'rules/getAll',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));
            const rules = await getRules()
            return rules[0].fields
        } catch (error: unknown) {
            return rejectWithValue(error as string)
        } finally {
            dispatch(setLoading(false));
        }
    }
)