import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateRule } from "../../../services/catalogs/rules.service";
import { RootState } from "../../store";
import { deepClean } from "../../../config/utils/deepClean";
import { RuleState } from "./extractionRulesSlice";

export const updateExtractionRulesThunk = createAsyncThunk<
  { id: string; data: RuleState },
  string,
  { state: RootState; rejectValue: string }
>(
  "extractionsRules/update",
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const data = state.extractionRules.updateExtractionRule;

    try {
      await updateRule(
        id,
        deepClean(data, ["_id", "typeData", "__v", "createdAt", "updatedAt", "deleteAt", "uuid","field"])
      );
      return { id, data: data };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
