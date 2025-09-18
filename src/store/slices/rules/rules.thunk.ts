import { createAsyncThunk } from "@reduxjs/toolkit"
import { Field } from "../../../config/interfaces"
import { getRules } from "../../../services"

export const getRulesThunk = createAsyncThunk<
    Field[],
    void,
    { rejectValue: string }
>(
    'rules/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const rules = await getRules()
            console.log(rules)
            return rules[0].fields
        } catch (error: unknown) {
            const message =
                typeof error === "string"
                    ? error
                    : error instanceof Error
                        ? error.message
                        : "Error desconocido";
            return rejectWithValue(message);
        }
    }
)