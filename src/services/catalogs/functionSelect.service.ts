import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getGenetationFunctions = async () => {
    try {
        const {data} = await api.get(`${ENDPOINTS.template}/functions/generation` );
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const getValidationFunctions = async () => {
    try {
        const {data} = await api.get(`${ENDPOINTS.template}/functions/validation` );
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const geSelectiontFunctions = async () => {
    try {
        const {data} = await api.get(`${ENDPOINTS.template}/functions/selection` );
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const getDependsOnFunctions = async () => {
    try {
        const {data} = await api.get(`${ENDPOINTS.template}/functions/dependOn` );
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}