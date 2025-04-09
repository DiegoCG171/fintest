import { useState } from "react";
import { getTemplate } from "../../services/catalogs/templates.service";
import { TemplateContext } from "./TemplateContext";
import { WithChildrenProps, TemplateContextState } from "../interfaces";

function TemplateProvider({ children }: WithChildrenProps) {
    const [template, setTemplate] = useState<TemplateContextState["template"]>(null);

    const getTemplates = async () => {
        try {
            const data = await getTemplate();
            
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
