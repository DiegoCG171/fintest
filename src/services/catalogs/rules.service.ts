import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { RootRules } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getRules = async (): Promise<RootRules> => {
    try {
        const response = await api.get<RootRules>(ENDPOINTS.getRules);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}