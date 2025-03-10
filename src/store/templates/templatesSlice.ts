import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Template } from "../../interfaces/templates.interface";
import { onToggleModalConfig, onToggleModalUpdate } from "../ui/uiSlice";

export const startGetAllTemplates = createAsyncThunk(
    'templates/getAllTemplates',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await api.get("/template");
        return data;
      } catch (error) {
        console.error(error);
        return rejectWithValue(error);
      }
    }
  );

export const startCreateTemplate = createAsyncThunk(
    'templates/create-template',
    async (template: any, { rejectWithValue, dispatch }) => {
      try {
        const { data } = await api.post("/template", template);
        dispatch(onToggleModalConfig(false));
        return data;
      } catch (error) {
        console.error(error);
        return rejectWithValue(error);
      }
    }
  );

export const startUpdateTemplate = createAsyncThunk(
    'templates/update-template',
    async ({id, template}: {id: string, template: any}, { rejectWithValue, dispatch }) => {
      console.log(template)
      try {
        const { data } = await api.patch(`/template/${id}`, template);   
        dispatch(onToggleModalUpdate(false));
        return data;
      } catch (error) {
        console.error(error);
        return rejectWithValue(error);
      }
    }
  );

interface InitialState {
    templates: Template[];
}

const initialState: InitialState = {
    templates: []
}

export const templateSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(startGetAllTemplates.fulfilled, (state, action) => {
            state.templates = action.payload
        })
        builder.addCase(startCreateTemplate.fulfilled, (state, action) => {
            state.templates.push(action.payload)
        })
        builder.addCase(startUpdateTemplate.fulfilled, (state, action) => {
          const index = state.templates.findIndex(template => template._id === action.payload._id);
          if (index !== -1) {
              state.templates[index] = action.payload;
          }
      });
    }
})