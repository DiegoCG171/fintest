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
  visibleHeaders,
  columns
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
      {data.map((row: TableRowData, rowIndex: number) => {
        const isOpen = openRows.has(rowIndex);
        return (
          <React.Fragment key={rowIndex + "fragment"}>
            <TableRow key={rowIndex + "table-row"}>
              {visibleHeaders.map((header) => {
                const value = row[header];
                if (Array.isArray(value)) {
                  return (
                    <TableCell
                      colSpan={visibleHeaders.length}
                      key={rowIndex + "tab-cell"}
                    >
                      <IconButton
                        aria-label="expandir"
                        onClick={() => toggleRow(rowIndex)}
                      >
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
                return <TableCell key={header}>{value}</TableCell>;
              })}
            </TableRow>

            {isOpen && (
              <TableRow sx={{margin:0, padding:0}}>
                <TableCell colSpan={visibleHeaders.length}>
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Table>
                      <TableBody>
                        <ComplexFormSubTable
                          data={
                            row[
                              visibleHeaders.find((h) =>
                                Array.isArray(row[h])
                              )!
                            ] as TableRowData[]
                          }
                          visibleHeaders={visibleHeaders}
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
