// src/config/utils/formBuilder.utils.ts
import { setValuesForTab } from "../../store";
import { AppDispatch } from "../../store/store";
import {
    TemplateContextType,
    TableRowDataFormBuilder,
    Field,
    FieldValidation,
} from "../interfaces";
import {
    mapFieldRulesToFormStructure,
    combineTemplateData,
} from "./mappers";

function getFieldsByFormType(
    template: TemplateContextType,
    formType: string
): FieldValidation[] {
    if (formType === "generationTransaction") return template.generationTransaction;
    if (formType === "selectionTransaction") return template.selectionTransaction;
    if (formType === "generationTransaction") return template.generationTransaction;
    return template.validationTransaction;
}

export function generateTabFormValuesFromTemplate(
    template: TemplateContextType,
    rawRules: Field[],
    formType: string
): TableRowDataFormBuilder[] {
    if (!rawRules?.length) return [];

    const mappedRules = mapFieldRulesToFormStructure(rawRules);
    const fields = getFieldsByFormType(template, formType);
    const isActive = !fields?.length;

    const values = combineTemplateData(fields, mappedRules, isActive);
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
    const clonedValues = JSON.parse(JSON.stringify(values)); // deep clone

    dispatch(
        setValuesForTab({
            tabId,
            values,
            originalValues: clonedValues,
        })
    );
}
