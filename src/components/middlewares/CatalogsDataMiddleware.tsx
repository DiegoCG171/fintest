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
import { ColumnConfigFormBuilder, FormTabItem } from "../../config/interfaces";
import { getTransactionByType } from "../../config/utils";

interface FormBuilderProps {
  tabId: string;
  template: FormTabItem;
}

function CatalogsDataMiddleware({ tabId, template }: FormBuilderProps) {
  const dispatch = useAppDispatch();
  const { formType, templateId } = template;

  const rawRules = useAppSelector((state) => state.rules.rules);
  const templates = useAppSelector((state) => state.templates.templates);
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
    const result = mapFieldRulesToFormStructure(rawRules);
    return result;
  }, [rawRules]);

  const transactionData = useMemo(() => {
    const result = getTransactionByType(templates, templateId, formType);
    return result;
  }, [templates, templateId, formType]);

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
    if (!rawRules?.length || !transactionData?.length) return;
    if (alreadyInitialized.current || formState) return;

    const values = combineTemplateData(transactionData, mappedRules);
    dispatch(setValuesForTab({ tabId, values }));
    alreadyInitialized.current = true;
  }, [dispatch, tabId, rawRules, transactionData, mappedRules, formState]);

  return <FormBuilderContainer tabId={tabId} canEdit={template.canEdit} />;
}

export default CatalogsDataMiddleware;
