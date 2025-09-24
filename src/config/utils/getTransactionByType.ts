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
  const templateWithDepend = {
    ...template,
    dependOnTransaction: template.dependOnTransaction ?? [],
  };

  switch (formType) {
    case "validationTransaction":
      return templateWithDepend.validationTransaction ?? [];
    case "generationTransaction":
      return templateWithDepend.generationTransaction ?? [];
    case "selectionTransaction":
      return templateWithDepend.selectionTransaction ?? [];
    case "dependOnTransaction":
      return templateWithDepend.dependOnTransaction ?? [];
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


