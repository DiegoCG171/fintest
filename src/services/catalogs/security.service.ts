import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const  getAllSecurityRoles = async () => {
    try {
        const response = await api.get(`${ENDPOINTS.securityRol}`);
        return response.data
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const  getAllSecurityPermissions = async () => {
    try {
        const response = await api.get(`${ENDPOINTS.securityPermissions}`);
        return response.data
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
} 