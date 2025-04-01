import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { getEncrypted } from "../../config/utils/passwordEncrypt";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export interface LoginCredentials {
    user: string;
    password: string;
}

export interface LoginResponse {
    id: string
    username: string
    email: string
    names: string
    surnames: string
    status: string
    isOnline: boolean
    attemps: number
    createdAt: string
    updatedAt: string
    deletedAt?: unknown
    token: string
}

export const login = async (body: LoginCredentials): Promise<LoginResponse> => {
    body.password = getEncrypted(body.password);
    try {
        const response = await api.post<LoginResponse>(ENDPOINTS.login, body);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw new Error(errorMessage);
    }
};

