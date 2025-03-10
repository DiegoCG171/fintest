import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
  Tab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CheckCircleOutline, Close, ErrorOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  onRemoveTabCollection,
  onToggleGeneralLoading,
} from "../../store/ui/uiSlice";
import { FormsTemplate } from "./FormsTemplate";
import { Message, MessageField } from "../../interfaces";

// Interfaces proporcionadas

export interface ValueElement {
  id: string;
  value: string;
  displayName: string;
}

interface SubFieldTableProps {
  fields: MessageField[];
  isOpen: boolean;
}

interface FieldTableProps {
  fields: MessageField[];
}

// Centralized Styles
const sxStyles = {
  cellSmall: { padding: "2px 8px", fontSize: "0.6rem" },
  cellContent: { padding: "8px", fontSize: "0.6rem" },
  tableContainer: { height: "75vh" },
  iconSmall: { width: 12, height: 12 },
};

// SubFieldTable Component
const SubFieldTable: React.FC<SubFieldTableProps> = ({ fields, isOpen }) => (
  <Collapse in={isOpen} sx={{ padding: isOpen ? "10px" : "0px" }}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["Campo", "Nombre", "Longitud", "Contenido"].map((header) => (
              <TableCell key={header} sx={sxStyles.cellSmall}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id || field.idBitmap}>
              <TableCell sx={{ width: "6%", ...sxStyles.cellContent }}>
                {field.id || field.idBitmap}
              </TableCell>
              <TableCell sx={{ width: "10%", ...sxStyles.cellContent }}>
                {field.displayName}
              </TableCell>
              <TableCell
                sx={{
                  width: "5%",
                  ...sxStyles.cellContent,
                  textAlign: "right",
                }}
              >
                {Array.isArray(field.value)
                  ? field.value.join("").length
                  : field.value?.length}
              </TableCell>
              <TableCell
                sx={{
                  width: "60%",
                  ...sxStyles.cellContent,
                }}
              >
                {Array.isArray(field.value)
                  ? field.value.map((element) => (
                      <div key={element.id}>
                        {element.id}: {element.value}
                      </div>
                    ))
                  : field.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Collapse>
);

// FieldTable Component
const FieldTable: React.FC<FieldTableProps> = ({ fields }) => {
  const [openFields, setOpenFields] = useState<Record<string, boolean>>({});

  const handleToggle = (idBitmap: string) =>
    setOpenFields((prev) => ({ ...prev, [idBitmap]: !prev[idBitmap] }));

  return (
    <TableContainer component={Paper} sx={sxStyles.tableContainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["Campo", "Nombre", "Longitud", "Estado", "Contenido", ""].map(
              (header, index) => (
                <TableCell key={index} sx={sxStyles.cellSmall}>
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field, index) => (
            <React.Fragment key={field.idBitmap}>
              <TableRow>
                <TableCell sx={{ width: "6%", ...sxStyles.cellContent }}>
                  {field.idBitmap}
                </TableCell>
                <TableCell sx={{ width: "22%", ...sxStyles.cellContent }}>
                  {field.displayName}
                </TableCell>
                <TableCell sx={{ textAlign: "right", ...sxStyles.cellContent }}>
                  {Array.isArray(field.value)
                    ? field.value.join("").length
                    : field.value?.length}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", ...sxStyles.cellContent }}
                >
                  {index % 2 === 0 ? (
                    <CheckCircleOutline
                      sx={{ ...sxStyles.iconSmall, color: "success.dark" }}
                    />
                  ) : (
                    <ErrorOutline
                      sx={{ ...sxStyles.iconSmall, color: "error.dark" }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ width: "60%", ...sxStyles.cellContent }}>
                  {Array.isArray(field.value)
                    ? field.value.map((element) => (
                        <div key={element.id}>
                          {element.id}: {element.value}
                        </div>
                      ))
                    : field.value}
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                  {field.fields && field.fields.length > 0 && (
                    <IconButton onClick={() => handleToggle(field.idBitmap!)}>
                      {openFields[field.idBitmap!] ? (
                        <ExpandLessIcon sx={sxStyles.iconSmall} />
                      ) : (
                        <ExpandMoreIcon sx={sxStyles.iconSmall} />
                      )}
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
              {field.fields && field.fields.length > 0 && (
                <TableRow>
                  <TableCell colSpan={12} sx={{ padding: "0px" }}>
                    <SubFieldTable
                      fields={field.fields}
                      isOpen={!!openFields[field.idBitmap!]}
                    />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// MessageTable Component
export const MessageTable: React.FC<{ data: Message }> = ({ data }) => {
  const dispatch: AppDispatch = useDispatch();
  const { tabsCollections } = useSelector((state: RootState) => state.ui);
  const [tabValue, setTabValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    dispatch(onToggleGeneralLoading(true));
  };

  useEffect(() => {
    if (tabsCollections) setTabValue(`${tabsCollections.length + 2}`);
  }, [tabsCollections]);

  useEffect(() => {
    setTabValue("1");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(onToggleGeneralLoading(false));
    }, 3000);
  }, [tabValue]);

  return (
    <Box sx={{ padding: 1 }}>
      <TabContext value={tabValue}>
        <Box sx={{ padding: 0, borderColor: "divider" }}>
          <TabList onChange={handleChange} sx={{ minHeight: 20, padding: 0 }}>
            {[
              "Detalles",
              "Errores",
              ...(tabsCollections || []).map((tab) => tab.tab),
            ].map((label, index) => (
              <Tab
                key={index}
                label={
                  index > 1 ? (
                    <Box display="flex" alignItems="center">
                      {label}
                      {tabsCollections && tabsCollections[index - 2] && (
                        <IconButton
                          size="small"
                          sx={{ marginLeft: 1, height: 12, width: 12 }}
                          onClick={() =>
                            dispatch(
                              onRemoveTabCollection(
                                tabsCollections[index - 2].id
                              )
                            )
                          }
                        >
                          <Close sx={sxStyles.iconSmall} />
                        </IconButton>
                      )}
                    </Box>
                  ) : (
                    label
                  )
                }
                value={`${index + 1}`}
                sx={{
                  fontSize: "0.6rem",
                  padding: 1,
                  minHeight: 2,
                  minWidth: 0,
                  border: "1px solid #ccc",
                  borderBottom: "none",
                  borderRadius: "4px 4px 0 0",
                  marginRight: "2px",
                }}
              />
            ))}
          </TabList>
        </Box>
        {tabValue === "1" && (
          <TabPanel sx={{ padding: 0 }} value="1">
            <FieldTable fields={data.fields} />
          </TabPanel>
        )}
        {tabValue === "2" && (
          <TabPanel sx={{ padding: 0 }} value="2">
            <FieldTable fields={data.fields} />
          </TabPanel>
        )}
        {tabValue !== "1" &&
          tabsCollections?.map((tab, index) => (
            <TabPanel key={tab.tab} sx={{ padding: 0 }} value={`${index + 3}`}>
              <FormsTemplate breadcrumbs={tab.breadcrumbs} />
            </TabPanel>
          ))}
      </TabContext>
    </Box>
  );
};
