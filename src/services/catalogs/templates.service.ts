import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { TemplateContextType } from "../../config/interfaces/template.interface";

export const getTemplate = async (): Promise<TemplateContextType> => {
    try {
        const response = await api.get(ENDPOINTS.template);
        console.log('Templates:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el template:', error);
        throw error;
    }
}