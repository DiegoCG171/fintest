import { SetStateAction, useState } from 'react';
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
} from '@mui/material';
import { TableRowData } from '../../config/interfaces/type.interface';


interface BasicTableProps {
  initialRows: TableRowData[];
  showPagination?: boolean;
}

function BasicTable({ initialRows, showPagination = false }: BasicTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: SetStateAction<number>) => {
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
    <Paper sx={{ width: '100%', boxShadow: 'none' }}>
      <TableContainer>
        <Table stickyHeader aria-label="tabla-dinamica">
          <TableHead>
            <TableRow>
              {dynamicKeys.map((key) => (
                <TableCell
                  key={key}
                  sx={{ fontWeight: 'bold', padding: '8px', paddingLeft: 4 }}
                >
                  {key.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map((row: TableRowData, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {dynamicKeys.map((key) => (
                  <TableCell key={key} sx={{ padding: '8px', paddingLeft: 4 }}>
                    <Box
                      sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row[key] ?? ''}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
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
