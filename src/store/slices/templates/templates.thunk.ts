import { createAsyncThunk } from "@reduxjs/toolkit"
import { getTemplate } from "../../../services"
import { TemplateContextType as TemplateResponse } from "../../../config/interfaces"

export const getTemplatesThunk = createAsyncThunk<
    TemplateResponse, 
    void,
    { rejectValue: string }
>(
    'templates/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const template = await getTemplate();
            return template
        } catch (error: unknown) {
            return rejectWithValue(error as string)
        }
    }
)