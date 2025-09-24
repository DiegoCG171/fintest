import { createAsyncThunk } from "@reduxjs/toolkit"
import { Field } from "../../../config/interfaces"
import { getRuleById, getRules } from "../../../services"

export const getRulesThunk = createAsyncThunk<
    Field[],
    void,
    { rejectValue: string }
>(
    'rules/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const rules = await getRules()
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

export const getRuleByIdThunk = createAsyncThunk<
    Field[],
    { uuid: string },
    { rejectValue: string }
>(
    'rules/getById',
    async ({ uuid }, { rejectWithValue }) => {
        try {
            const rules = await getRuleById(uuid)
            return rules.fields
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