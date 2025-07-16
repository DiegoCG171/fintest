import { useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../../core/CustomTabPanel";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  FormTabItem,
  TabTableFormComponentProps,
  TemplateContextType,
} from "../../../config/interfaces";
import CatalogsDataMiddleware from "../../middlewares/CatalogsDataMiddleware";
import {
  addOrUpdateTestCases,
  clearRulesError,
  clearTemplateError,
  getRulesThunk,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useToast } from "../../../config/hooks/useToast";
import {
  getTemplateID,
  prepareUpdatePayload as preparePayload,
} from "../../../config/utils";
import {
  getTemplateByIdThunk,
  updateTemplateThunk,
} from "../../../store/slices/templates/templates.thunk";
import TitleHeaderComponent from "../TitleHeaderComponent";
import {
  getTestCaseByIdThunk,
  updateTestCaseThunk,
} from "../../../store/slices/testCases/testCases.thunk";
import { addOrUpdateTemplate } from "../../../store/slices/templates/template.slice";
import { getCollectionsThunk } from "../../../store/slices/collections/collections.thunk";
import { useParams } from "react-router-dom";
import { resetOriginalValues } from "../../../store/slices/UI/form/formBuilder.slice";

function TabbedTableForm({
  tabs,
  initialTabIndex = 0,
}: TabTableFormComponentProps) {
  const [value, setValue] = useState(initialTabIndex);
  useEffect(() => {
    setValue(initialTabIndex);
  }, [initialTabIndex]);

  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const { error: rulesError, status: statusRules } = useAppSelector(
    (state) => state.rules
  );
  const { getError: templatesError, getStatus: statusTemplates } =
    useAppSelector((state) => state.templates);
  const { getError: testCasesError, getStatus: statusTestCases } =
    useAppSelector((state) => state.testCases);
  const templates = useAppSelector((state) => state.templates.templates);
  const testCases = useAppSelector((state) => state.testCases.testCases);

  const canEdit = tabs[0].canEdit;
  const currentTabId = useMemo(() => {
    return tabs[value]
      ? `${tabs[value].templateId}-${tabs[value].formType}`
      : "";
  }, [tabs, value]);

  const tabForm = useAppSelector(
    (state) => state.formBuilder.tabForms[currentTabId]
  );
  const valuesToSend = tabForm?.values ?? [];

  const templateId = useMemo(() => tabs[value].templateId, [tabs, value]);
  const origin = useMemo(() => tabs[value].origin, [tabs, value]);
  const params = useParams();
  const { method, type } = params;


  //Reglas
  useEffect(() => {
    if (statusRules === "idle") {
      dispatch(getRulesThunk());
    }
    if (statusRules === "error") {
      showToast(rulesError as string, "error");
      dispatch(clearRulesError());
    }
  }, [dispatch, rulesError, showToast, statusRules]);

  //Plantillas
  useEffect(() => {
    if (tabs[value].origin !== "categories") return;

    const templateExist = templates.find(
      (template) => template.uuid === tabs[value].templateId
    );

    if(templateExist) return;

    const fetchTemplates = async () => {
      const result = await dispatch(
        getTemplateByIdThunk(tabs[value].templateId)
      );
      const template = result.payload;
      if (template) {
        dispatch(addOrUpdateTemplate(template as TemplateContextType));
      }
    };

    if (statusTemplates === "idle") fetchTemplates();

    if (statusTemplates === "error") {
      showToast(templatesError as string, "error");
      dispatch(clearTemplateError());
    }
  }, [dispatch, showToast, statusTemplates, templatesError, tabs, value, templates]);

  //Casos de prueba
  useEffect(() => {
    if (tabs[value].origin !== "collections") return;

    const testCaseExist = testCases.find(
      (testCase) => testCase.uuid === tabs[value].templateId
    );

    if(testCaseExist) return;

    const fetchTestCases = async () => {
      const result = await dispatch(
        getTestCaseByIdThunk(tabs[value].templateId)
      );
      const testCase = result.payload;
      if (testCase) {
        dispatch(addOrUpdateTestCases(testCase));
      }
    };

    if (statusTestCases === "idle") fetchTestCases();
    if (statusTestCases === "error") {
      showToast(testCasesError as string, "error");
      dispatch(clearTemplateError());
    }
  }, [dispatch, showToast, statusTestCases, testCasesError, tabs, value, testCases]);

  //Handlers
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSave = async () => {
    const tab = tabs[value];
    if (!tab) return;

    if (tab.origin === "categories") {
      await saveTemplates(tab);
    } else {
      saveTestCases(tab);
    }
  };

  //Guardar plantilla
  const saveTemplates = async (tab: FormTabItem) => {
    dispatch(setLoading(true));
    const payload = preparePayload(valuesToSend, tab.formType);
    const id = getTemplateID(templates, tab.templateId);
    if (!id) return;

    try {
      const result = await dispatch(
        updateTemplateThunk({ id, payload })
      ).unwrap();
      if (result) {
        dispatch(addOrUpdateTemplate(result as TemplateContextType));
        dispatch(resetOriginalValues({ tabId: tab.templateId + '-' + tab.formType }));
      }
      showToast("Plantilla actualizada correctamente", "success");
    } catch (error) {
      showToast(error as string, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  //Guardar caso de prueba
  const saveTestCases = async (tab: FormTabItem) => {
    dispatch(setLoading(true));
    const payload = preparePayload(valuesToSend, tab.formType);
    const id = tab.templateId;
    try {
      await dispatch(updateTestCaseThunk({ id, payload })).unwrap();
      dispatch(getCollectionsThunk(`${method}/${type}`));
      showToast("Caso de prueba actualizado correctamente", "success");
      dispatch(resetOriginalValues({ tabId: tab.templateId + '-' + tab.formType }));
    } catch (error) {
      showToast(error as string, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "end" }}
      >
        <TitleHeaderComponent
          routeId={templateId}
          origin={origin}
        />
        {canEdit && (
          <Button
            startIcon={<SaveOutlinedIcon />}
            sx={{ px: 2, fontSize: "12px" }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        )}
      </Stack>

      <Tabs
        value={value}
        onChange={handleChange}
        variant="standard"
        textColor="inherit"
        indicatorColor="primary"
        sx={{ maxHeight: "16px", padding: 0, mt: -1, mb: 2 }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={`${index}-tab-chip`}
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
        {tabs.map((template, index) => (
          <CustomTabPanel
            key={`${index}-tab-form-content`}
            value={value}
            index={index}
          >
            <CatalogsDataMiddleware
              tabId={currentTabId}
              template={template}
            />
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default TabbedTableForm;
