import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTestCases } from "../../../services/catalogs/testCases.service";
import { testCaseInterface } from "../../../config/interfaces";

export const getTestCasesThunk = createAsyncThunk<
  testCaseInterface[], 
  void,
  { rejectValue: string }
>("testCase/getAll", async (_, { rejectWithValue }) => {
  try {
    const testCase = await getTestCases();
    return testCase;
  } catch (error: unknown) {
    return rejectWithValue(error as string);
  }
});
