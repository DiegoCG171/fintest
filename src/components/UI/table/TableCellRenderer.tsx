import { ReactNode } from "react";
import { CustomRenders, FieldError, TableRowData } from "../../../config/interfaces";
import { Box, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { insertWordBreaks } from "../../../config/utils/table";

export const TableCellRenderer = ({
  value,
  customRenderers,
  keyName,
  hasFields,
  rowId,
  isExpanded,
  onToggle,
}: {
  value: ReactNode | FieldError | TableRowData[];
  customRenderers: CustomRenders;
  keyName: string;
  hasFields: boolean;
  rowId: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}) => {
  const normalizedValue =
    typeof value === "string" ||
    typeof value === "number" ||
    value === null ||
    value === undefined
      ? value
      : typeof value === "bigint"
      ? Number(value)
      : String(value);

  const cellText = normalizedValue != null ? String(normalizedValue) : "";

  if (keyName === "fields" && hasFields) {
    return (
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => onToggle(rowId)} sx={{ p: 0 }}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        whiteSpace: "normal",
        overflowWrap: "break-word",
      }}
    >
      {customRenderers[keyName]?.(normalizedValue) ??
        (cellText.length > 25 ? insertWordBreaks(cellText) : cellText)}
    </Box>
  );
};