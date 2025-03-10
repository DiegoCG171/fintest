import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Breadcrumbs,
  Snackbar,
  SnackbarCloseReason,
  Tab,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { AppDispatch, RootState } from "../../store";
import { onToggleGeneralLoading } from "../../store/ui/uiSlice";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ValidationForm } from "./ValidationForm";
import { GenerationForm } from "./GenerationForm";
import { BreakingRule } from "../../interfaces/rule.interface";
import { startUpdateTemplate } from "../../store/templates/templatesSlice";

interface Row {
  id: string;
  function: string;
  isActive: boolean;
  parameter: string;
  isRequired: boolean;
  name: string;
  breakingRules?: BreakingRule[] | null;
  fields?: any[];
}

const tabList = [
  {
    key: "validationTransaction",
    label: "Validación",
  },
  {
    key: "generationTransaction",
    label: "Generación",
  },
];

export const FormsTemplate = ({ breadcrumbs }: { breadcrumbs: string[] }) => {
  const dispatch: AppDispatch = useDispatch();
  const { templates } = useSelector((state: RootState) => state.templates);
  const [open, setOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [tabValue, setTabValue] = useState("validationTransaction");
  const [saveRowsValidation, setSaveRowsValidation] = useState<Row[]>([]);
  const [saveRowsGeneration, setSaveRowsGeneration] = useState<Row[]>([]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(onToggleGeneralLoading(false));
    }, 3000);
  }, [tabValue]);

  const handleSaveRules = () => {
    setLoadingButton(true);

    const selectedRows =
      tabValue === "validationTransaction"
        ? saveRowsValidation
        : saveRowsGeneration;

    const activeRows = selectedRows.filter((row) => row.isActive);

    const updatedTransaction = activeRows.map((row) => {

      let value = row.parameter; 

      if (row?.fields && row.fields.length > 0) {
        value = row.fields.map((field) => field.value).join('');
      }

      console.log(value)

      return {
        isRequired: row.isRequired,
        isActive: row.isActive,
        function: row.function,
        value: value,
        idBitmap: row.id,
        fields: row.fields,
      };
    });

    const transactionKey =
      tabValue === "validationTransaction"
        ? "validationTransaction"
        : "generationTransaction";

    dispatch(
      startUpdateTemplate({
        id: templates[0]._id,
        template: {
          [transactionKey]: updatedTransaction,
        },
      })
    );

    setTimeout(() => {
      setLoadingButton(false);
      setOpen(true);
    }, 3000);
  };

  const handleTabList = (newValue: string) => {
    dispatch(onToggleGeneralLoading(true));
    setTabValue(newValue);
  };

  const handleClose = (
    _?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Los cambios han sido guardados exitosamente.
        </Alert>
      </Snackbar>
      <div
        style={{
          padding: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ my: 0, mx: 0.5 }}>
          {breadcrumbs?.map((breadcrumb, i) => (
            <Typography key={breadcrumb} sx={{ fontSize: "0.8rem" }}>
              {breadcrumbs.length - 1 === i ? (
                <p style={{ color: "#cd201b", fontWeight: "500" }}>
                  {breadcrumb}
                </p>
              ) : (
                breadcrumb
              )}
            </Typography>
          ))}
        </Breadcrumbs>
        <div>
          <LoadingButton
            size="small"
            sx={{
              fontSize: "0.7rem",
            }}
            onClick={handleSaveRules}
            startIcon={<SaveIcon sx={{ width: "0.8rem" }} />}
            variant="contained"
            loading={loadingButton}
            loadingPosition="start"
          >
            Guardar
          </LoadingButton>
        </div>
      </div>
      <TabContext value={tabValue}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList
            onChange={(_, newValue) => handleTabList(newValue)}
            sx={{ minHeight: 20 }}
          >
            {tabList.map((tab) => (
              <Tab
                key={tab.key}
                sx={{ minHeight: 8, padding: 1, fontSize: "0.6rem" }}
                label={tab.label}
                value={tab.key}
              />
            ))}
          </TabList>
        </Box>
        <TabPanel
          key={tabList[0].key}
          sx={{ padding: 0 }}
          value={tabList[0].key}
        >
          <ValidationForm setParentRows={setSaveRowsValidation} />
        </TabPanel>
        <TabPanel
          key={tabList[1].key}
          sx={{ padding: 0 }}
          value={tabList[1].key}
        >
          <GenerationForm setParentRows={setSaveRowsGeneration} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
