export const MODAL_STYLE = {
  position: "relative",
  width: "100%",
  margin: "0 auto",
  p: 4,
  overflowY: "auto",
} as const;

export const EXPRESSION_MAP = {
  alphanumeric: "Alfanumérico",
  alphanumeric_special: "Alfanumérico con Caracteres Especiales",
  numeric: "Numérico",
  other: "Otra",
} as const;

export const REGEX_PATTERNS = {
  alphanumeric: "^[a-zA-Z0-9]+$",
  alphanumeric_special: "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
  numeric: "^[0-9]+$",
} as const;

export const FONT_SIZES = ["0.8rem", "0.75rem", "0.7rem", "0.65rem"] as const;

export const MAX_LEVEL = 3;
export const MARGIN_MULTIPLIER = 6;
export const FIELD_MARGIN_MULTIPLIER = 3;

export type ExpressionType = keyof typeof EXPRESSION_MAP;