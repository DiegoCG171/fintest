import { BreakingRule, Field, FieldValidation, Specification, TableRowDataFormBuilder, ValidationTransaction } from "../interfaces";

export const mapFieldRulesToFormStructure = (fields: Field[]): TableRowDataFormBuilder[] =>
    fields.map((rule: Field) => {
        const level3Children = (children: BreakingRule) =>
            children.specification?.map((spec: Specification) => ({
                idBitmap: spec.id,
                displayName: spec.displayName,
                isActive: false,
                function: '',
                value: '',
                breakingRules: '' as string,
                _id: spec._id,
            })) ?? [];

        const level2Children = Array.isArray(rule.breakingRules)
            ? rule.breakingRules.map((br: BreakingRule) => ({
                idBitmap: br.id,
                displayName: br.displayName,
                isActive: false,
                function: '',
                value: '',
                breakingRules: level3Children(br),
                _id: br._id,
            }))
            : [];

        return {
            idBitmap: rule.idBitmap,
            displayName: rule.displayName,
            isRequired: false,
            isActive: false,
            function: '',
            value: '',
            breakingRules: level2Children,
            _id: rule._id,
        };
    });


export const mapValidationTemplate = (validation: ValidationTransaction[]): TableRowDataFormBuilder[] =>
    validation.map((v: ValidationTransaction) => {
        
        const level4Children = (children: FieldValidation) =>
            children.fields?.map((field: FieldValidation) => ({
                idBitmap: field.idBitmap ?? '',
                displayName: '',
                isActive: Boolean(field),
                function: field.value ?? '',
                value: '',
                breakingRules: '' as string,
                _id: field._id,
            })) ?? [];

        const level3Children = (children: FieldValidation) =>
            children.fields?.map((field: FieldValidation) => ({
                idBitmap: field.idBitmap ?? '',
                displayName: '',
                isActive: Boolean(field),
                function: field.value ?? '',
                value: '',
                breakingRules: level4Children(field),
                _id: field._id,
            })) ?? [];

        const level2Children = Array.isArray(v.fields)
            ? v.fields.map((field: FieldValidation) => ({
                idBitmap: field.idBitmap ?? '',
                displayName: '',
                isActive: Boolean(field),
                function: field.function ?? '',
                value: field.value ?? '',
                breakingRules: level3Children(field),
                _id: field._id,
            }))
            : [];

        return {
            idBitmap: v.idBitmap,
            displayName: '',
            isRequired: Boolean(v.isRequired),
            isActive: Boolean(v),
            function: v.function ?? '',
            value: v.value ?? '',
            breakingRules: level2Children,
            _id: v._id,
        };
    });


export const combineTemplateData = (data: ValidationTransaction[] | null , mappedRules: TableRowDataFormBuilder[]): TableRowDataFormBuilder[] => {

    if (!data?.length) return [];
    const mapData = mapValidationTemplate(data);

    const updateRules = (rules: TableRowDataFormBuilder[], data: TableRowDataFormBuilder[], level = 0): TableRowDataFormBuilder[] => {
        return rules.map(rule => {
            const matched = data.find(d => {
                const match =
                    d.idBitmap?.trim().toLowerCase() === rule.idBitmap?.trim().toLowerCase();
                return match;
            });
            const updatedRule: TableRowDataFormBuilder = {
                ...rule,
                isRequired: level === 0 ? Boolean(matched?.isRequired ?? rule.isRequired) : undefined,
                isActive: matched?.isActive ?? rule.isActive,
                function: matched?.function ?? rule.function,
                value: matched?.value ?? rule.value,
                breakingRules: Array.isArray(rule.breakingRules) && rule.breakingRules.length > 0
                    ? updateRules(rule.breakingRules as TableRowDataFormBuilder[], matched?.breakingRules as TableRowDataFormBuilder[] ?? [], level + 1)
                    : rule.breakingRules,
            };

            if (level > 0) {
                delete updatedRule.isRequired;
            }

            return updatedRule;
        });
    };

    return updateRules(mappedRules, mapData);
};




