import { createAsyncThunk } from "@reduxjs/toolkit"
import { Field, RootRules } from "../../../config/interfaces"
import { getRuleById, getRules } from "../../../services"

export const getRulesThunk = createAsyncThunk<
    RootRules,
    number | undefined,
    { rejectValue: string }
>(
    "rules/fetch",
    async (page = 1, { rejectWithValue }) => {
        try {
            const rules = await getRules({ page, limit: 10, order: "ASC" });
            return rules;
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
);

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