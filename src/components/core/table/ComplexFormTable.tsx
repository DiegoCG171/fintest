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
import ComplexFormSubTable from "./ComplexFormSubTable";

function ComplexFormTable({ data, columns }: ComplexFormTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{ minWidth: col.width }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& tr:last-child td": {
              borderBottom: "none",
            },
          }}
        >
          <ComplexFormSubTable
            data={data}
            columns={columns}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ComplexFormTable;
