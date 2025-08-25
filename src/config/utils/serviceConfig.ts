export const serviceConfig = {
    rulesValidation: {
        columns: [
            { id: "isActive", label: "", affects: ["isRequired"], width: "5%", type: "checkbox" as const },
            { id: "idBitmap", label: "Campo", width: "10%", type: "static" as const },
            { id: "displayName", label: "Nombre", width: "35%", type: "static" as const },
            {
                id: "isRequired",
                label: "Requerido",
                dependsOn: "isActive",
                width: "10%",
                type: "checkbox" as const
            },
            {
                id: "function",
                label: "Función",
                options: ["equals", "includes", "not_validate", "compare_to"],
                affects: ["value"],
                width: "20%",
                type: "select" as const,
                hide: true
            },
            {
                id: "value",
                label: "Parámetro",
                dependsOn: "function",
                dynamicRender: {
                    "equals": { render: true, type: "input" as const },
                    "includes": { render: true, type: "input" as const },
                    "not_validate": { render: false },
                    "compare_to": { render: true, type: "auto-complete" as const, options: [] },
                    // "de request": {
                    //     render: true,
                    //     type: "select" as const,
                    //     options: ["Opción 1", "Opción 2", "Opción 3"],
                    // },
                },
                width: "20%",
                type: "dynamic" as const
            },
            { id: "breakingRules", label: "", width: "5%", type: "static" as const }
        ],
    },
    rulesGeneration: {
        columns: [
            { id: "isActive", label: "", width: "5%", type: "checkbox" as const },
            { id: "idBitmap", label: "Campo", width: "10%", type: "static" as const },
            { id: "displayName", label: "Nombre", width: "40%", type: "static" as const },
            {
                id: "function",
                label: "Función",
                options: ["echo", "calculated", "value"],
                affects: ["value"],
                width: "20%",
                type: "select" as const,
                hide: true
            },
            {
                id: "value",
                label: "Parámetro",
                dependsOn: "function",
                dynamicRender: {
                    "echo": { render: false },
                    "calculated": { render: false },
                    "value": { render: true, type: "input" as const },
                },
                width: "20%",
                type: "dynamic" as const
            },
            { id: "breakingRules", label: "", width: "5%", type: "static" as const }
        ],
    },
    rulesSelection: {
        columns: [
            { id: "isActive", label: "", affects: ["isRequired"], width: "5%", type: "checkbox" as const },
            { id: "idBitmap", label: "Campo", width: "10%", type: "static" as const },
            { id: "displayName", label: "Nombre", width: "35%", type: "static" as const },
            {
                id: "isRequired",
                label: "Requerido",
                dependsOn: "isActive",
                width: "10%",
                type: "checkbox" as const
            },
            {
                id: "function",
                label: "Función",
                options: ["ignore", "includes", "equals" ],
                affects: ["value"],
                width: "20%",
                type: "select" as const,
                hide: true
            },
            {
                id: "value",
                label: "Parámetro",
                dependsOn: "function",
                dynamicRender: {
                    "ignore": { render: false },
                    "includes": { render: true, type: "input" as const },
                    "equals": { render: true, type: "input" as const },
                },
                width: "20%",
                type: "dynamic" as const
            },
            { id: "breakingRules", label: "", width: "5%", type: "static" as const }
        ],
    },
};


