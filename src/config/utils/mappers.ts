import { BreakingRule, FieldRules, FieldValidation, Specification, TableRowData, ValidationTransaction } from "../interfaces";

export const mapFieldRulesToFormStructure = (fields: FieldRules[]): TableRowData[] =>
    fields.map((rule: FieldRules) => {
        const level3Children = (children: BreakingRule) =>
            children.specification?.map((spec: Specification) => ({
                idBitmap: spec.id,
                displayName: spec.displayName,
                canRequired: false,
                function: '',
                value: '',
                breakingRules: '',
                _id: spec._id,
            })) ?? [];

        const level2Children = Array.isArray(rule.breakingRules)
            ? rule.breakingRules.map((br: BreakingRule) => ({
                idBitmap: br.id,
                displayName: br.displayName,
                canRequired: false,
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
            canRequired: false,
            function: '',
            value: '',
            breakingRules: level2Children,
            _id: rule._id,
        };
    });


export const mapValidationTemplate = (validation: ValidationTransaction[]): TableRowData[] =>
    validation.map((v: ValidationTransaction) => {
        const level3Children = (children: FieldValidation) =>
            children.fields?.map((field: FieldValidation) => ({
                idBitmap: field.idBitmap,
                displayName: '',
                canRequired: false,
                function: field.value,
                value: '',
                breakingRules: '',
                _id: field._id,
            })) ?? [];

        const level2Children = Array.isArray(v.fields)
            ? v.fields.map((field: FieldValidation) => ({
                idBitmap: field.idBitmap,
                displayName: '',
                canRequired: false,
                function: field.function,
                value: field.value,
                breakingRules: level3Children(field),
                _id: field._id,
            }))
            : [];

        return {
            idBitmap: v.idBitmap,
            displayName: '',
            isRequired: Boolean(v.isRequired),
            canRequired: false,
            function: v.function,
            value: v.value,
            breakingRules: level2Children,
            _id: v._id,
        };
    });


export const combineTemplateData = (data: ValidationTransaction[], mappedRules: TableRowData[]): TableRowData[] => {
    const mapData = mapValidationTemplate(data);

    const updateRules = (rules: TableRowData[], data: TableRowData[], level = 0): TableRowData[] => {
        return rules.map(rule => {
            const matched = data.find(d => d.idBitmap === rule.idBitmap);

            const updatedRule: TableRowData = {
                ...rule,
                isRequired: level === 0 ? Boolean(matched?.isRequired ?? rule.isRequired) : undefined,
                function: matched?.function ?? rule.function,
                value: matched?.value ?? rule.value,
                breakingRules: Array.isArray(rule.breakingRules) && rule.breakingRules.length > 0
                    ? updateRules(rule.breakingRules as TableRowData[], matched?.breakingRules as TableRowData[] ?? [], level + 1)
                    : rule.breakingRules,
            };

            if (level > 0) {
                delete updatedRule.isRequired;
            }

            return updatedRule;
        });
    };

    return updateRules(mappedRules, mapData);
    //return mappedRules
};




