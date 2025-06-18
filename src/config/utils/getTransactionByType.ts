import { TemplateContextType, FieldValidation } from "../interfaces";

export function getTransactionByType(
  templates: TemplateContextType[],
  templateId: string,
  formType: string
): FieldValidation[] | null {
  const template = templates.find(
    (t) => t._id?.toString() === templateId.toString() || t.uuid?.toString() === templateId.toString()
  );

  if (!template) {
    return null;
  }

  switch (formType) {
    case "validationTransaction":
      return template.validationTransaction ?? [];
    case "generationTransaction":
      return template.generationTransaction ?? [];
    default:
      return null;
  }
}

export function getTemplateID(
  templates: TemplateContextType[],
  templateId: string,
) {
  const template = templates.find(
    (t) => t._id?.toString() === templateId.toString() || t.uuid?.toString() === templateId.toString()
  );

  if (!template) {
    return null;
  }

  return template._id
}


