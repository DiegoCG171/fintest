import { useEffect, useMemo, useRef } from "react";
import { serviceConfig } from "../../config/utils/serviceConfig";
import {
  setConfig,
  setValuesForTab,
  useAppDispatch,
  useAppSelector,
  getRulesThunk,
} from "../../store";
import FormBuilderContainer from "../UI/FormBuilder/FormBuilderContainer";
import {
  combineTemplateData,
  mapFieldRulesToFormStructure,
} from "../../config/utils/mappers";
import { CatalogsDataMiddlewareProps, ColumnConfigFormBuilder } from "../../config/interfaces";
import { getTransactionByType } from "../../config/utils";
import { useAuth } from "../../config/hooks/useAuth";
import { hasPermission } from "../../config/utils/permissions";

function CatalogsDataMiddleware({ tabId, template }: CatalogsDataMiddlewareProps) {
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

  useEffect(() => {
    if (!rawRules?.length) {
      dispatch(getRulesThunk());
    }
  }, [dispatch, rawRules]);

  const mappedRules = useMemo(() => {
    if (!rawRules?.length) return [];
    return mapFieldRulesToFormStructure(rawRules);
  }, [rawRules]);

  const transactionData = useMemo(() => {
    if (template.origin === "categories") {
      return getTransactionByType(templates, templateId, formType);
    } else {
      return getTransactionByType(testCases, templateId, formType);
    }
  }, [templates, templateId, formType, template, testCases]);

  useEffect(() => {
    dispatch(
      setConfig(serviceConfig.rules.columns as ColumnConfigFormBuilder[])
    );
  }, [dispatch]);

  useEffect(() => {
    alreadyInitialized.current = false;
  }, [templateId]);

  useEffect(() => {
    if (alreadyInitialized.current) return;
    if (!rawRules?.length || !transactionData?.length || formState) return;

    const values = combineTemplateData(transactionData, mappedRules);
    dispatch(setValuesForTab({ tabId, values }));
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

  return <FormBuilderContainer tabId={tabId} canEdit={canEdit} />;
}


export default CatalogsDataMiddleware;
