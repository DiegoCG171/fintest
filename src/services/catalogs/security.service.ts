import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { Permission, Rol } from "../../config/interfaces/security.interface";
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

export const updateSecurityRoles = async (id:string, body:  Partial<Rol>) => {
    try {
        const response = await api.patch(`${ENDPOINTS.securityRol}/${id}`, body)
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const updateSecurityPermission = async (id:string, body:  Partial<Permission>) => {
    try {
        const response = await api.patch(`${ENDPOINTS.securityPermissions}/${id}`, body)
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const deleteSecurityRoles = async (id: string) => {
    try {
        const response = await api.delete(`${ENDPOINTS.securityRol}/${id}`);
        console.log(response)
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const deleteSecurityPermissions = async (id: string) => {
    try {
        const response = await api.delete(`${ENDPOINTS.securityPermissions}/${id}`);
        return response
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}
