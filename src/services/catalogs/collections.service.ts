import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { PatchGenerationTemplate } from "../../config/interfaces";
import { CreateCollection } from "../../config/interfaces/collections.interface";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getCollections = async () => {
    try {
        const {data} = await api.get(ENDPOINTS.collections);
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const getCollectionById = async (id: string) => {
    try {
        const {data} = await api.get(`${ENDPOINTS.collections}/${id}`);
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const createCollection = async (body: CreateCollection) => {
    try {
        const {data} = await api.post(ENDPOINTS.collections, body);
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}
export const updateCollection = async (id: string, body: PatchGenerationTemplate) => {
    try {
        const {data} = await api.patch(`${ENDPOINTS.collections}/${id}`, body);
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}

export const deleteCollection = async (id: string) => {
  try {
    const { data } = await api.delete(`${ENDPOINTS.collections}/${id}`);
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};