import { createAsyncThunk } from "@reduxjs/toolkit";
import { PatchGenerationTemplate, testCaseInterface } from "../../../config/interfaces";
import { getTestCaseById, getTestCases, updateTestCase } from "../../../services";

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

export const updateTestCaseThunk = createAsyncThunk<
  testCaseInterface,
  { id: string; payload: PatchGenerationTemplate },
  { rejectValue: string }
>("test-case/update", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const testCase = await updateTestCase(id, payload);
    return testCase;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const getTestCaseByIdThunk = createAsyncThunk(
  "test-case/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const testCase = await getTestCaseById(id);

      return testCase;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
