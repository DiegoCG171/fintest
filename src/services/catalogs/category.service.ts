import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { createCategoryInterface, createCategoryResponse, RootCategoryesInterface } from "../../config/interfaces/categories.interface";
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

export const deleteCategory = async (id: string) => {
    try {
        await api.delete<unknown>(`${ENDPOINTS.category}/${id}`);
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

export const createCategory = async (body: createCategoryInterface) => {
    try {
        await api.post<createCategoryResponse>(ENDPOINTS.category, body);
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const updateCategory = async (body: createCategoryInterface, id: string) => {
    try {
        await api.patch<createCategoryResponse>(`${ENDPOINTS.category}/${id}`, body);
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

