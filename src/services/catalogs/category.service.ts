import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { RootCategoryesInterface } from "../../config/interfaces/categories.interface";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getAllCategories = async () => {
    try {
        const response = await api.get<RootCategoryesInterface>(ENDPOINTS.category);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

export const getCategories = async (method: string) => {
    try {
        const response = await api.get<RootCategoryesInterface>(`${ENDPOINTS.category}/${method}`);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};