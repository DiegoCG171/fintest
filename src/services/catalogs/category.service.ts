import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { RootCategoryesInterface } from "../../config/interfaces/categories.interface";

export const getAllCategories = async () => {
    try {
        const response = await api.get<RootCategoryesInterface>(ENDPOINTS.category);
        return response.data
    } catch (error) {
        console.error('Error al traer categorías:', error);
        throw error;
    }
}