import { RuleRow } from "../../store/slices/extractionsRules/extractionRulesSlice";
import {
  ExpressionType,
  FIELD_MARGIN_MULTIPLIER,
  FONT_SIZES,
  MARGIN_MULTIPLIER,
  REGEX_PATTERNS,
} from "../constants/extactionRulesPage";

export const getStyleByLevel = (level: number) => ({
  fontSize: FONT_SIZES[Math.min(level - 1, FONT_SIZES.length - 1)],
  marginLeft: level * MARGIN_MULTIPLIER,
  fieldMarginLeft: level * FIELD_MARGIN_MULTIPLIER,
});

export const detectExpressionType = (
  regex: string | undefined
): ExpressionType => {
  if (!regex) return "other";
  if (regex === REGEX_PATTERNS.alphanumeric) return "alphanumeric";
  if (regex === REGEX_PATTERNS.alphanumeric_special)
    return "alphanumeric_special";
  if (regex === REGEX_PATTERNS.numeric) return "numeric";
  return "other";
};

export const getRegexFromExpression = (expression: string): string => {
  if (expression === "alphanumeric") return REGEX_PATTERNS.alphanumeric;
  if (expression === "alphanumeric_special")
    return REGEX_PATTERNS.alphanumeric_special;
  if (expression === "numeric") return REGEX_PATTERNS.numeric;
  return "";
};

export const getChildKey = (
  level: number
): "specification" | "breakingRules" => {
  return level === 2 ? "specification" : "breakingRules";
};

export const getRuleId = (row: RuleRow): string => {
  return row._id || row.id || "";
};

export const getDisplayId = (row: RuleRow): string => {
  return row.idBitmap || row.id || "";
};
