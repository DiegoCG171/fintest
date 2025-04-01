import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";

export interface clientsConection {
    host?: string
    port: number
    }
export const startClient = async (body: clientsConection) => {
    try{
        const response = await api.post(ENDPOINTS.startClient, body);
        return response
    } catch(error) {
        console.error('Error al iniciar clientes:', error);
        throw error;
    }
}

export const stopClient = async (body: clientsConection) => {
    try{
        const response = await api.post(ENDPOINTS.stopClient, body);
        return response
    } catch(error) {
        console.error('Error al detener clientes:', error);
        throw error;
    }
}

export const getAllClients = async () => {
    try {
        const response= await api.get(ENDPOINTS.getAllClients);
        return response
    } catch(error) {
        console.error('Error al obtener clientes:', error);
        throw error;
    }
}

export const stopAllClients = async () => {
    try {
        const response= await api.get(ENDPOINTS.stopAllClients);
        return response
    } catch (error) {
        console.error('Error al detener clientes:', error);
        throw error;
    }
}