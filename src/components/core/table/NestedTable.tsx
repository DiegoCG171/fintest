import { Fragment, useState } from "react";
import { TableRowData } from "../../../config/interfaces";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { insertWordBreaks } from "../../../config/utils/table";
import { getBackgroundColorForLevel } from "../../../config/utils/getBackgroundColorForLevel";

interface NestedTableProps {
  data: TableRowData[];
  customRenderers?: {
    [columnKey: string]: (
      value: string | number | null | undefined
    ) => React.ReactNode;
  };
  level?: number;
}

export const NestedTable = ({
  data,
  customRenderers = {},
  level = 0,
}: NestedTableProps) => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!data || data.length === 0) return null;

  const keys = Object.keys(data[0]);

  return (
    <Table
      size="small"
      aria-label={`nested-table-level-${level}`}
      sx={{ tableLayout: "fixed", width: "100%" }}
    >
      <TableBody>
        {data.map((row, rowIndex) => {
          const rowId = `row-${level}-${rowIndex}`;
          const fields = row.fields || [];
          const hasFields = Array.isArray(fields) && fields.length > 0;
          const isExpanded = openRows[rowId] || false;

          return (
            <Fragment key={rowId}>
              <TableRow>
                {keys.map((key) => {
                  const cellValue = row[key];
                  const normalizedValue =
                    typeof cellValue === "string" ||
                    typeof cellValue === "number" ||
                    cellValue === null ||
                    cellValue === undefined
                      ? cellValue
                      : typeof cellValue === "bigint"
                      ? Number(cellValue)
                      : String(cellValue);

                  const cellText =
                    normalizedValue != null ? String(normalizedValue) : "";

                  let renderedValue;

                  if (key === "fields" && hasFields) {
                    renderedValue = (
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          width: "24px",
                          minWidth: "24px",
                          maxWidth: "24px",
                          marginLeft: -4
                        }}
                      >
                        <IconButton
                          onClick={() => handleToggle(rowId)}
                          size="small"
                          sx={{ p: 0 }}
                        >
                          {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Box>
                    );
                  } else {
                    renderedValue =
                      customRenderers[key]?.(normalizedValue) ??
                      (cellText.length > 25
                        ? insertWordBreaks(cellText)
                        : cellText);
                  }

                  return (
                    <TableCell
                      key={`${rowId}-${key}`}
                      sx={{
                        padding: "8px",
                        paddingLeft: 4 + level,
                        verticalAlign: "center",
                         width: key === "fields" ? "40px" : "20%",
                        transition: "background-color 0.2s ease-in-out",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                          color: "#606060",
                          fontSize: "12px",
                        }}
                      >
                        {renderedValue}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>

              {hasFields && (
                <TableRow>
                  <TableCell
                    colSpan={keys.length}
                    sx={{
                      py: 0,
                      pl: 2,
                      px: 0,
                      background: getBackgroundColorForLevel(level + 1),
                    }}
                  >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <NestedTable
                          data={fields}
                          customRenderers={customRenderers}
                          level={level + 1}
                        />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};