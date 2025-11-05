import { TemplateContextType, FieldValidation, testCaseInterface } from "../interfaces";

export function getTransactionByType(
  templates: TemplateContextType[] | testCaseInterface[],
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
    case "selectionTransaction":
      return template.selectionTransaction ?? [];
    case "dependOnTransaction":
      return template.dependOnTransaction ?? [];
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

export function getDependOnId(
  templates: testCaseInterface[],
  templateId: string,
) {
  const template = templates.find(
    (t) => t._id?.toString() === templateId.toString() || t.uuid?.toString() === templateId.toString()
  );

  if (!template) {
    return undefined;
  }

  return template.dependOn || ''
}


