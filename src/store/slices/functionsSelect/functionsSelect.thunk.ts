import { createAsyncThunk } from "@reduxjs/toolkit";
import { geSelectiontFunctions, getDependsOnFunctions, getGenetationFunctions, getValidationFunctions } from "../../../services/catalogs/functionSelect.service";

export const getGenetationFunctionsThunk = createAsyncThunk(
  "functionsSelect/getAllGeneration",
  async (_, { rejectWithValue }) => {
    try {
      const options = await getGenetationFunctions();
      return options;
    } catch (error: unknown) {
      return rejectWithValue(error as string);
    }
  }
);

export const getValidationFunctionsThunk = createAsyncThunk(
  "functionsSelect/getAllValidation",
  async (_, { rejectWithValue }) => {
    try {
      const options = await getValidationFunctions();
      return options;
    } catch (error: unknown) {
      return rejectWithValue(error as string);
    }
  }
);

export const getSelectionFunctionsThunk = createAsyncThunk(
  "functionsSelect/getAllSelection",
  async (_, { rejectWithValue }) => {
    try {
      const options = await geSelectiontFunctions();
      return options;
    } catch (error: unknown) {
      return rejectWithValue(error as string);
    }
  }
);
export const getDependsOnTransactionFunctionsThunk = createAsyncThunk(
  "functionsSelect/DependsOnTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const options = await getDependsOnFunctions();
      return options;
    } catch (error: unknown) {
      return rejectWithValue(error as string);
    }
  }
);