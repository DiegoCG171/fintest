import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStatus, testCaseInterface } from "../../../config/interfaces";
import { getTestCasesThunk, updateTestCaseThunk } from "./testCases.thunk";
import { createTestCaseThunk } from "../collections/collections.thunk";

interface InitialStateTestCases {
  testCases: testCaseInterface[];
  getStatus: AsyncStatus;
  getError: null | string;
  testCase: testCaseInterface | null
}

const initialState: InitialStateTestCases = {
  testCases: [],
  getStatus: "idle",
  getError: null,
  testCase: null
};

export const testCasesSlice = createSlice({
  name: "testCases",
  initialState,
  reducers: {
    addOrUpdateTestCases: (state, action: PayloadAction<testCaseInterface>) => {
            const newTemplate = action.payload;
            const index = state.testCases.findIndex(t => t.uuid === newTemplate.uuid);

            if (index !== -1) {
                state.testCases[index] = newTemplate;
            } else {
                state.testCases.push(newTemplate);
            }
        }
  },
  extraReducers: (build) => {
    build
      .addCase(getTestCasesThunk.pending, (state) => {
        state.getError = null;
        state.getStatus = "loading";
      })
      .addCase(getTestCasesThunk.fulfilled, (state, action) => {
        state.testCases = action.payload;
        state.getStatus = "success";
      })
      .addCase(getTestCasesThunk.rejected, (state, action) => {
        state.getError = action.payload ?? "Error desconocido";
        state.getStatus = "error";
      })
      .addCase(updateTestCaseThunk.pending, (state) => {
        state.getError = null;
        state.getStatus = "loading";
      })
      .addCase(updateTestCaseThunk.fulfilled, (state) => {
        state.getStatus = "success";
      })
      .addCase(updateTestCaseThunk.rejected, (state, action) => {
        state.getError = typeof action.payload === 'string' ? action.payload : 'Error desconocido';
        state.getStatus = "error";
      })
      .addCase(createTestCaseThunk.fulfilled, (state, action) => {
        state.getStatus = "success";
        state.testCases.push(action.payload.testCase)
      })
  },
});
