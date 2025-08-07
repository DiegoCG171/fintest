import { setValuesForTab } from "../../store";
import { AppDispatch } from "../../store/store";
import {
    TemplateContextType,
    TableRowDataFormBuilder,
    Field,
    FieldValidation,
    FormTypeKey,
} from "../interfaces";
import { mapFieldRulesToFormStructure, combineTemplateData } from "./mappers";

function getFieldsByFormType(
  template: TemplateContextType,
  formType: string
): FieldValidation[] {
  if (formType === "generationTransaction")
    return template.generationTransaction;
  if (formType === "selectionTransaction") return template.selectionTransaction;
  if (formType === "generationTransaction")
    return template.generationTransaction;
  return template.validationTransaction;
}

export function getDefaultFunctionByFormType(formType: string): string {
    if (formType === "generationTransaction") return "echo";
    if (formType === "validationTransaction") return "not_validate";
    if (formType === "selectionTransaction") return "equals";
    return "";
}

export function generateTabFormValuesFromTemplate(
  template: TemplateContextType,
  rawRules: Field[],
  formType: string
): TableRowDataFormBuilder[] {
  if (!rawRules?.length) return [];

    const mappedRules = mapFieldRulesToFormStructure(rawRules);
    const fields = getFieldsByFormType(template, formType);
    const isActive = Boolean(fields?.length);
    const values = combineTemplateData(fields , mappedRules, isActive);
    return values;
}

export function setTabFormFromTemplate(
  template: TemplateContextType,
  formType: string,
  rawRules: Field[],
  dispatch: AppDispatch
): void {
    const tabId = `${template.uuid}-${formType}`;
    const values = generateTabFormValuesFromTemplate(template, rawRules, formType);
    const clonedValues = JSON.parse(JSON.stringify(values));
    dispatch(
        setValuesForTab({
            tabId,
            values,
            originalValues: clonedValues,
        })
    );
}

export function assignDefaultFunctions(template: TemplateContextType) {
    const formTypes: FormTypeKey[] = ["generationTransaction", "selectionTransaction", "validationTransaction"];
    formTypes.forEach((formType) => {
        const defaultFn = getDefaultFunctionByFormType(formType);
        const transactions = template[formType];

        if (Array.isArray(transactions)) {
            transactions.forEach((item: FieldValidation) => {
                if (
                    (item.isRequired || item.idBitmap) &&
                    (!item.function || item.function.trim() === "")
                ) {
                    item.function = defaultFn;
                }

                if (Array.isArray(item.fields)) {
                    applyRecursive(item.fields, defaultFn);
                }
            });
        }
    });
}

function applyRecursive(fields: FieldValidation[], defaultFn: string) {
    fields.forEach((field) => {
        if (
            (field.isRequired || field.idBitmap) &&
            (!field.function || field.function.trim() === "")
        ) {
            field.function = defaultFn;
        }

        if (Array.isArray(field.fields)) {
            applyRecursive(field.fields, defaultFn);
        }
    });
}
