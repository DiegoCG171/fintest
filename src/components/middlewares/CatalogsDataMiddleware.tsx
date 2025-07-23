import { useEffect, useMemo, useRef } from "react";
import { serviceConfig } from "../../config/utils/serviceConfig";
import {
  setConfig,
  setValuesForTab,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import FormBuilderContainer from "../UI/FormBuilder/FormBuilderContainer";
import {
  combineTemplateData,
  mapFieldRulesToFormStructure,
} from "../../config/utils/mappers";
import {
  CatalogsDataMiddlewareProps,
  ColumnConfigFormBuilder,
} from "../../config/interfaces";
import { getTransactionByType } from "../../config/utils";
import { useAuth } from "../../config/hooks/useAuth";
import { hasPermission } from "../../config/utils/permissions";
import {
  getGenetationFunctionsThunk,
  getSelectionFunctionsThunk,
  getValidationFunctionsThunk,
} from "../../store/slices/functionsSelect/functionsSelect.thunk";

function CatalogsDataMiddleware({
  tabId,
  template,
}: CatalogsDataMiddlewareProps) {
  const dispatch = useAppDispatch();
  const { formType, templateId } = template;
  const { permissions } = useAuth();

  const rawRules = useAppSelector((state) => state.rules.rules);
  const templates = useAppSelector((state) => state.templates.templates);
  const testCases = useAppSelector((state) => state.testCases.testCases);
  const formState = useAppSelector(
    (state) => state.formBuilder.tabForms[tabId]
  );

  const alreadyInitialized = useRef(false);

  // Functions Selects states
  const selectionState = useAppSelector(
    (state) => state.functionSelect.selectionState
  );
  const validationState = useAppSelector(
    (state) => state.functionSelect.validationState
  );
  const generationState = useAppSelector(
    (state) => state.functionSelect.generationState
  );

  const functionsFetched = useRef(false);

  const mappedRules = useMemo(() => {
    if (!rawRules?.length) return [];
    return mapFieldRulesToFormStructure(rawRules);
  }, [rawRules]);

  const transactionData = useMemo(() => {
    if (template.origin === "categories") {
      const result = getTransactionByType(templates, templateId, formType);
      return result;
    } else {
      const result = getTransactionByType(testCases, templateId, formType);
      return result;
    }
  }, [templates, templateId, formType, template, testCases]);

  useEffect(() => {
    if (template.formType != "generationTransaction") {
      dispatch(
        setConfig(serviceConfig.rules.columns as ColumnConfigFormBuilder[])
      );
    } else {
      dispatch(
        setConfig(
          serviceConfig.rulesGeneration.columns as ColumnConfigFormBuilder[]
        )
      );
    }
  }, [dispatch, template, formType]);

  useEffect(() => {
    if (functionsFetched.current) return;

    if (generationState === "idle") {
      dispatch(getGenetationFunctionsThunk());
    }

    if (validationState === "idle") {
      dispatch(getValidationFunctionsThunk());
    }

    if (selectionState === "idle") {
      dispatch(getSelectionFunctionsThunk());
    }

    functionsFetched.current = true;
  }, [dispatch, generationState, validationState, selectionState]);

  useEffect(() => {
    alreadyInitialized.current = false;
  }, [templateId]);

  useEffect(() => {
    if (alreadyInitialized.current) return;
    if (!rawRules?.length || !transactionData?.length || formState) return;

    const values = combineTemplateData(transactionData, mappedRules);
    dispatch(setValuesForTab({ tabId, values, originalValues: values }));
    alreadyInitialized.current = true;
  }, [dispatch, tabId, rawRules, transactionData, mappedRules, formState]);

  const canEdit = useMemo(() => {
    if (!permissions) return false;
    if (template.origin === "categories") {
      return hasPermission(permissions, "update", "template");
    }
    if (template.origin === "collections") {
      return hasPermission(permissions, "update", "testCase");
    }
    return false;
  }, [template.origin, permissions]);

  return (
    <FormBuilderContainer
      tabId={tabId}
      canEdit={canEdit}
    />
  );
}

export default CatalogsDataMiddleware;
