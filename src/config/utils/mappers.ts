import { BreakingRule, FieldRules, Specification, TableRowData } from "../interfaces";

export const mapFieldRulesToFormStructure = (fields: FieldRules[]): TableRowData[] =>
    fields.map((rule: FieldRules) => {
        const level3Children = (children: BreakingRule) =>
            children.specification?.map((spec: Specification) => ({
                isRequired: '',
                idBitmap: spec.id,
                displayName: spec.displayName,
                canRequired: false,
                function: ['Value', 'Echo', 'Calculated', 'De request'],
                value: '',
                breakingRules: '',
                _id: spec._id,
            })) ?? [];

        const level2Children = Array.isArray(rule.breakingRules)
            ? rule.breakingRules.map((br: BreakingRule) => ({
                isRequired: '',
                idBitmap: br.id,
                displayName: br.displayName,
                canRequired: false,
                function: br.specification.length ? '' : ['Value', 'Echo', 'Calculated', 'De request'],
                value: '',
                breakingRules: level3Children(br),
                _id: br._id,
            }))
            : [];

        return {
            isRequired: false,
            idBitmap: rule.idBitmap,
            displayName: rule.displayName,
            canRequired: false,
            function: rule.isBreakeable ? '' : ['Value', 'Echo', 'Calculated', 'De request'],
            value: '',
            breakingRules: level2Children,
            _id: rule._id,
        };
    });
