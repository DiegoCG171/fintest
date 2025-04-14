import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  PropsComplexFormSubTable,
  TableRowData,
} from "../../../config/interfaces";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useState } from "react";
import React from "react";

export default function ComplexFormSubTable({
  data,
  columns,
}: PropsComplexFormSubTable) {
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setOpenRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  return (
    <>
      {data.map((row, rowIndex) => {
        const isOpen = openRows.has(rowIndex);
        const childColumn = columns.find((col) => Array.isArray(row[col.id]));

        return (
          <React.Fragment key={rowIndex + "-fragment"}>
            <TableRow>
              {columns.map((col) => {
                const value = row[col.id];
                const isExpandable = Array.isArray(value);

                if (isExpandable) {
                  return (
                    <TableCell
                      key={col.id}
                      colSpan={columns.length}
                      sx={{ width: col.width }}
                    >
                      <IconButton onClick={() => toggleRow(rowIndex)}>
                        {value.length ? (
                          isOpen ? (
                            <KeyboardArrowUpRoundedIcon />
                          ) : (
                            <KeyboardArrowDownRoundedIcon />
                          )
                        ) : (
                          ""
                        )}
                      </IconButton>
                    </TableCell>
                  );
                }

                return (
                  <TableCell
                    key={col.id}
                    sx={{ width: col.width }}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Fila colapsable */}
            {isOpen && childColumn && Array.isArray(row[childColumn.id]) && (
              <TableRow sx={{ p: 0, m: 0 }}>
                <TableCell
                  colSpan={columns.length}
                  sx={{ p: 0 }}
                >
                  <Collapse
                    in={isOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Table sx={{ p: 0 }}>
                      <TableBody>
                        <ComplexFormSubTable
                          data={row[childColumn.id] as TableRowData[]}
                          columns={columns}
                        />
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
