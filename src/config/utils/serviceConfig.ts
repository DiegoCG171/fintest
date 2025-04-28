export const serviceConfig = {
    rules: {
        columns: [
            { id: "isRequired", label: "", affects: ["canRequired"], width: "5%", type: "checkbox" as const },
            { id: "idBitmap", label: "Campo", width: "10%", type: "static" as const },
            { id: "displayName", label: "Nombre", width: "35%", type: "static" as const },
            {
                id: "canRequired",
                label: "Requerido",
                dependsOn: "isRequired",
                width: "10%",
                type: "checkbox" as const
            },
            {
                id: "function",
                label: "Función",
                options: ["Value", "Echo", "Calculated", "De request"],
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
                    Echo: { render: false },
                    Calculated: { render: false },
                    Value: { render: true, type: "input" as const },
                    "De request": {
                        render: true,
                        type: "select" as const,
                        options: ["Opción 1", "Opción 1", "Opción 1"],
                    },
                },
                width: "20%",
                type: "input" as const
            },
            { id: "breakingRules", label: "", width: "5%", type: "static" as const }
        ],
    },
};
