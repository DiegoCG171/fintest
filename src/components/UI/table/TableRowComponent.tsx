import { Fragment, ReactNode } from "react";
import { CustomRenders, FieldError, TableRowData } from "../../../config/interfaces";
import { Box, Collapse, TableCell, TableRow } from "@mui/material";
import { getBackgroundColorForLevel } from "../../../config/utils/getBackgroundColorForLevel";
import { NestedTable } from "./NestedTable";
import { TableCellRenderer } from "./TableCellRenderer";

export const TableRowComponent = ({
  row,
  rowIndex,
  keys,
  customRenderers,
  type,
  onSetActiveMessage,
  onToggle,
  openRows,
  isActive,
}: {
  row: TableRowData;
  rowIndex: number;
  keys: string[];
  customRenderers: CustomRenders;
  type?: string;
  isActive: boolean;
  onSetActiveMessage: (
    id: number | string | undefined,
    message: TableRowData[] | ReactNode | FieldError
  ) => void;
  onToggle: (id: string) => void;
  openRows: Record<string, boolean>;
}) => {
  const rowId = `main-row-${rowIndex}`;
  const fields = row.fields || [];
  const hasFields = Array.isArray(fields) && fields.length > 0;
  const isExpanded = openRows[rowId] || false;
  return (
    <Fragment key={rowIndex}>
      <TableRow
        hover={type === "events"}
        onClick={() => onSetActiveMessage(row["ID"], row.fields)}
        sx={{
          cursor: type === "events" ? "pointer" : "default",
          background:
            isActive  ? "#EEF7FF" : "transparent",
        }}
      >
        {keys.map((key) => (
          <TableCell
            key={`${rowId}-${key}`}
            sx={{
              padding: "8px",
              paddingLeft: 4,
              verticalAlign: "center",
              width: key === "fields" ? "40px" : "20%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: (hasFields && type !== 'events') ? 600 : 400  
            }}
          >
            <TableCellRenderer
              value={row[key]}
              customRenderers={customRenderers}
              keyName={key}
              hasFields={hasFields}
              rowId={rowId}
              isExpanded={isExpanded}
              onToggle={onToggle}
            />
          </TableCell>
        ))}
      </TableRow>

      {hasFields && (
        <TableRow>
          <TableCell
            colSpan={keys.length}
            sx={{
              py: 0,
              pl: 0,
              pr: 0,
              background: getBackgroundColorForLevel(1),
            }}
          >
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                <NestedTable
                  data={fields}
                  customRenderers={customRenderers}
                  level={1}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};