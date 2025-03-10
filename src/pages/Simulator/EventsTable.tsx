import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { onGetMessage } from "../../store/messages/messagesSlice";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export const EventsTable = ({messages}: {messages: any}) => {
    const dispatch: AppDispatch = useDispatch();
  return (
    <Box component={Paper} elevation={1}>
      <TableContainer sx={{ height: "14vh", maxHeight: "14vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: "2px 10px",
                  fontSize: "0.6rem",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px 10px",
                  fontSize: "0.6rem",
                }}
              >
                Fecha
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px 10px",
                  fontSize: "0.6rem",
                }}
              >
                Tipo de Mensaje
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px 10px",
                  fontSize: "0.6rem",
                }}
              >
                Tipo de Transacción
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px 10px",
                  fontSize: "0.6rem",
                }}
              >
                Contenido
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px 10px",
                  fontSize: "0.6rem",
                }}
              >
                Estado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((row: any) => (
              <TableRow
                key={row.uuid}
                sx={{ cursor: "pointer", padding: 0 }}
                hover
                onClick={() => dispatch(onGetMessage(row))}
              >
                <TableCell
                  sx={{
                    width: "3%",
                    padding: "0px",
                    pl: 1,
                    textAlign: "left",
                    fontSize: "0.6rem",
                  }}
                >
                  {row.incremental}
                </TableCell>
                <TableCell
                  sx={{
                    width: "14%",
                    padding: "0px",
                    pl: 1,
                    textAlign: "left",
                    fontSize: "0.6rem",
                  }}
                >
                  {new Date(row.date).toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    width: "10%",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0px",
                    pl: 1,
                    textAlign: "left",
                    fontSize: "0.6rem",
                  }}
                >
                  {row.typeMsg}
                </TableCell>
                <TableCell
                  sx={{
                    width: "12%",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0px",
                    pl: 1,
                    textAlign: "left",
                    fontSize: "0.6rem",
                  }}
                >
                  {row.typeTx as string}
                </TableCell>
                <TableCell
                  sx={{
                    width: "24%",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0px",
                    pl: 1,
                    textAlign: "left",
                    fontSize: "0.6rem",
                  }}
                >
                  {row.value}
                </TableCell>
                <TableCell
                  sx={{
                    width: "31%",
                    padding: "0px",
                    pl: 1,
                    textAlign: "left",
                    fontSize: "0.6rem",
                  }}
                >
                  {row.errorAt ? (
                    <CheckCircleOutline
                      sx={{
                        width: 12,
                        margin: 0,
                        color: "success.dark",
                      }}
                    />
                  ) : (
                    <ErrorOutline
                      sx={{
                        width: 12,
                        margin: 0,
                        padding: 0,
                        color: "error.dark",
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
