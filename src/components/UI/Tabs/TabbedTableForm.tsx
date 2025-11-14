import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, CircularProgress, Stack, Tab, Tabs } from "@mui/material";
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
  setLoading,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useToast } from "../../../config/hooks/useToast";
import {
  debounceThunk,
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
import { useAuth } from "../../../config/hooks/useAuth";
import { hasPermission } from "../../../config/utils/permissions";
import { getRuleByIdThunk } from "../../../store/slices/rules/rules.thunk";

function TabbedTableForm({
  tabs,
  initialTabIndex = 0,
}: TabTableFormComponentProps) {
  const [value, setValue] = useState(initialTabIndex);
  const { permissions } = useAuth();
  useEffect(() => {
    setValue(initialTabIndex);
  }, [initialTabIndex]);

  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const { error: rulesError, status: statusRules } = useAppSelector(
    (state) => state.rules
  );

  const canEdit = useMemo(() => {
    if (!permissions) return false;
    if (tabs[0].origin === "categories") {
      return hasPermission(permissions, "update", "template");
    }
    if (tabs[0].origin === "collections") {
      return hasPermission(permissions, "update", "testCase");
    }
    return false;
  }, [tabs, permissions]);

  const { getError: templatesError, getStatus: statusTemplates } =
    useAppSelector((state) => state.templates);
  const { getError: testCasesError, getStatus: statusTestCases } =
    useAppSelector((state) => state.testCases);
  const templates = useAppSelector((state) => state.templates.templates);
  const testCases = useAppSelector((state) => state.testCases.testCases);

  const currentTabId = useMemo(() => {
    return tabs[value]
      ? `${tabs[value].templateId}-${tabs[value].formType}`
      : "";
  }, [tabs, value]);

  const dependsOnId = useAppSelector(
    (state) => state.formBuilder.tabForms[currentTabId]?.dependsOnId || ""
  );

  const tabForm = useAppSelector(
    (state) => state.formBuilder.tabForms[currentTabId]
  );
  const valuesToSend = tabForm?.values ?? [];

  const templateId = useMemo(() => tabs[value].templateId, [tabs, value]);
  const origin = useMemo(() => tabs[value].origin, [tabs, value]);
  const params = useParams();
  const { method, type } = params;

  const alreadyFetchedRules = useRef(false);

  const schemaId = useMemo(() => {
    const tab = tabs[value];
    if (!tab) return null;

    const source =
      tab.origin === "categories"
        ? templates.find((t) => t.uuid === tab.templateId)
        : testCases.find((tc) => tc.uuid === tab.templateId);

    return source?.schemaId ?? null;
  }, [tabs, value, templates, testCases]);

  const templateExist = useMemo(() => {
    return tabs[value].origin === "categories"
      ? templates.some((template) => template.uuid === tabs[value].templateId)
      : true;
  }, [tabs, value, templates]);

  const testCaseExist = useMemo(() => {
    return tabs[value].origin === "collections"
      ? testCases.some((testCase) => testCase.uuid === tabs[value].templateId)
      : true;
  }, [tabs, value, testCases]);

  const isTabDataReady =
    templateExist && testCaseExist && statusRules === "success";

  const isLoading = !isTabDataReady;

  useEffect(() => {
    if(!schemaId) return;
    if (!alreadyFetchedRules.current && statusRules === "idle") {
      dispatch(
        getRuleByIdThunk({ uuid: schemaId })
      );
      alreadyFetchedRules.current = true;
    }
  }, [dispatch, statusRules, schemaId]);

  useEffect(() => {
    if (statusRules === "error" && rulesError) {
      showToast(rulesError as string, "error");
      dispatch(clearRulesError());
    }
  }, [dispatch, showToast, rulesError, statusRules]);

  //Plantillas
  useEffect(() => {
    if (tabs[value].origin !== "categories") return;

    const templateExist = templates.find(
      (template) => template.uuid === tabs[value].templateId
    );

    if (templateExist) return;
    const templateId = tabs[value].templateId;
    const fetchTemplates = async () => {
      const result = await debounceThunk(
        `template-${templateId}`,
        () => getTemplateByIdThunk(templateId),
        dispatch,
        300
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
  }, [
    dispatch,
    showToast,
    statusTemplates,
    templatesError,
    tabs,
    value,
    templates,
  ]);

  useEffect(() => {
    if (tabs[value].origin !== "collections") return;

    const testCaseExist = testCases.find(
      (testCase) => testCase.uuid === tabs[value].templateId
    );

    if (testCaseExist) return;

    const fetchTestCases = async () => {
      const testCaseId = tabs[value].templateId;
      const result = await debounceThunk(
        `template-${testCaseId}`,
        () => getTestCaseByIdThunk(testCaseId),
        dispatch,
        300
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
  }, [
    dispatch,
    showToast,
    statusTestCases,
    testCasesError,
    tabs,
    value,
    testCases,
  ]);

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

  const saveTemplates = async (tab: FormTabItem) => {
    dispatch(setLoading(true));
    const payload = preparePayload(valuesToSend, tab.formType);
    const id = tab.templateId;
    if (!id) return;
    try {
      const result = await dispatch(
        updateTemplateThunk({ id, payload })
      ).unwrap();
      if (result) {
        dispatch(addOrUpdateTemplate(result as TemplateContextType));
        dispatch(
          resetOriginalValues({ tabId: tab.templateId + "-" + tab.formType })
        );
      }
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
    if (dependsOnId && dependsOnId !== "none" && dependsOnId.trim() !== "") {
      payload.dependOn = dependsOnId;
    } else {
      payload.dependOn = "";
      payload.dependOnTransaction  = [];
    }

    const id = tab.templateId;

    try {
      await dispatch(updateTestCaseThunk({ id, payload })).unwrap();
      dispatch(getCollectionsThunk(`${method}/${type}`));
      showToast("Caso de prueba actualizado correctamente", "success");
      dispatch(
        resetOriginalValues({ tabId: tab.templateId + "-" + tab.formType })
      );
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
        {tabs
          .filter(
            (template) =>
              !template.label.includes("Depende") ||
              template.origin === "collections"
          )
          .map((tab, index) => (
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
        {isLoading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          tabs
            .filter(
              (template) =>
                !template.label.includes("Depende") ||
                template.origin === "collections"
            )
            .map((template, index) => (
              <CustomTabPanel
                key={`${index}-tab-form-content`}
                value={value}
                index={index}
              >
                {
                  <CatalogsDataMiddleware
                    tabId={currentTabId}
                    template={template}
                  />
                }
              </CustomTabPanel>
            ))
        )}
      </Box>
    </Box>
  );
}

export default TabbedTableForm;
