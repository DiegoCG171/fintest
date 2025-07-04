import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { createUserInterface } from "../../config/interfaces";

export const getUser = async () => {
    try {
        const response = await api.get(ENDPOINTS.user);
        return response
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
} 

export const getUserById = async (id: string) => {
    try {
        const response = await api.get(`${ENDPOINTS.user}/${id}`);
        return response
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
} 

export const createUser = async (body: createUserInterface) => {
    try {
        const response = await api.post(ENDPOINTS.user, body)
        return response
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

export const ucdateUser = async (body: createUserInterface) => {
    try {
        const response = await api.put(ENDPOINTS.user, body)
        return response
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}