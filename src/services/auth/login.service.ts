import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { getEncrypted } from "../../config/utils/passwordEncrypt";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";
import { LoginCredentials, LoginResponse, LogoutResponse } from "../../config/interfaces";


export const login = async (body: LoginCredentials): Promise<LoginResponse> => {
    body.password = getEncrypted(body.password);
    try {
        const response = await api.post<LoginResponse>(ENDPOINTS.login, body);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

export const logout = async (): Promise<LogoutResponse> => {
    try {
        const response = await api.get<boolean>(ENDPOINTS.logout);
        const success = response.data === true || response.status === 200;
        return { success };
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        console.error("Logout error:", errorMessage);
        return { success: false };
    }
};


