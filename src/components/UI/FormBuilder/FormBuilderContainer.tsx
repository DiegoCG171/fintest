import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppSelector } from "../../../store";
import { FormBuilderProps } from "../../../config/interfaces";
import FormBuilderRow from "./FormBuilderRow";

function FormBuilderContainer({ tabId, canEdit }: FormBuilderProps) {
  const headers = useAppSelector((state) => state.formBuilder.config);
  const tabForm = useAppSelector((state) => state.formBuilder.tabForms[tabId]);
  const rows = tabForm?.values || [];

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: 360 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    width: col.width,
                    px: 1,
                    py: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td": {
                px: 1,
                py: 0.25,
                fontSize: "0.75rem",
              },
              "& tr:last-child td": {
                borderBottom: "none",
              },
            }}
          >
            {rows.map((row, index) => (
              <FormBuilderRow
                key={row._id}
                row={row}
                path={[index]}
                tabId={tabId}
                headers={headers}
                isChild= {false}
                canEdit={canEdit}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default FormBuilderContainer;
