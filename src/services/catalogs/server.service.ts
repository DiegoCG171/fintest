import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { StartServerSuccessResponse, StopServerSuccessResponse } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const startServer = async (): Promise<StartServerSuccessResponse> => {
    try {
        const response = await api.post(ENDPOINTS.startServer, {"protocol": "TCP"});
        return response.data;
    } catch (error) { 
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

export const stopAllServers = async(): Promise<unknown> => {
    try {
        const response = await api.get(ENDPOINTS.stopAllServers);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const stopServer = async (id: string): Promise<StopServerSuccessResponse> => {
    try {
        const response = await api.post(ENDPOINTS.stopServer, {id: id});
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

