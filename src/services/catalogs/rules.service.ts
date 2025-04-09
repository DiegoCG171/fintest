import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";

export const getRules = async () => {
    try {
        const response = await api.get(ENDPOINTS.getRules);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las reglas:', error);
        throw error;
    }
}