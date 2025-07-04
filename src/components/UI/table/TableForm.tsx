import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Formik, Form } from "formik";
import CustomInputComponent from "../../core/forms/CustomInput";
import CustomSelect from "../../core/forms/CustomSelect";
import { DynamicTableProps } from "../../../config/interfaces";
import CustomCheckbox from "../../core/forms/CheckboxCell";

const TableForm: React.FC<DynamicTableProps> = ({ fields }) => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log("Formulario enviado:", JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} id="dynamic-table-form">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            id="submit-button"
          >
            Enviar
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: "4px", fontSize: "14px" }}></TableCell>
                  <TableCell sx={{ padding: "4px", fontSize: "14px" }}>Campo</TableCell>
                  <TableCell sx={{ padding: "4px", fontSize: "14px" }}>Nombre</TableCell>
                  <TableCell sx={{ padding: "4px", fontSize: "14px" }}>Requerido</TableCell>
                  <TableCell sx={{ padding: "4px", fontSize: "14px" }}>Función</TableCell>
                  <TableCell sx={{ padding: "4px", fontSize: "14px" }}>Parámetro</TableCell>
                  <TableCell sx={{ padding: "4px", fontSize: "14px" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field) => (
                  <React.Fragment key={field._id}>
                    <TableRow sx={{ padding: "0px", fontSize: "12px" }}>
                      <TableCell>
                        <CustomCheckbox id={`${field._id}-checkbox`} />
                      </TableCell>
                      <TableCell>{field.idBitmap}</TableCell>
                      <TableCell>{field.displayName}</TableCell>
                      <TableCell>
                        <CustomCheckbox id={`${field._id}-required`} checked={field.isLengthVariable} />
                      </TableCell>
                      <TableCell>
                        <CustomSelect
                          id={`${field._id}-func`}
                          options={{ op1: "Opción 1", op2: "Opción 2" }}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomInputComponent
                          id={`${field._id}-param`}
                          inputSize="sm"
                        />
                      </TableCell>
                      <TableCell>
                        {field.isBreakeable && (
                          <IconButton id={`${field._id}-toggle`} onClick={() => handleToggle(field._id)}>
                            {openRows[field._id] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                    {field.isBreakeable && field.breakingRules && (
                      <TableRow>
                        <TableCell colSpan={7} style={{ padding: 0 }}>
                          <Collapse in={openRows[field._id]} timeout="auto" unmountOnExit>
                            <Table size="small" sx={{ marginLeft: 4 }}>
                              <TableBody>
                                {field.breakingRules.map((rule) => (
                                  <TableRow key={rule._id}>
                                    <TableCell></TableCell>
                                    <TableCell>{rule.id}</TableCell>
                                    <TableCell>{rule.displayName}</TableCell>
                                    <TableCell>Alinea este campo</TableCell>
                                    <TableCell>
                                      <CustomSelect
                                        id={`${rule._id}-func`}
                                        options={{ op1: "Sub Opción 1", op2: "Sub Opción 2" }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <CustomInputComponent id={`${rule._id}-param`} />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      )}
    </Formik>
  );
};

export default TableForm;
