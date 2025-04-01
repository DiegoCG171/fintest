import { SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";
import { TableRowData } from "../../config/interfaces/type.interface";

interface BasicTableProps {
  initialRows: TableRowData[];
  showPagination?: boolean;
}

function insertWordBreaks(text: any, chunkSize = 20) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks.reduce((acc, chunk, index) => {
    if (index > 0) {
      return [...acc, <wbr key={index} />, chunk];
    }
    return [chunk];
  }, []);
}

function BasicTable({ initialRows, showPagination = false }: BasicTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: unknown,
    newPage: SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsToShow = showPagination
    ? initialRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : initialRows;

  const dynamicKeys = Object.keys(initialRows[0] || {});

  return (
    <Paper sx={{ width: "100%", boxShadow: "none" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {dynamicKeys.map((key) => (
                <TableCell
                  key={key}
                  sx={{ fontWeight: "bold", padding: "8px", paddingLeft: 4, height: "100%" }}
                >
                  {key.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map((row: TableRowData, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {dynamicKeys.map((key) => {
                  const cellValue = row[key];
                  const cellText =
                    typeof cellValue === "string" ||
                    typeof cellValue === "number"
                      ? String(cellValue)
                      : "";

                  return (
                    <TableCell
                      key={key}
                      sx={{ 
                        padding: "8px", 
                        paddingLeft: 4,
                        height: "100%"
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                        }}
                      >
                        {cellText.length > 25
                          ? insertWordBreaks(cellText)
                          : cellText}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
          component="div"
          count={initialRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage=""
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

export default BasicTable;
