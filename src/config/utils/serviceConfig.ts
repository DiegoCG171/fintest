import { getRules } from "../../services";
import { BreakingRule, FieldRules, RootRules, Specification } from "../interfaces";

export const serviceConfig = {
    rules: {
        serviceMethod: getRules,
        mapData: (response: RootRules) =>
            response[0].fields.map((rule: FieldRules) => {
                // Nivel 3: specification
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

                // Nivel 2: breakingRules
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

                // Nivel 1: field rule principal
                return {
                    isRequired: true,
                    idBitmap: rule.idBitmap,
                    displayName: rule.displayName,
                    canRequired: false,
                    function: rule.isBreakeable ? '' : ['Value', 'Echo', 'Calculated', 'De request'],
                    value: '',
                    breakingRules: level2Children,
                    _id: rule._id,
                };
            }),
        columns: [
            { id: "isRequired", label: "", affects: ["canRequired"], width: "5%", type: "checkbox" },
            { id: "idBitmap", label: "Campo", width: "10%",  type: "static" },
            { id: "displayName", label: "Nombre", width: "35%", type: "static" },
            { id: "canRequired", label: "Requerido", dependsOn: "isRequired", width: "10%", type: "checkbox"},
            {
                id: "function",
                label: "Función",
                options: [],
                affects: ["value"],
                width: "20%",
                type: "select"
            },
            {
                id: "value",
                label: "Parámetro",
                dependsOn: "function",
                dynamicRender: {
                    Echo: { render: false },
                    Calculated: { render: false },
                    Value: { render: true, type: "input" },
                    "De request": {
                        render: true,
                        type: "select",
                        options: ["Opción 1", "Opción 1", "Opción 1"],
                    },
                },
                width: "20%",
                type: "input"
            },
            { id: "breakingRules", label: "", width: "5%", type: "static" }
        ],
    },
};