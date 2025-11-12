import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { deepClean } from "../../../config/utils/deepClean";
import { Field, GetFilters } from "../../../config/interfaces";
import { Rule } from "../../../config/interfaces/security.interface";
import { RuleState } from "../extractionsRules/extractionRulesSlice";
import { createExtractionRule, deleteExtractionRule, getExtractionAllRules, getExtractionRuleById, getExtractionRules, updateExtractionRule } from "../../../services/catalogs/extractionRules.service";

export const getExtractionRulesThunk = createAsyncThunk<
  Field[],
  void,
  { rejectValue: string }
>("rules/getAll", async (_, { rejectWithValue }) => {
  try {
    const rules = await getExtractionRules();
    console.log(rules);
    return rules[0].fields;
  } catch (error: unknown) {
    const message =
      typeof error === "string"
        ? error
        : error instanceof Error
        ? error.message
        : "Error desconocido";
    return rejectWithValue(message);
  }
});

export const getAllExtractionRulesThunk = createAsyncThunk(
  "rules/getAllRules",
  async (filters: GetFilters | undefined, { rejectWithValue }) => {
    try {
      const stored = localStorage.getItem("ruleFilters");
      const appliedFilters: GetFilters =
        filters ?? (stored ? JSON.parse(stored) : { page: 1, limit: 10 });

      localStorage.setItem("ruleFilters", JSON.stringify(appliedFilters));
      const rulesDB = await getExtractionAllRules(appliedFilters);
      const newRules = {
        ...rulesDB,
        data: rulesDB.data.map((rule: Rule) => ({
            ...rule,
            id: rule.uuid
        }))
      }
      return { ...newRules,  searchTerm: appliedFilters.search };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getExtractionRuleByIdThunk = createAsyncThunk<
  RuleState,
  { uuid: string },
  { rejectValue: string }
>("rules/getById", async ({ uuid }, { rejectWithValue }) => {
  try {
    const rules = await getExtractionRuleById(uuid);
    return rules;
  } catch (error: unknown) {
    const message =
      typeof error === "string"
        ? error
        : error instanceof Error
        ? error.message
        : "Error desconocido";
    return rejectWithValue(message);
  }
});

export const deleteExtractionRuleThunk = createAsyncThunk(
  "rules/removeRule",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteExtractionRule(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


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
      await updateExtractionRule(
        id,
        deepClean(data, ["_id", "typeData", "__v", "createdAt", "updatedAt", "deleteAt", "uuid","field"])
      );
      return { id, data: data };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);


export const createExtractionRuleThunk = createAsyncThunk<
  RuleState,
  void,
  { state: RootState; rejectValue: string }
>(
  "extractionRules/create",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const data = state.extractionRules.updateExtractionRule;

    try {
      const cleanedData = deepClean(data, [
        "_id",
        "typeData",
        "__v",
        "createdAt",
        "updatedAt",
        "deleteAt",
        "uuid",
        "field",
      ]);

      const newRule = await createExtractionRule(cleanedData);
      return newRule;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
