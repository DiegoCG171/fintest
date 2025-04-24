import { createAsyncThunk } from "@reduxjs/toolkit"
import { FieldRules } from "../../../config/interfaces"
import { getRules } from "../../../services"

export const getRulesThunk = createAsyncThunk<
    FieldRules[], 
    void,
    { rejectValue: string }
>(
    'rules/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const rules = await getRules()
            return rules[0].fields
        } catch (error:unknown) {
            return rejectWithValue(error as string)
        }
    }
)