import { TemplateContextType, ValidationTransaction } from "../interfaces";

export function getTransactionByType(
  templates: TemplateContextType[],
  templateId: string,
  formType: string
): ValidationTransaction[] | null {
  const template = templates.find(
    (t) => t._id?.toString() === templateId.toString()
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

