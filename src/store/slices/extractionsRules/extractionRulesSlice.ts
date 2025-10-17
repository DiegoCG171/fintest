import { createSlice } from "@reduxjs/toolkit";
import { getRuleByIdThunk } from "../rules/rules.thunk";

export interface BreakingRule {
  id?: string;
  displayName?: string;
  length?: number;
  idToken?: string;
  specification?: BreakingRule[];
}

export interface PositionsLength {
  initPos: number;
  finalPos: number;
}

export interface Field {
  idBitmap: string;
  displayName: string;
  length: number;
  operator: string;
  field?: string;
  regex: string;
  regexType?: "alphanumeric" | "alphanumeric_special" | "numeric" | "other";
  isBreakeable?: boolean;
  breakingRules?: BreakingRule[];
  isLengthVariable?: boolean;
  positionsLength?: PositionsLength;
}

export interface RuleRow {
  id?: string;
  idBitmap: string;
  displayName: string;
  field: string;
  typeData: string;
  length?: number;
  operator?: string;
  regex?: string;
  isBreakeable?: boolean;
  isLengthVariable?: boolean;
  breakingRules?: RuleRow[];
  positionsLength?: PositionsLength;
}

export interface RuleState {
  version: number;
  type: string;
  fields: RuleRow[];
}

export interface ExtractionRulesState {
  updateExtractionRule?: RuleState;
}

const initialState: ExtractionRulesState = {};

export const extractionRulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRuleByIdThunk.fulfilled, (state, action) => {
      state.updateExtractionRule = action.payload
    });
  },
});
