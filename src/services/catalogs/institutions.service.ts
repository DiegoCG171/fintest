import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { Institution } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getAllInstitutions = async () => {
    try {
        const response = await api.get(`${ENDPOINTS.institution}`);
        return response.data
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const deleteInstitution = async (id: string) => {
    try {
        const response = await api.delete(`${ENDPOINTS.institution}/${id}`);
        return response.data
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const updateInstitution = async (id:string, body:  Partial<Institution>) => {
    try {
        const response = await api.patch(`${ENDPOINTS.institution}/${id}`, body)
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}