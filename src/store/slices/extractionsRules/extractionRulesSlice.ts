import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRuleByIdThunk } from "../rules/rules.thunk";
import { updateExtractionRulesThunk } from "./extractionRules.thunk";

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
  _id?: string;
  id?: string;
  idBitmap?: string;
  displayName: string;
  field?: string;
  typeData?: string;
  length?: number;
  operator?: string;
  regex?: string;
  isBreakeable?: boolean;
  isLengthVariable?: boolean;
  breakingRules?: RuleRow[];
  specification?: RuleRow[];
  positionsLength?: PositionsLength;
}

export interface RuleState {
  uuid: string
  version: number;
  type: string;
  fields: RuleRow[];
}

export interface ExtractionRulesState {
  updateExtractionRule: RuleState;
  updating: boolean;
}

export interface UpdateExtractionRulesPayload {
    id: string;
}


const initialState: ExtractionRulesState = {
  updateExtractionRule: {
    uuid: "",
    type: "",
    version: 0,
    fields: [],
  },
  updating: false
};

export const extractionRulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setVersionForm: (state, action: PayloadAction<number>) => {
      state.updateExtractionRule.version = action.payload;
    },
    setTypeForm: (state, action: PayloadAction<string>) => {
      state.updateExtractionRule.type = action.payload;
    },
    setFields: (state, action: PayloadAction<RuleRow[]>) => {
      state.updateExtractionRule.fields = action.payload;
    },

    updateRule: (
      state,
      action: PayloadAction<{ _id: string; updatedRow: RuleRow }>
    ) => {
      const { _id, updatedRow } = action.payload;

      function mutateRuleById(
        rules: RuleRow[],
        targetId: string,
        updatedRow: RuleRow
      ): RuleRow | undefined {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];

          if (rule._id === targetId) {
            rules[i] = updatedRow;
            return rules[i];
          }

          if (rule.breakingRules && rule.breakingRules.length > 0) {
            const updated = mutateRuleById(
              rule.breakingRules,
              targetId,
              updatedRow
            );
            if (updated) return updated;
          }
        }
        return undefined;
      }

      mutateRuleById(state.updateExtractionRule.fields, _id, updatedRow);
    },

    addSubRule: (
      state,
      action: PayloadAction<{ parentId: string; newRule: RuleRow }>
    ) => {
      function addSubRuleById(
        rules: RuleRow[],
        parentId: string,
        newRule: RuleRow
      ): RuleRow[] {
        return rules.map((rule) => {
          if (rule.id === parentId || rule._id === parentId) {
            const updatedBreakingRules = [
              ...(rule.breakingRules || []),
              newRule,
            ];
            return { ...rule, breakingRules: updatedBreakingRules };
          }

          if (rule.breakingRules && rule.breakingRules.length > 0) {
            return {
              ...rule,
              breakingRules: addSubRuleById(
                rule.breakingRules,
                parentId,
                newRule
              ),
            };
          }

          return rule;
        });
      }

      state.updateExtractionRule.fields = addSubRuleById(
        state.updateExtractionRule.fields,
        action.payload.parentId,
        action.payload.newRule
      );
    },
    addTopLevelRule: (state, action: PayloadAction<RuleRow>) => {
      state.updateExtractionRule.fields.push(action.payload);
    },

    removeRule: (state, action: PayloadAction<{ id: string }>) => {
      function removeRuleById(rules: RuleRow[], targetId: string): RuleRow[] {
        return rules
          .filter((rule) => rule.id !== targetId)
          .map((rule) => ({
            ...rule,
            breakingRules: rule.breakingRules
              ? removeRuleById(rule.breakingRules, targetId)
              : [],
          }));
      }

      state.updateExtractionRule.fields = removeRuleById(
        state.updateExtractionRule.fields,
        action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRuleByIdThunk.fulfilled, (state, action) => {
      state.updateExtractionRule = action.payload;
      state.updating = true;
    })
    .addCase(updateExtractionRulesThunk.fulfilled, (state) => {
      state.updateExtractionRule = initialState.updateExtractionRule;
      state.updating = false;
    })
  },
});

export const {
  addSubRule,
  removeRule,
  setFields,
  setTypeForm,
  setVersionForm,
  updateRule,
  addTopLevelRule,
} = extractionRulesSlice.actions;

export default extractionRulesSlice.reducer;
