import { createAsyncThunk } from "@reduxjs/toolkit"
import { getTemplate } from "../../../services"
import { TemplateRoot } from "../../../config/interfaces"
import { setLoading } from "../UI/loader/loader.slice";

export const getTemplatesThunk = createAsyncThunk<
    TemplateRoot, 
    void,
    { rejectValue: string }
>(
    'templates/getAll',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));
            const template = await getTemplate();
            return template
        } catch (error: unknown) {
            return rejectWithValue(error as string)
        } finally {
            dispatch(setLoading(false));
        }
    }
)