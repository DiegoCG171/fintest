import {
  Box,
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
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

const ComplexFormTable = forwardRef(({ data, columns, parentpath }: ComplexFormTableProps, ref) => {
  const dataById = useMemo(() => (
    Object.fromEntries(data.map((row) => [row._id, row]))
  ), [data]);  
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const initialValues = useMemo(() => ({ items: dataById }), [dataById]);


  useImperativeHandle(ref, () => ({
    submitForm: () => formikRef.current?.submitForm(),
  }));

  return (
    <Formik
      initialValues={initialValues}
      innerRef={formikRef} 
      onSubmit={(values) => {
        console.log("✅ Valores del formulario:");
        console.table(values.items);
      }}
    >
      {() => (
        <Form>
          <Box sx={{ overflowX: "auto" }}>
            <Box
              mt={2}
              display="flex"
              justifyContent="flex-end"
            >
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        sx={{ 
                          minWidth: col.width,
                          px: 1,
                          py: 0.5,
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
                  <ComplexFormSubTable
                    data={dataById}
                    columns={columns}
                    parentPath={parentpath}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Form>
      )}
    </Formik>
  );
})

export default ComplexFormTable;
