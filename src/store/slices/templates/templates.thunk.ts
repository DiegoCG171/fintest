import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTemplate,
  getTemplate,
  getTemplateById,
  updateTemplate,
} from "../../../services";
import {
  CreateTemplate,
  PatchGenerationTemplate,
  TemplateContextType,
  TemplateRoot,
} from "../../../config/interfaces";

export const getTemplatesThunk = createAsyncThunk<
  TemplateRoot,
  void,
  { rejectValue: string }
>("templates/getAll", async (_, { rejectWithValue }) => {
  try {
    const template = await getTemplate();
    return template;
  } catch (error: unknown) {
    return rejectWithValue(error as string);
  }
});

export const updateTemplateThunk = createAsyncThunk<
  void,
  { id: string; payload: PatchGenerationTemplate },
  { rejectValue: string }
>("templates/update", async ({ id, payload }, { rejectWithValue }) => {
  try {
    await updateTemplate(id, payload);
    return;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const createTemplateThunk = createAsyncThunk<
  TemplateContextType,
  { template: CreateTemplate },
  { rejectValue: string }
>("templates/create", async ({ template }, { rejectWithValue }) => {
  try {
    const response = await createTemplate(template);
    return response;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const getTemplateByIdThunk = createAsyncThunk<
    TemplateContextType,
    string,
    { rejectValue: string }
>(
    'templates/getById',
    async (id, { rejectWithValue }) => {
        try {
            const template = await getTemplateById(id)
            return template;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);
