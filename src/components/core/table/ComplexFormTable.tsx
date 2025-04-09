import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ComplexFormTableProps,
  TableRowData,
} from "../../../config/interfaces";
import { useEffect, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

function ComplexFormTable({ data }: ComplexFormTableProps) {
  console.log(data);
  const [visibleHeaders, setVisibleHeaders] = useState<string[]>([]);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (data.length > 0) {
      const allHeaders = Object.keys(data[0]);
      const filteredHeaders = allHeaders.filter((h) => !h.startsWith("_"));
      setVisibleHeaders(filteredHeaders);
    }
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {visibleHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: TableRowData, rowIndex: number) => {
            return (
              <TableRow key={rowIndex}>
                {visibleHeaders.map((header) => {
                  const value = row[header];

                  if (Array.isArray(value)) {
                    return (
                      <TableCell colSpan={visibleHeaders.length}>
                        <IconButton aria-label="expandir" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowUpRoundedIcon />}
                        </IconButton>
                        <Collapse in={true}>
                          {/* <ComplexFormTable
                              data={row[header] as TableRowData[]}
                            /> */}
                        </Collapse>
                      </TableCell>
                    );
                  }

                  return <TableCell key={header}>{value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ComplexFormTable;
