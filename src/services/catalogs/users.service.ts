import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { createUserInterface } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";
import { getEncrypted } from "../../config/utils/passwordEncrypt";

export const getUser = async () => {
    try {
        const response = await api.get(ENDPOINTS.user);
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
} 

export const getUserById = async (id: string) => {
    try {
        const response = await api.get(`${ENDPOINTS.user}/${id}`);
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await api.get(`${ENDPOINTS.user}`);
        return response.data
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
} 

export const createUser = async (body: createUserInterface) => {
    const password = getEncrypted(body.password);
    const user = {
        ...body,
        password
    }
    try {
        const response = await api.post(ENDPOINTS.user, user)
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const updateUser = async (body: createUserInterface) => {
    try {
        const response = await api.put(ENDPOINTS.user, body)
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}