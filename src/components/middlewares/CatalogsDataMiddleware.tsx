import { useEffect, useMemo, useRef } from "react";
import { serviceConfig } from "../../config/utils/serviceConfig";
import {
  setConfig,
  setValuesForTab,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import FormBuilderContainer from "../UI/FormBuilder/FormBuilderContainer";
import { combineTemplateData, mapFieldRulesToFormStructure } from "../../config/utils/mappers";
import {
  ColumnConfigFormBuilder,
  FormTabItem,
} from "../../config/interfaces";
import { getTransactionByType } from "../../config/utils";

interface FormBuilderProps {
    tabId: string;
    template: FormTabItem
}


function CatalogsDataMiddleware({ tabId, template }: FormBuilderProps) {
  const dispatch = useAppDispatch();
  const { formType, templateId } = template;

  const rawRules = useAppSelector((state) => state.rules.rules);
  const templates = useAppSelector((state) => state.templates.templates);
  const formState = useAppSelector((state) => state.formBuilder.tabForms[tabId]);

  const alreadyInitialized = useRef(false);


  const mappedRules = useMemo(() => {
    return mapFieldRulesToFormStructure(rawRules || []);
  }, [rawRules]);

  const transactionData = useMemo(() => {
    return getTransactionByType(templates, templateId, formType);
  }, [templates, templateId, formType]);

  useEffect(() => {
    dispatch(setConfig(serviceConfig.rules.columns as ColumnConfigFormBuilder[]));
  }, [dispatch]);

  useEffect(() => {
    if (alreadyInitialized.current) return;
    if (!rawRules?.length || !transactionData?.length || formState?.values?.length) return;

    const values = combineTemplateData(transactionData, mappedRules);
    dispatch(setValuesForTab({ tabId, values }));
    alreadyInitialized.current = true;
  }, [dispatch, tabId, rawRules, transactionData, mappedRules, formState]);

  return <FormBuilderContainer tabId={tabId} />;
}

export default CatalogsDataMiddleware;
