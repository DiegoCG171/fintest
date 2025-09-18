import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { RootRules, Rules } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getRules = async (
    params?: Record<string, string | number | boolean>
): Promise<RootRules> => {
    try {
        const response = await api.get<RootRules>(ENDPOINTS.getRules, { params });
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

export const getRuleById = async (
    uuid: string
): Promise<Rules> => {
    try {
        const response = await api.get<Rules>(`${ENDPOINTS.getRules}/${uuid}`);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};
