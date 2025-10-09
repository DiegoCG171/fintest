import { createAsyncThunk } from "@reduxjs/toolkit";
import { Field, GetFilters } from "../../../config/interfaces";
import { getAllRules, getRuleById, getRules } from "../../../services";
import { deleteRule } from "../../../services/catalogs/rules.service";
import { Rule } from "../../../config/interfaces/security.interface";

export const getRulesThunk = createAsyncThunk<
  Field[],
  void,
  { rejectValue: string }
>("rules/getAll", async (_, { rejectWithValue }) => {
  try {
    const rules = await getRules();
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

export const getAllRulesThunk = createAsyncThunk(
  "rules/getAllRules",
  async (filters: GetFilters | undefined, { rejectWithValue }) => {
    try {
      const stored = localStorage.getItem("ruleFilters");
      const appliedFilters: GetFilters =
        filters ?? (stored ? JSON.parse(stored) : { page: 1, limit: 10 });

      localStorage.setItem("ruleFilters", JSON.stringify(appliedFilters));
      const rulesDB = await getAllRules(appliedFilters);
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

export const getRuleByIdThunk = createAsyncThunk<
  Field[],
  { uuid: string },
  { rejectValue: string }
>("rules/getById", async ({ uuid }, { rejectWithValue }) => {
  try {
    const rules = await getRuleById(uuid);
    return rules.fields;
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

export const deleteRuleThunk = createAsyncThunk(
  "rules/removeRule",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteRule(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
