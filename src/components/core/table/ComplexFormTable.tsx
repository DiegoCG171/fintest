import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ComplexFormTableProps } from "../../../config/interfaces";
import { useEffect, useState } from "react";
import ComplexFormSubTable from "./ComplexFormSubTable";

function ComplexFormTable({ data, columns }: ComplexFormTableProps) {
  const [visibleHeaders, setVisibleHeaders] = useState<string[]>([]);

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
          <ComplexFormSubTable
            data={data}
            visibleHeaders={visibleHeaders}
            columns={columns}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ComplexFormTable;
