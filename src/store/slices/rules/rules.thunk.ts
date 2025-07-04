import { createAsyncThunk } from "@reduxjs/toolkit"
import { Field } from "../../../config/interfaces"
import { getRules } from "../../../services"
import { setLoading } from "../UI/loader/loader.slice";

export const getRulesThunk = createAsyncThunk<
    Field[],
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