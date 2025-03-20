import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";

export const getTemplate = async () => {
    try {
        const response = await api.get(ENDPOINTS.template);
        console.log('Templates:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el template:', error);
        throw error;
    }
}