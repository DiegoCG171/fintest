import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { ClientsConection } from "../../config/interfaces";


export const startClient = async (body: ClientsConection) => {
    try{
        const response = await api.post(ENDPOINTS.startClient, {"protocol": "TCP", ...body});
        return response.data;
    } catch(error) {
        console.error('Error al iniciar clientes:', error);
        throw error;
    }
}

export const stopClient = async (body: ClientsConection) => {
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