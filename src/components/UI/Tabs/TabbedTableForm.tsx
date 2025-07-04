import { useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../../core/CustomTabPanel";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  FormTabItem,
  TabTableFormComponentProps,
} from "../../../config/interfaces";
import CatalogsDataMiddleware from "../../middlewares/CatalogsDataMiddleware";
import {
  clearRulesError,
  clearTemplateError,
  getRulesThunk,
  getTemplatesThunk,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useToast } from "../../../config/hooks/useToast";
import {
  getTemplateID,
  prepareUpdatePayload as preparePayload,
} from "../../../config/utils";
import { updateTemplateThunk } from "../../../store/slices/templates/templates.thunk";
import TitleHeaderComponent from "../TitleHeaderComponent";
import { getTestCasesThunk } from "../../../store/slices/testCases/testCases.thunk";
import { updateTestCaseThunk } from "../../../store/slices/collections/collections.thunk";

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
  const canEdit = tabs[0].canEdit;

  const { getError: templatesError, getStatus: statusTemplates } =
    useAppSelector((state) => state.templates);

  const { getError: testCasesError, getStatus: statusTestCases } =
    useAppSelector((state) => state.testCases);

  const currentTabId = useMemo(() => {
    if (!tabs[value]) return "";
    return `${tabs[value].templateId}-${tabs[value].formType}`;
  }, [tabs, value]);

  const tabForm = useAppSelector(
    (state) => state.formBuilder.tabForms[currentTabId]
  );

  const valuesToSend = tabForm?.values ?? [];

  /* useEffect(() => {
    const templpateById = async () => await dispatch(getTemplateByIdThunk(tabs[value].templateId));
    templpateById();
  }, [currentTabId, tabs, value, dispatch]) */

  useEffect(() => {
    const fetchRules = async () => await getRulesThunk();
    if (statusRules === "idle") fetchRules();
    if (statusRules === "error") {
      showToast(rulesError as string, "error");
      dispatch(clearRulesError());
    }
  }, [dispatch, rulesError, showToast, statusRules]);


  useEffect(() => {
    const fetchTemplates = async () => {
      await dispatch(getTemplatesThunk());
    };

    if (statusTemplates === "idle") fetchTemplates();

    if (statusTemplates === "error") {
      showToast(templatesError as string, "error");
      dispatch(clearTemplateError());
    }
  }, [dispatch, showToast, statusTemplates, templatesError]);

  useEffect(() => {
    const fetchTestCases = async () => await dispatch(getTestCasesThunk());
    if (statusTestCases === "idle") fetchTestCases();
    if (statusTestCases === "error") {
      showToast(testCasesError as string, "error");
      dispatch(clearTemplateError());
    }
  }, [dispatch, showToast, statusTestCases, testCasesError]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const templates = useAppSelector((state) => state.templates.templates);

  const handleSave = async () => {
    const tab = tabs[value];
    if (!tab) return;

    if (tab.origin === "categories") {
      await saveTemplates(tab);
    } else {
      saveTestCases(tab);
    }
  };

  const saveTemplates = async (tab: FormTabItem) => {
    dispatch(setLoading(true));
    const payload = preparePayload(valuesToSend, tab.formType);
    const id = getTemplateID(templates, tab.templateId);
    if (!id) return;
    try {
      await dispatch(updateTemplateThunk({ id, payload })).unwrap();
      dispatch(getTemplatesThunk());
      showToast("Plantilla actualizada correctamente", "success");
    } catch (error) {
      showToast(error as string, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };


  const saveTestCases = async (tab: FormTabItem) => {
    dispatch(setLoading(true));
    const payload = preparePayload(valuesToSend, tab.formType);
    const id = tab.templateId;
    try {
      await dispatch(updateTestCaseThunk({ id, payload })).unwrap();
      dispatch(getTestCasesThunk());
      showToast("Caso de prueba actualizado correctamente", "success");
    } catch (error) {
      showToast(error as string, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TitleHeaderComponent />
        {canEdit && (
          <Button
            startIcon={<SaveOutlinedIcon />}
            sx={{ paddingX: 2, fontSize: "12px" }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        )}
      </Stack>

      <Tabs
        value={value}
        variant="standard"
        textColor="inherit"
        indicatorColor="primary"
        onChange={handleChange}
        sx={{
          maxHeight: "16px",
          padding: 0,
          mt: -1,
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

      <Box sx={{ flex: 1, overflow: "auto" }}>
        {tabs.map((template, index) => {
          return (
            <CustomTabPanel
              key={index + "-tab-form-content"}
              value={value}
              index={index}
            >
              <CatalogsDataMiddleware
                tabId={currentTabId}
                template={template}
              />
            </CustomTabPanel>
          );
        })}
      </Box>
    </Box>
  );
}
export default TabbedTableForm;
