import { useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../../core/CustomTabPanel";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { TabTableFormComponentProps } from "../../../config/interfaces";
import CatalogsDataMiddleware from "../../middlewares/CatalogsDataMiddleware";
import {
  clearRulesError,
  clearTemplateError,
  getRulesThunk,
  getTemplatesThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useToast } from "../../../config/hooks/useToast";
import { prepareUpdatePayload as preparePayload} from "../../../config/utils";
import { updateTemplateThunk } from "../../../store/slices/templates/templates.thunk";

function TabbedTableForm({
  tabs,
  initialTabIndex = 0,
}: TabTableFormComponentProps) {
  const [value, setValue] = useState(initialTabIndex);
  useEffect(() => {
    setValue(initialTabIndex);
  }, [initialTabIndex]);
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const { error: rulesError, status: statusRules } = useAppSelector(
    (state) => state.rules
  );

  const { getError: templatesError, getStatus: statusTemplates } = useAppSelector(
    (state) => state.templates
  );

  const currentTabId = useMemo(
    () => `${tabs[value].templateId}-${tabs[value].formType}`,
    [tabs, value]
  );

  const tabForm = useAppSelector(
    (state) => state.formBuilder.tabForms[currentTabId]
  );

  const valuesToSend = tabForm?.values ?? [];

  useEffect(() => {
    const fetchRules = async () => await dispatch(getRulesThunk());
    if (statusRules === "idle") fetchRules();
    if (statusRules === "error") {
      showToast(rulesError as string, "error");
      dispatch(clearRulesError());
    }
  }, [dispatch, rulesError, showToast, statusRules]);

  useEffect(() => {
    const fetchTemplates = async () => await dispatch(getTemplatesThunk());
    if (statusTemplates === "idle") fetchTemplates();
    if (statusTemplates === "error") {
      showToast(templatesError as string, "error");
      dispatch(clearTemplateError());
    }
  }, [dispatch, showToast, statusTemplates, templatesError]);


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSave = async () => {
  const payload = preparePayload(valuesToSend, tabs[value].formType);
  const id = tabs[value].templateId;

  try {
    await dispatch(updateTemplateThunk({ id, payload }));
    showToast("Plantilla actualizada correctamente", "success");
  } catch (error) {
    showToast(error as string, "error");
  }
};

  return (
    <Box
      sx={{
        height: "100%",
        flexDirection: "column",
        mt: -2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          variant="standard"
          textColor="inherit"
          indicatorColor="primary"
          onChange={handleChange}
          sx={{
            maxHeight: "16px",
            padding: 0,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index + "-tab-chip"}
              label={tab.label}
              value={index}
              sx={{
                minHeight: "66px",
                padding: "4px 12px",
                fontSize: "12px",
                "&.Mui-selected": {
                  color: "primary.main",
                  fontWeight: "bold",
                },
              }}
            />
          ))}
        </Tabs>
        <Button
          startIcon={<SaveOutlinedIcon />}
          sx={{ paddingX: 2, fontSize: "12px" }}
          onClick={() => {
            handleSave();
          }}
        >
          Guardar
        </Button>
      </Stack>

      <Box sx={{ flexGrow: 1, overflow: "auto", mt: -2 }}>
        {tabs.map((template,index) => (
          <CustomTabPanel
            key={index + "-tab-form-content"}
            value={value}
            index={index}
          >
            <CatalogsDataMiddleware tabId={currentTabId} template={template} />
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}
export default TabbedTableForm;
