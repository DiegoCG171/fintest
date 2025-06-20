import { ReactNode, SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import {
  BasicTableProps,
  FieldError,
  TableRowData,
} from "../../../config/interfaces";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setActiveMessage } from "../../../store/slices/messages/messages.slice";
import { TableRowComponent } from "./TableRowComponent";
import { TableHeader } from "./TableHeader";

function BasicTable({
  initialRows,
  showPagination = false,
  customRenderers = {},
  type = "events",
}: BasicTableProps) {
  const dispatch = useAppDispatch();
  const { activeMessage } = useAppSelector((state) => state.messagesReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keys, setKeys] = useState<string[]>([]);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (
    _event: unknown,
    newPage: SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSetActiveMessage = (
    id: number | string | undefined,
    message: TableRowData[] | ReactNode | FieldError
  ) => {
    if (type === "events" && Array.isArray(message)) {
      dispatch(setActiveMessage({ data: message, id }));
    }
  };

  const rowsToShow = showPagination
    ? initialRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : initialRows;

  useEffect(() => {
    const dynamicKeys = Object.keys(initialRows[0] || {});
    const filteredKeys =
      type === "events"
        ? dynamicKeys.filter((key) => key !== "fields")
        : dynamicKeys;

    setKeys(filteredKeys);
  }, [initialRows, type]);

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
      }}
    >
      <TableContainer
        sx={{
          flex: 1,
          overflow: "auto",
          mt:2
        }}
      >
        <Table stickyHeader>
          <TableHeader keys={keys} />
          <TableBody>
            {rowsToShow.map((row: TableRowData, rowIndex: number) => (
              <TableRowComponent
                key={rowIndex}
                row={row}
                rowIndex={rowIndex}
                keys={keys}
                customRenderers={customRenderers}
                type={type}
                activeMessageId={activeMessage.id}
                onSetActiveMessage={handleSetActiveMessage}
                onToggle={handleToggle}
                openRows={openRows}
              />
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
