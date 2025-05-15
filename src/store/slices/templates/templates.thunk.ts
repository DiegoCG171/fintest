import { createAsyncThunk } from "@reduxjs/toolkit"
import { createTemplate, getTemplate, updateTemplate } from "../../../services"
import { CreateTemplate, PatchGenerationTemplate, TemplateContextType, TemplateRoot } from "../../../config/interfaces"
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

export const updateTemplateThunk = createAsyncThunk<
    void, // lo que retorna
    { id: string; payload: PatchGenerationTemplate }, // lo que recibe
    { rejectValue: string }
>(
    'templates/updateById',
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));
            await updateTemplate(id, payload);
        } catch (error: unknown) {
            return rejectWithValue(error as string)
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const createTemplateThunk = createAsyncThunk<
    TemplateContextType,
    { template: CreateTemplate },
    { rejectValue: string }
>(
    'templates/create',
    async ({ template }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));
            const response = await createTemplate(template);
            return response;
        } catch (error) {
            return rejectWithValue(error as string)
        } finally {
            dispatch(setLoading(false));
        }
    }
)