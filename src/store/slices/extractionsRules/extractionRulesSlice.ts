import { createSlice} from '@reduxjs/toolkit';

export interface BreakingRule {
  id: string;
  displayName: string;
  length: number;
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
  regex: string;
  regexType?: 'alfanumerico' | 'alfanumerico_especial' | 'numerico' | 'otra';
  isBreakeable?: boolean;
  breakingRules?: BreakingRule[];
  isLengthVariable?: boolean;
  positionsLength?: PositionsLength;
}

export interface RuleState {
  version: number;
  type: string;
  fields: Field[];
}

const initialState: RuleState = {
  version: 2,
  type: 'pos',
  fields: []
};

export const extractionRulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
  }
});

