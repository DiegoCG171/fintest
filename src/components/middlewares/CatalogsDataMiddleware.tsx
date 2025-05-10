import { useEffect, useMemo } from "react";
import { serviceConfig } from "../../config/utils/serviceConfig";
import {
  setConfig,
  setValuesForTab,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import FormBuilderContainer from "../UI/FormBuilder/FormBuilderContainer";
import { mapFieldRulesToFormStructure } from "../../config/utils/mappers";
import {
  ColumnConfigFormBuilder,
  FormBuilderProps,
  TableRowDataFormBuilder,
} from "../../config/interfaces";

function CatalogsDataMiddleware({tabId}: FormBuilderProps) {
  const dispatch = useAppDispatch();

  const rawRules = useAppSelector((state) => state.rules.rules);
  //const templates = useAppSelector((state) => state.templates.templates);
  const formState = useAppSelector((state) => state.formBuilder.tabForms[tabId]);

  const mappedRules = useMemo<TableRowDataFormBuilder[]>(() => {
    if (!rawRules?.length) return [];
    return mapFieldRulesToFormStructure(rawRules);
  }, [rawRules]);

  useEffect(() => {
    dispatch(
      setConfig(serviceConfig.rules.columns as ColumnConfigFormBuilder[])
    );
    if (!formState?.values?.length) {
      dispatch(
        setValuesForTab({
          tabId: tabId,
          values: mappedRules,
        })
      );
    }
  }, [dispatch, mappedRules, tabId, formState]);
  return <FormBuilderContainer tabId= {tabId}/>;
}
export default CatalogsDataMiddleware;
