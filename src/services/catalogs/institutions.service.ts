import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
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