import { useState } from "react";
import { DefaultConfigProps } from "../config/interfaces/type.interface";
import { TemplateContextType } from "../config/interfaces/template.interface";
import { getTemplate } from "../services/catalogs/templates.service";
import { TemplateContext } from "./TemplateContext";

export interface TemplateContextState {
    template: TemplateContextType | null;
    getTemplates: () => Promise<void>;
}

function TemplateProvider({ children }: DefaultConfigProps) {
    const [template, setTemplate] = useState<TemplateContextState["template"]>(null);

    const getTemplates = async () => {
        try {
            const data = await getTemplate();
            console.log("Datos obtenidos:", data);
            setTemplate(data);
        } catch (error) {
            console.error("Error al obtener la plantilla:", error);
        }
    };

    return (
        <TemplateContext.Provider value={{ getTemplates, template }}>
            {children}
        </TemplateContext.Provider>
    );
}

export default TemplateProvider;
