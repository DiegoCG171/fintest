import { ValidationTransaction } from "../interfaces";

export function getTransactionByType(
    templates: any[],
    templateId: string,
    formType: string
): ValidationTransaction[] {
    const template = templates.find((t) => t._id === templateId);

    if (!template) return [];

    switch (formType) {
        case "validationTransaction":
            return template.validationTransaction ?? [];

        case "generationTransaction":
            return template.generationTransaction ?? [];

        default:
            return [];
    }
}
